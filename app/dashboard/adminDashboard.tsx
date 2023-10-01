'use client';

import React, { useEffect, useState } from 'react';
import CustomCardAdmin from '../components/custom-card-admin';
import LineGraph from './LineGraph';
import { Card, Metric, Text, Title, BarList, Flex, Grid, DonutChart, Legend } from '@tremor/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchAllEvents } from '../../pages/api/eventApis';
import { Event } from '../../pages/api/interfaces';
import { getFeedbacks } from '../../pages/api/feedbackApi';

export default function AdminDashboard() {

  const [eventCards, setEventCards] = useState<Event[]>([]);
  const [ratedCards, setRatedCards] = useState<{ name: string, value: number }[]>([]);
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

        setEventCards(sortedEventCards);

        const eventRatings = await Promise.all(
          events.map(async(event) => {
            const feedback = await getFeedbacks(event.eventId);
            const totalRating = feedback.reduce((sum, fb) => sum + fb.rating, 0)
            const value = feedback.length > 0 ? totalRating / feedback.length : 0;
            const name = event.eventName
            return {
              name,
              value,
            };
          })
        );

          const sortedCards = eventRatings.sort((a, b) => b.value - a.value)

          setRatedCards(sortedCards);
        
      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, []);

  const workshopCount = eventCards.filter((event) => event.eventType === "Workshop").length;
  const activityCount = eventCards.filter((event) => event.eventType === "Activity").length;

  const eventDistribution = [
    { name: 'Workshops', value: workshopCount },
    { name: 'Activities', value: activityCount }
  ];

  const totalEvents = eventCards.length

  const [currentTab, setCurrentTab] = useState('Workshop');

  const avg_rating = (ratedCards.reduce((sum, fb) => sum + fb.value, 0)/ratedCards.length).toFixed(1);

  const filteredCards =
    currentTab === 'Workshop'
      ? eventCards.filter((card) => card.eventType === 'Workshop' && card.status == 'Open')
      : eventCards.filter((card) => card.eventType === 'Activity' && card.status == 'Open');

  return (
    <main className="flex p-4 md:p-10 mx-auto min-w-2xl max-w-8xl flex-row justify-center">
      <div>
        <LineGraph />
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
              data={ratedCards.slice(0, 5)}
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
            className={`${currentTab === 'Workshop'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              } px-4 py-2 rounded`}
          >
            Workshops
          </button>
          <button
            onClick={() => setCurrentTab('Activity')}
            className={`${currentTab === 'Activity'
              ? 'border-slate-500 text-slate-700 block pl-3 pr-4 py-2 border-b-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              } px-4 py-2 rounded`}
          >
            Activities
          </button>
        </div>

        {filteredCards.map((card, index) => (
          <div id={`card-${card.eventId}`} key={index}>
            <CustomCardAdmin
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
  );
}