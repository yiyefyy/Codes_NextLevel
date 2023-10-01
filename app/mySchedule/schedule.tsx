'use client';
import React, { useState, useEffect } from 'react';
import CustomCard from '../components/custom-card';
import { Event } from '../../pages/api/interfaces';
import { deregisterFromEvent, getRegisteredEvents } from '../../pages/api/registeredEventApi';
import Loading from '../loading';
import toast from 'react-hot-toast';

export default function Schedule({userId} : {userId: Number}) {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [currentTab, setCurrentTab] = useState('Upcoming');
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();

  useEffect(() => {
    fetchRegisteredEvents();
  }, [loading]);

  async function fetchRegisteredEvents() {
    setLoading(true);
    try {
      const data : Event[] = await getRegisteredEvents(`${userId}`);
      setEventData(data);
      setLoading(false);
    } catch (error : any){
      toast.error(error.message);
      setLoading(false);
    }
  }

  const filteredCards =
    currentTab === 'Upcoming'
      ? eventData.filter((card: Event) => {
        console.log(eventData);
          const cardDate = new Date(card.date);
          card.status = "Registered";
          return cardDate > currentDate;
        })
      : eventData.filter((card: Event) => {
          const cardDate = new Date(card.date);
          card.status = "Attended";
          return cardDate < currentDate;
        });

  const handleCardCancellation = async (cardId: number) => {
    try {
      await deregisterFromEvent(`${userId}`, `${cardId}`);
      const updatedEventCards = eventData.map((card: Event) => {
        if (card.eventId === cardId) {
          return { ...card, status: 'Cancelled' };
        }
        return card;
      });
  
      setEventData(updatedEventCards);
    } catch (error : any) {
      toast.error(error.message);
    }
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
        filteredCards.map((card: Event) => (
          <div id={`card-${card.eventId}`} key={card.eventId}>
            <CustomCard
              employeeId={userId}
              eventId={card.eventId}
              title={card.eventName}
              description={card.description}
              date={`${card.date}`}
              status={card.status}
              onCancel={() => handleCardCancellation(card.eventId)}
              style={{ marginBottom: '16px' }}
            />
          </div>
        ))
      )}
    </main>
  );
}