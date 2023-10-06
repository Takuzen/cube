import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Search from './search'
import { useRouter } from 'next/router'

export default function Create() {
  const [boxes, setBoxes] = useState([1]);
  const [cubeDescription, setCubeDescription] = useState("");
  const [addedBooks, setAddedBooks] = useState({});
  const router = useRouter();

  const generateCube = () => {
    router.push({
      pathname: '/generated',
      query: { books: JSON.stringify(addedBooks) }
    });
  };

  const addBook = (book, boxIndex) => {
    setAddedBooks({
      ...addedBooks,
      [boxIndex]: { ...book, thoughts: '' }
    });
  };

  const updateThoughts = (thoughts, boxIndex) => {
    setAddedBooks({
      ...addedBooks,
      [boxIndex]: { ...addedBooks[boxIndex], thoughts }
    });
  };

  const removeBook = (boxIndex) => {
    const newAddedBooks = { ...addedBooks };
    delete newAddedBooks[boxIndex];
    setAddedBooks(newAddedBooks);
  };

  const addBox = () => {
    if (boxes.length < 6) {
      setBoxes([...boxes, boxes.length + 1]);
    }
  };

  const isGenerateDisabled = Object.keys(addedBooks).length === 0;

  const generateCubeQuery = {
    pathname: '/generated',
    query: { books: JSON.stringify(addedBooks) },
  };

  useEffect(() => {
    return () => {
      Object.values(addedBooks).forEach((book) => {
        if (book && book.localThumbnail) {
          URL.revokeObjectURL(book.localThumbnail);
        }
      });
    };
  }, [addedBooks]);

  return (
    <>
      <main className="flex min-h-screen flex-col justify-center p-24 gap-10">
        <div className="font-bold font-serif text-4xl mb-4">
          <input 
            type="text" 
            placeholder="Cube Name" 
            value={cubeDescription} 
            onChange={(e) => setCubeDescription(e.target.value)} 
          />
          <div className='text-lg'>
          <p>You can add up to 6 books each cube.</p>
        </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {boxes.map((box, index) => (
            <div key={index} className="border border-black rounded-lg w-72 h-auto p-4">
              {addedBooks[index] ? (
                <>
                  <Image 
                    src={addedBooks[index].localThumbnail} 
                    alt={`${addedBooks[index].title} cover`} 
                    width={300} 
                    height={450} 
                    className="w-full mb-2"
                  />
                  <h2>{addedBooks[index].title}</h2>
                  <p>{addedBooks[index].author}</p>
                  <input 
                    type="text" 
                    placeholder="Your thoughts..." 
                    value={addedBooks[index].thoughts} 
                    onChange={(e) => updateThoughts(e.target.value, index)}
                  />
                  <button onClick={() => removeBook(index)} className="bg-red-500 text-white rounded px-2 py-1 mt-2">Remove</button>
                </>
              ) : (
                <>
                  <div className="text-black font-bold text-center underline underline-offset-8 decoration-2">
                    {`Face ${box}`}
                  </div>
                  <div className="p-4">
                    <Search addBook={(book) => addBook(book, index)} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {boxes.length === 6 && <div className="text-center text-red-500">For this moment, you can only add 6 books per cube. We are improving.</div>}
        {boxes.length < 6 && (
          <div className="self-center hover:bg-[#f5bf34] hover:text-white hover:cursor-pointer hover:transition hover:delay-50 px-3 py-1 text-black font-medium text-2xl rounded-full">
            <button onClick={addBox}><p>+</p></button>
          </div>
        )}
        <div>
          <Link href={isGenerateDisabled ? '' : generateCubeQuery} className={isGenerateDisabled ? 'opacity-50 cursor-not-allowed' : 'text-[#DB4D6D]'}>
              Generate Cube
          </Link>
        </div>
      </main>
    </>
  )
}