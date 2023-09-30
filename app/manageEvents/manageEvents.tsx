'use client';
import React, { useState, useRef } from 'react';
import { Divider } from "@tremor/react";
import EventForm from '../components/event-form';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CustomCardEdit from '../components/custom-card-edit';

export default function ManageEvents() {

    const eventCards = [
        {
          id: 97,
          title: 'AI Design Course',
          type: 'Workshop',
          description:
            'Earn a digital certificate from MIT xPRO and enhance your AI knowledge',
          date: '1 Oct 2023',
          status: 'Open',
          capacity: 20, 
          signUps: 10,
          image:
            'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE='
        },
        {
          id: 98,
          title: 'Workshop',
          type: 'Workshop',
          description: 'Workshop Workshop',
          date: '1 Oct 2023',
          status: 'Open',
          capacity: 30, 
          signUps: 30,
        },
        {
          id: 99,
          title: 'Workshop',
          type: 'Workshop',
          description: 'Workshop Workshop',
          date: '1 Oct 2023',
          status: 'Open',
          capacity: 100, 
          signUps: 1,
        },
        {
          id: 100,
          title: 'Workshop',
          type: 'Workshop',
          description: 'Workshop Workshop',
          date: '1 Oct 2023',
          status: 'Cancelled',
          capacity: 20, 
          signUps: 0,
        },
        {
          id: 101,
          title: 'Workshop on Smart and Circular Cities',
          type: 'Workshop',
          description:
            'Organized in the scope of the 8th IEEE International Smart Cities Conference',
          date: '1 Oct 2023',
          status: 'Closed',
          capacity: 20, 
          signUps: 19,
          image:
            'https://images.ctfassets.net/3dar4x4x74wk/6eytQAc9gwE7u80yQu0sNZ/3f6bd009f0342b07357b0a6ed339855a/ME_Careers-Site_Home_Header_1536x800.jpg'
        },
        {
          id: 102,
          title: 'Workshop',
          type: 'Workshop',
          description: 'Workshop Workshop',
          date: '1 Oct 2023',
          status: 'Open',
          capacity: 20, 
          signUps: 10,
        },
        {
          id: 103,
          title: 'Pilates',
          type: 'Activity',
          description: 'Activity Activity',
          date: '2 Oct 2023',
          status: 'Open',
          capacity: 30, 
          signUps: 10,
          image:
            'https://bestinsingapore.com/wp-content/uploads/2020/08/reformer-pilates-1569423354-1024x515.jpg'
        },
        {
          id: 104,
          title: 'Activity',
          type: 'Activity',
          description: 'Activity Activity',
          date: '2 Oct 2023',
          status: 'Closed',
          capacity: 50, 
          signUps: 8,
        },
        {
          id: 105,
          title: 'Activity',
          type: 'Activity',
          description: 'Activity Activity',
          date: '2 Oct 2023',
          status: 'Cancelled',
          capacity: 10, 
          signUps: 10,
        }
      ];
    
    return (
        <main className="p-10">

            <h1 className="font-semibold text-lg pb-3">Manage Events</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="font-semibold text-base pb-0">Add Event</h1>
                <Divider/>
                <EventForm/>
                <h1 className="font-semibold text-base pb-0">Edit Event</h1>
                <Divider/>
                {eventCards.map((card, index) => (
                    <div id={`card-${card.id}`} key={index}>
                    <CustomCardEdit
                        title={card.title}
                        description={card.description}
                        date={card.date}
                        status={card.status}
                        capacity={card.capacity}
                        signUps={card.signUps}
                        style={{ marginBottom: '16px' }}
                    />
                    </div>
                ))}
            </div>

        </main>
    )

}