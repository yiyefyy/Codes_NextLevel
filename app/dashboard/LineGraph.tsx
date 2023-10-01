'use client';

import { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';
import {  fetchAllEvents } from '../../pages/api/eventApis';
import { Event } from '../../pages/api/interfaces';

export default function LineGraph() {

  const [events, setEvents] = useState<Event[]>([]);
  const [engagementRate, setEngagementRate] = useState<{ date: string, year_2022: number, year_2023: number }[]>([]);

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

        setEvents(sortedEventCards);

        const eventsCurrYear = events.filter((event) => {
          const year = new Date(event.date).getFullYear();
          return year === 2023;
        })
        console.log(events)
        console.log("check")
        console.log(eventsCurrYear)

        const engagement = eventsCurrYear.map((event) => {
          const rate = ((event.signups / event.capacity) * 100).toFixed(1);

          const dateObject = new Date(event.date);
          const pastYearRate = ((event.signups / event.capacity) * 70).toFixed(1) // to be replaced with actual data
          const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
          const day = dateObject.getUTCDate().toString().padStart(2, '0');

          const formattedDate = `${month}-${day}`;
          return {
            date: formattedDate,
            year_2022: parseFloat(pastYearRate),
            year_2023: parseFloat(rate)
          }
        })
        console.log(engagement)
        const sortedEngagement = [...engagement].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        setEngagementRate(sortedEngagement)

      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="mt-8 bg-white mb-8">
      <Title>Historical Engagement Rates</Title>
      <Text>Comparison between Engagement Rates of different years</Text>
      <AreaChart
        className="mt-4 h-80"
        data={engagementRate}
        categories={['year_2022', 'year_2023']}
        index="date"
        colors={['indigo', 'fuchsia']}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat('us').format(number).toString()} %`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
