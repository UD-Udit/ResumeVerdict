import React from 'react'
import { Input } from '../components/Input';

export const MainPage = ({ setResults }) => {
  return (
    <div className='w-full flex justify-center items-center h-screen text-2xl bg-[#1c7b7d]'>
        <div className="w-1/3 h-screen flex justify-center items-center p-4">
            <h2 className='text-6xl font-bold text-white'>
                Drop your Resumes
            </h2>
        </div>
        <div className="w-1/2 flex justify-center items-center h-full">
            <Input setResults={ setResults }/>
        </div>
    </div>
  )
}
