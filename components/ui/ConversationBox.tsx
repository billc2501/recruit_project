import React from 'react'

const ConversationBox = ({id, status} : ConversationBoxProps) => {
  return (
        status == 'pending' ?
        <div className='text-center'>
            {id} 
        </div>
        :
        <div className='text-center'>
            Completed
        </div>
    )}

export default ConversationBox