import React from 'react'

const HeaderBox = ({ name, status, instructions}: HeaderBoxProps) => {
  return (
    <div>
        <h1>
            {(
                status == "pending" ?
                <div className='text-center'>
                    <span className="text-[#0179FE]">
                        Please start assessment, <strong>{name}</strong>
                    </span> 
                    <p>
                        {instructions}
                    </p>
                </div>
                :
                <span>
                    Interview Completed <strong>{name}</strong>
                </span>
            )}
        </h1>

    </div>
  )
}

export default HeaderBox