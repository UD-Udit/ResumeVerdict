import React from 'react'

export const Results = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      {
        results.length !== 0 ?
          <div className="p-4 flex justify-center items-center flex-col">
            <h2 className='text-2xl font-bold uppercase my-4'>The data of {results.length} Candidates are</h2>
            <table className="w-full border-collapse border-2 border-gray-200 table-auto">
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
                </tr>
              </thead>
              <tbody>
                {
                  results?.map((result, id) => (
                    <tr key={id} className="even:bg-gray-100 odd:bg-white">
                        <td className="py-4 px-2 border-b border-r w-[4%]">{id+1}</td>
                        <td className="py-4 px-2 border-b border-r w-[10%]">{result.Name}</td>
                        <td className="py-4 px-2 border-b border-r w-[10%]">{result.PhoneNo}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Email}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Location}</td>
                        <td className="py-4 px-2 border-b border-r">{result.SoftSkills}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Experience}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Skills}</td>
                        <td className="py-4 px-2 border-b border-r">{result.Achievements}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          :
          <h2 className="text-center text-xl text-red-500 mt-4">No results generated!</h2>
      }
    </div>
  )
}
