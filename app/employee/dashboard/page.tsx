'use client';
import React, { useState } from 'react';
import CustomCard from '../../components/custom-card';

export default function Dashboard() {
  const workshopCards = [
    {
      title: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Open'
    },
    {
      title: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Registered'
    },
    {
      title: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Cancelled'
    }
  ];

  const activityCards = [
    {
      title: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Open'
    },
    {
      title: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Registered'
    },
    {
      title: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Cancelled'
    }
  ];

  const [currentTab, setCurrentTab] = useState('Workshop');

  const filteredCards =
    currentTab === 'Workshop' ? workshopCards : activityCards;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex mb-4">
        <button
          onClick={() => setCurrentTab('Workshop')}
          className={`${
            currentTab === 'Workshop'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
          } px-4 py-2 rounded`}
        >
          Workshops
        </button>
        <button
          onClick={() => setCurrentTab('Activity')}
          className={`${
            currentTab === 'Activity'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
          } px-4 py-2 rounded`}
        >
          Activities
        </button>
      </div>

      {filteredCards.map((card, index) => (
        <CustomCard
          key={index}
          title={card.title}
          description={card.description}
          date={card.date}
          status={card.status}
          style={{ marginBottom: '16px' }}
        />
      ))}
    </main>
  );
}
