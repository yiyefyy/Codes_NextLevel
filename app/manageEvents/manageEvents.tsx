'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Divider } from "@tremor/react";
import EventForm from '../components/event-form';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CustomCardEdit from '../components/custom-card-edit';
import { fetchAllEvents } from '../../pages/api/eventApis';
import { Event } from '../../pages/api/interfaces';

export default function ManageEvents() {

  const [eventCard, setEventCard] = useState<Event[]>([]);

 
  useEffect(() => {
    // Fetch events when the component mounts
    async function fetchData() {
      try {
        const events = await fetchAllEvents();
        const sortedEventCards = [...events].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });

        setEventCard(sortedEventCards);
        
      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, [eventCard]);
    
    return (
        <main className="p-10">

            <h1 className="font-semibold text-lg pb-3">Manage Events</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="font-semibold text-base pb-0">Add Event</h1>
                <Divider/>
                <EventForm/>
                <h1 className="font-semibold text-base pb-0">Edit Event</h1>
                <Divider/>
                {eventCard.map((card) => (
                    <div id={`card-${card.eventId}`} key={card.eventId}>
                    <CustomCardEdit
                        id={card.eventId}
                        title={card.eventName}
                        description={card.description}
                        date={card.date.toString().split('T')[0]}
                        status={card.status}
                        capacity={card.capacity}
                        signUps={card.signups}
                        style={{ marginBottom: '16px' }}
                    />
                    </div>
                ))}
            </div>

        </main>
    )

}