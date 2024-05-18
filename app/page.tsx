'use client'

import React, { useEffect, useState } from 'react';
import UploadDoc from '@/components/ui/UploadDoc';
import ApplicationsTable from '@/components/ui/ApplicationsTable';
import { Candidate } from '@prisma/client';

async function getApplications() {
  const res = await fetch(`api/application`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const responseData = await res.json();
  console.log(responseData);
  return responseData.data;
}

const Home: React.FC = () => {
  const [applications, setApplications] = useState<{Candidate: Candidate, id: number; position: string; status: string}[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <UploadDoc onUploadComplete={handleUploadComplete} />
      <ApplicationsTable data={applications} />
      <span>footer</span>
    </div>
  );
};

export default Home;