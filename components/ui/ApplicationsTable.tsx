import React from 'react';
import { Candidate } from '@prisma/client';
import CandidateModal from './CandidateModal';
import Link from 'next/link';

type Application = {
  id: number;
  position: string;
  status: string;
  Candidate: Candidate;
};

interface ApplicationsTableProps {
  data: Application[];
}


const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((application, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
              <td>
                {application.Candidate && (
                   <CandidateModal name={application.Candidate.name}/>
                )}
              </td>
              <td className="px-6 py-4">
                {application.Candidate.link ? (
                    <Link href={application.Candidate.link}>
                    {application.Candidate.link}
                    </Link>
                ) : (
                    'N/A'
                )}
              </td>
              <td className="px-6 py-4">
                {application.status}
              </td>
              <td className="px-6 py-4">
                {application.position}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;