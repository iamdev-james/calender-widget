import { useState } from 'react';
import './App.css';
import Calender from './components/Calender/Calender';

function App() {
  const [ type ,setType ] = useState('date');

  return type === "date"?  (
    <div className='w-screen h-screen bg-gray-100 flex justify-center items-center'>
      <div className='text-center'>
        <Calender />
        <button onClick={() => setType('range') } className='px-10 py-3 rounded-lg text-white font-semibold mt-4 bg-black m-auto'>Set range</button>
      </div>
    </div>
  ) : (
    <div className='w-screen h-screen bg-gray-100 flex flex justify-center items-center'>
      <div className='text-center'>
        <div className='flex'>
          <div className='mr-7'>
            <p className='font-semibold mb-3'>From:</p>
            <Calender />
          </div>
          <div>
            <p className='font-semibold mb-3'>To:</p>
            <Calender />
          </div>
        </div>
      <button onClick={() => setType('date') } className='px-10 py-3 rounded-lg text-white font-semibold mt-4 bg-black m-auto'>Set date</button>
      </div>
    </div>
  )
}

export default App;
