'use client';

import React, { useState } from 'react';
import CustomCardAdmin from '../components/custom-card-admin';
import LineGraph from './LineGraph';
import { Card, Metric, Text, Title, BarList, Flex, Grid, DonutChart, Legend } from '@tremor/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AdminDashboard() {
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


const ratings = [
    { name: 'AI Workshop', value: 4.9 },
    { name: 'Pilates', value: 4 },
    { name: 'Food Tasting', value: 5 },
    { name: 'Safety Crashcourse', value: 4.7 },
    { name: 'Global Discussion', value: 4.9 }
  ];
  
  const eventDistribution = [
    { name: 'Workshops', value: 23 },
    { name: 'Activities', value: 34 }
  ];

  const sumOfValues = (data) => {
    return data.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
  };
  const totalEvents = sumOfValues(eventDistribution)
  

  const [currentTab, setCurrentTab] = useState('Workshop');

  const avg_rating = 4.5 // TODO 

  const filteredCards =
    currentTab === 'Workshop'
      ? eventCards.filter((card) => card.type === 'Workshop')
      : eventCards.filter((card) => card.type === 'Activity');

  return (
    <main className="flex p-4 md:p-10 mx-auto min-w-2xl max-w-8xl flex-row justify-center">
      <div>
        <LineGraph/>
        <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
            <Card key="Best Rated Events">
                <Title>Best Rated Events</Title>
                <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
                >
                <Metric>{avg_rating}/5</Metric>
                <Text>Average rating</Text>
                </Flex>
                <Flex className="mt-6">
                <Text>Event</Text>
                <Text className="text-right">Rating</Text>
                </Flex>
                <BarList
                data={ratings}
                valueFormatter={(number: number) =>
                    Intl.NumberFormat('us').format(number).toString()
                }
                className="mt-2"
                />
            </Card>
            <Card key="Event Distribution">
                <Title>Event Distribution</Title>
                <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
                >
                <Metric>{totalEvents}</Metric>
                <Text>Total Events in September</Text>
                </Flex>
                <Flex className="mt-6">
                </Flex>
                <DonutChart
                data={eventDistribution}
                valueFormatter={(number: number) =>
                    Intl.NumberFormat('us').format(number).toString()
                }
                className="mt-2"
                />
                <Legend
                    className="mt-3"
                    categories={["Activities", "Workshops"]}
                    colors={["teal", "blue"]}
                />
            </Card>
        </Grid>
      </div>

      <div className="ml-5"> 
      <h1 className="text-lg font-medium font-semibold">Upcoming</h1>

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
          <CustomCardAdmin
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
  );
}