'use client'
import Image from 'next/image'
import styles from './page.module.css'
const handleAddPost = async (nume, id) => {
  try {
    const response = await fetch('/api/postCity', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nume,
        id: id,
      }),
   }); 
   console.log('1')
  } catch (error) {
    console.error('Error adding post:', error);
  }
};




export default async function Home() {
  
  return (
    <div>
      <br/>
      <div onClick={() => handleAddPost("Stockholm", '123')}>
        add post
      </div>
      
      <br/>
      Home
    </div>
  )
}
