'use client';
import React, { useEffect, useState } from 'react';
import CustomCard from '../components/custom-card';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchAllEvents } from '../../pages/api/eventApis';
import toast from 'react-hot-toast';
import { Event } from '../../pages/api/interfaces';
import { checkHasRegistered, deregisterFromEvent, registerForEvent } from '../../pages/api/registeredEventApi';

export default function EmployeeDashboard({userId} : {userId: Number}) {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [currentTab, setCurrentTab] = useState('Workshop');
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents();
  }, [loading]);
  
  const getAllEvents = async () => {
    try {
      const data = await fetchAllEvents();
      await Promise.all(data.map(async (item) => await setStatus(item))); 
      setEventData(data);
      setLoading(false);
    } catch (err : any) {
      toast.error(err.message);
      setLoading(false);
    }
  }

  const setStatus = async (data : Event) => {
    const isRegistered = await checkHasRegistered(`${userId}`, `${data.eventId}`);

    if (isRegistered) {
      data.status = 'Registered';
    }
  }

  const filteredCards =
    currentTab === 'Workshop'
      ? eventData.filter((card: Event) => {
          const cardDate = new Date(card.date);
          return card.eventType.toUpperCase() === 'WORKSHOP' && cardDate > currentDate;
        })
      : eventData.filter((card: Event) => {
          const cardDate = new Date(card.date);
          return card.eventType.toUpperCase() === 'ACTIVITY' && cardDate > currentDate;
        });

  const carouselImages = [
    ...eventData
      .filter((item: Event) => item.image != null)
      .map((item: Event) => ({ image: item.image, title: item.eventName }))
  ];

  const handleSignUpForEvent = async (eventId : number) => {
    try {
      await registerForEvent(`${userId}`, `${eventId}`);
      filteredCards.map((item) => {
      if (item.eventId == eventId) {
          item.status = 'Registered'
        }
      })
    } catch (error : any) {
      console.log(error);
    }
  }

  const handleCancelForEvent = async (eventId: number) => {
    try {
      await deregisterFromEvent(`${userId}`, `${eventId}`);

      filteredCards.map((item) => {
        if (item.eventId == eventId) {
            item.status = 'Open'
          }
        })

    } catch (error : any) {
      console.log(error);
    }
  };


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl mb-20">
      <div className="mb-4 rounded-lg overflow-hidden">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          emulateTouch={true}
          useKeyboardArrows={true}
        >
          {carouselImages.map((workshop, index) => (
            <div key={index}>
              <img
                src={workshop.image}
                alt={`Image ${index}`}
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover'
                }}
              />
              <p className="bg-slate-700 bg-opacity-60 rounded p-4 text-white text-6xl absolute bottom-8 left-8">
                {workshop.title}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

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

      {filteredCards.map((card: Event) => (
        <div id={`card-${card.eventId}`} key={card.eventId}>
          <CustomCard
            employeeId={userId}
            eventId = {card.eventId}
            title={card.eventName}
            description={card.description}
            date={`${card.date}`}
            status={card.status}
            style={{ marginBottom: '16px' }}
            onSignup={() => handleSignUpForEvent(card.eventId)}
            onCancel={() => handleCancelForEvent(card.eventId)}
          />
        </div>
      ))}
    </main>
  );
}
