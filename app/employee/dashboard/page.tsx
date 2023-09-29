'use client';
import React, { useState, useRef } from 'react';
import CustomCard from '../../components/custom-card';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Dashboard() {
  const eventCards = [
    {
      id: 97,
      title: 'AI Design Course',
      type: 'Workshop',
      description:
        'Earn a digital certificate from MIT xPRO and enhance your AI knowledge',
      date: '1 Oct 2023',
      status: 'Open',
      image:
        'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE='
    },
    {
      id: 98,
      title: 'Workshop',
      type: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Open'
    },
    {
      id: 99,
      title: 'Workshop',
      type: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Open'
    },
    {
      id: 100,
      title: 'Workshop',
      type: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Cancelled'
    },
    {
      id: 101,
      title: 'Workshop on Smart and Circular Cities',
      type: 'Workshop',
      description:
        'Organized in the scope of the 8th IEEE International Smart Cities Conference',
      date: '1 Oct 2023',
      status: 'Registered',
      image:
        'https://images.ctfassets.net/3dar4x4x74wk/6eytQAc9gwE7u80yQu0sNZ/3f6bd009f0342b07357b0a6ed339855a/ME_Careers-Site_Home_Header_1536x800.jpg'
    },
    {
      id: 102,
      title: 'Workshop',
      type: 'Workshop',
      description: 'Workshop Workshop',
      date: '1 Oct 2023',
      status: 'Open'
    },
    {
      id: 103,
      title: 'Pilates',
      type: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Open',
      image:
        'https://bestinsingapore.com/wp-content/uploads/2020/08/reformer-pilates-1569423354-1024x515.jpg'
    },
    {
      id: 104,
      title: 'Activity',
      type: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Registered'
    },
    {
      id: 105,
      title: 'Activity',
      type: 'Activity',
      description: 'Activity Activity',
      date: '2 Oct 2023',
      status: 'Cancelled'
    }
  ];

  const [currentTab, setCurrentTab] = useState('Workshop');

  const filteredCards =
    currentTab === 'Workshop'
      ? eventCards.filter((card) => card.type === 'Workshop')
      : eventCards.filter((card) => card.type === 'Activity');

  const carouselImages = [
    ...eventCards
      .filter((item) => [97, 101, 103].includes(item.id))
      .map((item) => ({ image: item.image, title: item.title }))
  ];

  const handleClick = (index: number) => {
    const clickedImage = carouselImages[index];
    if (clickedImage) {
      const targetType = eventCards.find(
        (card) => card.title === clickedImage.title
      )?.type;
      if (targetType) {
        setCurrentTab(targetType);

        // const cardId = `card-${eventCards[index].id}`;
        // const customCardElement = document.getElementById(cardId);
        // if (customCardElement) {
        //   customCardElement.scrollIntoView({ behavior: 'smooth' });
        // }
      }
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
            <div key={index} onClick={() => handleClick(index)}>
              <img
                src={workshop.image}
                alt={`Image ${index}`}
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover'
                }}
              />
              <p className="text-white text-8xl absolute bottom-8 left-8">
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

      {filteredCards.map((card, index) => (
        <div id={`card-${card.id}`} key={index}>
          <CustomCard
            title={card.title}
            description={card.description}
            date={card.date}
            status={card.status}
            style={{ marginBottom: '16px' }}
          />
        </div>
      ))}
    </main>
  );
}
