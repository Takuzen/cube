import Head from 'next/head';
import Link from 'next/link'
import BookCube from './cubeRender';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
    return (
    <>
      <Head>
        <title>BookCube</title>
        <meta name="description" content="本のキューブ" />
      </Head>
      <main className="flex min-h-[100vh] flex-col items-start p-10 gap-10">
        <section className="flex justify-between w-full">
        <div className="font-bold font-serif text-4xl">
          <h1 className='tracking-wide'>
            Book SP
          </h1>
        </div>
        <div id="account" className="flex gap-10 items-center">
          {user ? (
            <div className="">Welcome, {user.email}</div>
          ) : (
            <>
              <div className="">Login</div>
              <Link href="/signup">
                <div className="bg-[#f5bf34] text-white font-bold px-5 py-2 rounded-lg hover:opacity-70">Sign Up</div>
              </Link>
            </>
          )}
      </div>
        </section>
        <section id="weekly-pick" className="z-10 gap-7 flex flex-col justify-center bg-[#d7ecea] w-[100vw]">
          <div className='self-center'>
            <p className='text-[#DB4D6D] font-black font-serif text-xl'>Weekly Pick</p>
          </div>
          <div className='self-center'> 
            <BookCube />
          </div>
          <div className="flex flex-col gap-7">
          <div className='self-center'>
            <Link href="">
              <p>@Username</p>
            </Link>
          </div>
          <div className="">  
            <p className=''>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. <span className='text-gray-400'>read more ...</span></p>
          </div>
          <div className="self-center flex flex-col justify-center">
          
            <Link href="/detail">
              <button className=" text-black font-bold font-serif rounded underline-offset-8 underline">
                詳しく見る
              </button>
            </Link>
          </div>
          </div>
        </section>
        <div className="self-center">
            <Link href="/create">
              <button className="absolute bottom-10 right-10 bg-[#f5bf34] hover:opacity-70 text-white font-bold font-serif py-4 px-12 rounded-full">
                Create Your Cube
              </button>
            </Link>
          </div>
      </main>
      </>
    )
  }
