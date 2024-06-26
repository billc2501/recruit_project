'use client'

import React, { useEffect, useState } from 'react';
import HeaderBox from '../../../components/HeaderBox';
import ConversationBox from '@/components/ui/ConversationBox';

interface HomeProps {
  params: {
    id: string;
  };
}

const Home: React.FC<HomeProps> = ({ params }) => {
  const [candidateName, setCandidateName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");

  const handleComplete = () => {
    console.log(status);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/specificApplication?invite_link=${params.id}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Assuming your data contains the logged-in user's information
            setCandidateName(data.relevantCandidate.Candidate.name);
            setStatus(data.relevantCandidate.status);
            setPosition(data.relevantCandidate.position);
            setIsLoading(false);
        } else {
            throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);
  return (
    isLoading 
    ? 
    <div>
        loading
    </div>
    :
    status != "completed"
    ?
    <section>
      <div>
        <header>
          <HeaderBox 
            name={candidateName}
            instructions={"Talk about your experience in regards to the position of " + position}
          />
        </header>
        <ConversationBox 
          invite={params.id}
          onComplete={handleComplete}
        />
      </div>
    </section>
    :
    <div>
        Completed
    </div>
  );
};

export default Home;