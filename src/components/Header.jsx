"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { db, storage } from "../config"; 
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setisOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [error, setError] = useState("");

  const imageRef = useRef(null); // for uploading image and hiding the input

  const handleChange = (e) => {
    let file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setError('Please upload a valid image file');
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setUploadImageLoading(true);

    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setError(error.message); // Extracting the error message
        setUploadImageLoading(false);
        setSelectedFile(null);
        setImageUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploadImageLoading(false);
        });
      }
    );
  }

  const submitData = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        username: session.user.name,
        caption: caption,
        image: imageUrl,
        profileImage: session.user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tyEA8rRXZabfLf_AwxDy-vQ91ecjMJjxVw&s",
        timestamp: serverTimestamp(),
      });
      setisOpen(false);
      location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href={"/"}>
          <Image
            src="/logo1.webp"
            width={50}
            height={50}
            alt="Logo"
            className="lg:hidden"
          />
          <Image
            src="/logo 2.webp"
            alt="Logo"
            width={96}
            height={96}
            className="hidden lg:inline-flex"
          />
        </Link>

        {/* Search box */}
        <input
          type="text"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[200px]"
          placeholder="Search"
        />

        {/* Sign in */}
        {session ? (
          <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform duration-300 hover:text-red-600"
              onClick={() => setisOpen(true)}
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <button
            className="text-sm font-semibold text-blue-500"
            onClick={() => signIn()}
          >
            Log in
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setisOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex justify-center items-center flex-col gap-5 relative">
            <button
              className="absolute top-[-5%] right-[-2%] border p-1 font-semibold rounded border-black cursor-pointer bg-gray-50 hover:bg-gray-200"
              onClick={() => setisOpen(false)}
            >
              <AiOutlineClose />
            </button>

            {imageUrl ? (
              <img
                src={imageUrl}
                alt="User Uploaded Image"
                className="w-full max-h-[250px] mt-5 object-cover cursor-pointer"
              />
            ) : (
              <>
                <FaCamera
                  size={40}
                  onClick={() => imageRef.current.click()}
                  className="cursor-pointer opacity-80"
                />
                <input
                  hidden
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  accept="image/*"
                  onChange={handleChange}
                />
              </>
            )}

            <input
              type="text"
              placeholder="Please enter your caption"
              className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4"
              onChange={(e) => setCaption(e.target.value)}
            />

            <button
              className="bg-gray-800 text-white w-full rounded py-1 hover:bg-gray-700 shadow-lg disabled:cursor-not-allowed"
              disabled={!caption || !imageUrl || uploadImageLoading} 
              onClick={submitData}
            >
              {uploadImageLoading ? 'Uploading...' : 'Upload Post'}
            </button>
            {error && (<p className="text-red-500">{error}</p>)}
          </div>
        </Modal>
      )}
    </div>
  );
}
