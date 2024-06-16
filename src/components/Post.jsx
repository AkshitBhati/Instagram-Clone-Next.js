import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React from 'react'
import Card from './Card'
import { db } from '@/config'

export default async function Post() {
    
    const q = query(collection(db, 'posts'))
    const querySnapshot = await getDocs(q)

    let data = []

    querySnapshot.forEach((post) => {
        console.log(post);
        data.push(post)
    })
    

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center'>
        {data.map((data, index) => (
            <Card key={index} data={data} />
        ))}
    </div>
  )
}
