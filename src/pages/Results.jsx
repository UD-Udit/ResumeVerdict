import React from 'react'

export const Results = ({results}) => {
  return (
    <div>
        {
            results ? 
            <div>
                {
                    results?.map((result, id) => (
                        <div key={id}>
                        <p>{result}</p>
                        </div>
                    ))
                }
            </div>
            :
            <h2>No results generated!</h2>
        }
    </div>
  )
}
