'use client';
import React, { useState, useEffect } from 'react';
import CustomCard from '../components/custom-card';
import { Event } from '../../pages/api/interfaces';
import { checkHasRegistered, deregisterFromEvent, getRegisteredEvents } from '../../pages/api/registeredEventApi';
import Loading from '../loading';
import toast from 'react-hot-toast';
import { checkHasFeedback, getFeedbackByUser } from '../../pages/api/feedbackApi';

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
      await Promise.all(data.filter(async (item) => await filter(item))); 
      await Promise.all(data.map(async (item) => await setStatus(item)));

      setEventData(data);
      setLoading(false);
    } catch (error : any){
      toast.error(error.message);
      setLoading(false);
    }
  }

  const filter = async (data : Event) => {
    const isRegistered = await checkHasRegistered(`${userId}`, `${data.eventId}`);

    return isRegistered;
  }

  const setStatus = async (data : Event) => {
    if (new Date(data.date) > currentDate) {
      data.status = 'Registered';
    } else {
      const feedbackExists = await checkHasFeedback(`${userId}`, `${data.eventId}`);
      data.status = feedbackExists ? 'Reviewed' : 'Attended'
    }
  }

  const filteredCards = currentTab === 'Upcoming'
      ? eventData.filter((card: Event) => {          
          return card.status.toUpperCase() == "REGISTERED";
        })
      : eventData.filter((card: Event) => {
        return card.status.toUpperCase() != "REGISTERED";
      });

  const handleCardCancellation = async (cardId: number) => {
    setLoading(true);
    try {
      await deregisterFromEvent(`${userId}`, `${cardId}`);
      const updatedEventCards = eventData.filter((card: Event) => card.eventId != cardId );
      setEventData(updatedEventCards);
      setLoading(false);
    } catch (error : any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl mb-20">
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