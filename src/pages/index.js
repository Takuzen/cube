import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function Home() {
  const { userId } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [cubes, setCubes] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const TruncatedCaption = ({ caption }) => {
    const [showMore, setShowMore] = useState(false);
    const isLongCaption = caption ? caption.length > 125 : false;
  
    const displayCaption = isLongCaption && !showMore ? caption.substring(0, 125) : caption;
  
    return (
      <p className='text-start font-serif'>
        {displayCaption}
        {isLongCaption && (
          <span onClick={() => setShowMore(!showMore)} style={{ cursor: "pointer", color: "gray" }}>
            {showMore ? " ...less" : " ...more"}
          </span>
        )}
      </p>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'allcubes'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const cubesData = [];
      querySnapshot.forEach((doc) => {
        cubesData.push({ id: doc.id, ...doc.data() });
      });
      setCubes(cubesData);
    };
  
    fetchData();
    setIsClient(true);
  }, []);
  
  return (
    <>
      <Head>
        <title>Cube</title>
        <meta name="description" content="platform for personal 3D contents." />
      </Head>
      <main className="flex min-h-[100vh] flex-col items-start p-10 gap-10">
        <section className="flex justify-between w-full">
        <div className="self-center flex gap-1 font-serif text-3xl">
          <Image
                  src="/cube-brown-logo.png"
                  alt="Default Profile Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
        </div>
        <div id="auth" className="flex gap-10 items-center">
          {userId ? (
            <div>
              <Link href="/profile">
                <Image
                  src="/person-circle-outline.svg"
                  alt="Default Profile Image"
                  width={30}
                  height={30}
                  className="rounded-full"
                  priority
                />
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login">
                <div className="">Log In</div>
              </Link>
              <Link href="/signup">
                <div className="bg-[#f5bf34] text-white font-bold px-5 py-2 rounded-lg hover:opacity-70">Sign Up</div>
              </Link>
            </>
          )}
        </div>
        </section>

        <section id="cube-feed" className="z-20 py-5 gap-7 flex flex-col justify-center w-[100%]">
        <div className="flex flex-wrap justify-center gap-5 w-1/3 self-center">
          {cubes.length ? (
            cubes.map((cube) => (
              <div key={cube.id} className='flex flex-col justify-center gap-10'>
                <div className='flex gap-1'>
                  <Image src="person-circle-outline.svg" alt="Default Profile Image" width={20} height={20} className="rounded-full" priority/>
                  <p className='font-serif'>{cube.username}</p>
                </div>
                <div className='self-center'>
                { isClient ? 
                  <model-viewer
                    style={{ height: '200px' }}
                    src={cube.gltfUrl}
                    alt={cube.caption}
                    width="100px"
                    height="100px"
                    camera-controls
                    rotation-per-second="30deg"
                    camera-orbit="45deg 45deg 20m"
                    shadow-intensity="1"
                  ></model-viewer>
                : 'Loading model...' }
                </div>
                <TruncatedCaption caption={cube.caption} />
              </div>
            ))
          ) : (
            <p>Loading cubes...</p>
          )}
        </div>
      </section>
        <div className="z-20 self-center">
        {userId ? (
          <Link href="/create">
            <button className="absolute bottom-10 right-10 bg-[#f5bf34] hover:opacity-70 text-white font-bold font-serif py-4 px-12 rounded-full">
              Post
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="absolute bottom-10 right-10 bg-[#f5bf34] hover:opacity-70 text-white font-bold font-serif py-4 px-12 rounded-full">
              Post
            </button>
          </Link>
        )}
      </div>
      </main>
      </>
    )
  }
