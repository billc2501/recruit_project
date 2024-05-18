import React from 'react'
import HeaderBox from '../../../components/HeaderBox';
import ConversationBox from '@/components/ui/ConversationBox';

const page = ({ params }: InviteProps) => {
const loggedIn = {firstName: "James"}
  return (
    <section>
        <div>
            <header>
                <HeaderBox 
                    name={loggedIn?.firstName || 'Guest'}
                    status="pending"
                    instructions="Complete your thing"
                />
            </header>
            <ConversationBox 
                id={params.id}
                status="completed"
            />
        </div>
    </section>
  )
}

export default page