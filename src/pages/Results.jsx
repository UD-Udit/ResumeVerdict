import React, { useState } from 'react'
import { Chat } from '../components/Chat';

export const Results = ({ results }) => {
  const [chatClicked, setChatClicked] = useState(false);

  return (
    <div className="overflow-x-auto">
      {
        results.length !== 0 ?
          <div className="p-4 flex justify-center items-center flex-col">
            <h2 className='text-2xl font-bold uppercase my-4'>The data of {results.length} {results.length === 1 ? "Candidate is" : "Candidates are"}</h2>
            <table className="w-full border-collapse border-2 border-gray-200 table-auto max-h-screen overflow-auto">
              <thead>
                <tr className="bg-[#1c7b7d] text-white font-bold">
                  <th className="py-4 px-2 border-b border-r">S No.</th>
                  <th className="py-4 px-2 border-b border-r">Name</th>
                  <th className="py-4 px-2 border-b border-r">Phone No</th>
                  <th className="py-4 px-2 border-b border-r">Email</th>
                  <th className="py-4 px-2 border-b border-r">Location</th>
                  <th className="py-4 px-2 border-b border-r">Soft Skills</th>
                  <th className="py-4 px-2 border-b border-r">Experience</th>
                  <th className="py-4 px-2 border-b border-r">Skills</th>
                  <th className="py-4 px-2 border-b border-r">Achievements</th>
                  <th className="py-4 px-2 border-b border-r">Relevance(Scale of 10)</th>
                </tr>
              </thead>
              <tbody>
                {
                  results?.map((result, id) => (
                    <tr key={id} className="even:bg-gray-100 odd:bg-white">
                        <td className="py-4 px-2 border-b border-r w-[4%]">{id+1}</td>
                        <td className="py-4 px-2 border-b border-r w-[10%]">{result.Name}</td>
                        <td className="py-4 px-2 border-b border-r w-[6%]">{result.PhoneNo}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Email}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Location}</td>
                        <td className="py-4 px-2 border-b border-r">{result.SoftSkills}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Experience}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Skills}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Achievements}</td>
                        <td className="py-4 px-2 border-b border-r">{result.score}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="rounded-full bg-[#1c7b7d] h-16 w-16 absolute flex justify-center items-center text-base font-bold text-white cursor-pointer bottom-2 right-4" onClick={()=>setChatClicked(true)}>
                Chat?
            </div>
          </div>
          :
          <h2 className="text-center text-xl text-red-500 mt-4">No results generated!</h2>
      }

      {
        chatClicked && <Chat data={results} onClose={()=>setChatClicked(false)}/>
      }
    </div>
  )
}