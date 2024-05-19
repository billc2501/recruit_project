import React from 'react'

const HeaderBox = ({ name, instructions}: HeaderBoxProps) => {
  return (
    <div>
        <h1>
            <div className='text-center'>
                <span className="text-[#0179FE]">
                    Please start assessment, <strong>{name}</strong>
                </span> 
                <p>
                    {instructions}
                </p>
            </div>
        </h1>

    </div>
  )
}

export default HeaderBox