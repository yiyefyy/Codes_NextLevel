'use client';
import React, { useState, useRef, useEffect } from 'react';
import CustomCard from '../components/custom-card';
import { eventData } from '../data/EventData';
import { useEventContext } from '../data/EventProvider';
import { getRegisteredEvents } from '../../pages/api/registeredEventApi';
import Loading from '../loading';
interface EventType {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  status: string;
  image?: string;
}

export default function Schedule({userId} : {userId: Number}) {
  const { eventData, addEventToUpcoming } = useEventContext();
  const [eventCards, setEventCards] = useState(eventData);
  const [currentTab, setCurrentTab] = useState('Upcoming');
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();

  useEffect(() => {
    fetchRegisteredEvents();
    setLoading(false);
  })

  const fetchRegisteredEvents = async () => {
    const data = await getRegisteredEvents(`${userId}`);
    console.log(data);
  }

  const filteredCards =
    currentTab === 'Upcoming'
      ? eventCards.filter((card: EventType) => {
          const cardDate = new Date(card.date);
          return card.status === 'Registered' && cardDate > currentDate;
        })
      : eventCards.filter((card: EventType) => {
          const cardDate = new Date(card.date);
          return card.status === 'Registered' && cardDate < currentDate;
        });

  const handleCardCancellation = (cardId: number) => {
    const updatedEventCards = eventCards.map((card: EventType) => {
      if (card.id === cardId) {
        return { ...card, status: 'Cancelled' };
      }
      return card;
    });

    setEventCards(updatedEventCards);
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex mb-4">
        <button
          onClick={() => setCurrentTab('Upcoming')}
          className={`${
            currentTab === 'Upcoming'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
          } px-4 py-2 rounded`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setCurrentTab('History')}
          className={`${
            currentTab === 'History'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
          } px-4 py-2 rounded`}
        >
          History
        </button>
      </div>

      {filteredCards.length === 0 && currentTab === 'Upcoming' ? (
        <p className="ml-4 text-gray-500 text-l">
          You have no upcoming events or activities.
        </p>
      ) : filteredCards.length === 0 && currentTab === 'History' ? (
        <p className="ml-4 text-gray-500 text-l">
          You have no history of events or activites.
        </p>
      ) : (
        filteredCards.map((card: EventType, index: number) => (
          <div id={`card-${card.id}`} key={index}>
            <CustomCard
              title={card.title}
              description={card.description}
              date={card.date}
              status={card.status}
              onCancel={() => handleCardCancellation(card.id)}
              style={{ marginBottom: '16px' }}
            />
          </div>
        ))
      )}
    </main>
  );
}
