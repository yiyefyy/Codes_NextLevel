'use client';
import React, { useState } from 'react';
import CustomCard from '../../components/custom-card';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEventContext } from '../../data/EventProvider';

interface EventType {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  status: string;
  image?: string;
}

export default function EmployeeDashboard() {
  const {
    eventData,
    addEventToUpcoming,
    updateEventStatus,
    removeEventFromUpcoming
  } = useEventContext();
  const [currentTab, setCurrentTab] = useState('Workshop');
  const currentDate = new Date();

  const filteredCards =
    currentTab === 'Workshop'
      ? eventData.filter((card: EventType) => {
          const cardDate = new Date(card.date);
          return card.type === 'Workshop' && cardDate > currentDate;
        })
      : eventData.filter((card: EventType) => {
          const cardDate = new Date(card.date);
          return card.type === 'Activity' && cardDate > currentDate;
        });

  const carouselImages = [
    ...eventData
      .filter((item: EventType) => [97, 101, 103].includes(item.id))
      .map((item: EventType) => ({ image: item.image, title: item.title }))
  ];

  const handleSignUpForEvent = (eventId: number) => {
    const eventToSignUpFor = eventData.find(
      (event: EventType) => event.id === eventId
    );

    if (eventToSignUpFor) {
      updateEventStatus(eventId, 'Registered');

      addEventToUpcoming(eventToSignUpFor);
    }
  };

  const handleCancelForEvent = (eventId: number) => {
    const eventToCancel = eventData.find(
      (event: EventType) => event.id === eventId
    );

    if (eventToCancel) {
      updateEventStatus(eventId, 'Open');

      removeEventFromUpcoming(eventToCancel);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
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

      {filteredCards.map((card: EventType, index: number) => (
        <div id={`card-${card.id}`} key={index}>
          <CustomCard
            title={card.title}
            description={card.description}
            date={card.date}
            status={card.status}
            style={{ marginBottom: '16px' }}
            onSignup={() => handleSignUpForEvent(card.id)}
            onCancel={() => handleCancelForEvent(card.id)}
          />
        </div>
      ))}
    </main>
  );
}
