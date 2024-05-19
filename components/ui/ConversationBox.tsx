'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { RetellWebClient } from 'retell-client-js-sdk';

const ConversationBox = ({invite, onComplete} : {invite: string, onComplete: any}) => {
    
    const [startClick, setStartClick] = useState(false);
    const sdk = new RetellWebClient();
    
    const handleStart = async () => {
        setStartClick(true);
        const response = await fetch('/api/registerCall');
        const registerCallResponse = await response.json();
        console.log(registerCallResponse.data);
        sdk.startConversation({
            callId: registerCallResponse.data.call_id,
            sampleRate: registerCallResponse.data.sample_rate,
            enableUpdate: true, // (Optional) You want to receive the update event such as transcript
        }).catch(console.error);
        sdk.on("update", (update) => {
            // Print live transcript as needed
            console.log("update", update);
        })
    }

    const handleStop = async () => {
        sdk.stopConversation()
        console.log('stop')
        const resp = await fetch('/api/status', {
            method: 'POST',
            body: JSON.stringify({invite: invite}),
        })
        onComplete();
    }

    return (
        <div className='text-center mb-4'>
            <Button onClick={handleStart} disabled={startClick} className="mr-2 bg-green-600">Start</Button>
            <Button onClick={handleStop} className="bg-red-500">Stop</Button>
        </div>
    )}

export default ConversationBox