'use client';

import React, { useEffect, useState } from 'react';
import CustomCardRegistered from '../components/custom-card-registered';
import { Card, Metric, Text, Title, Flex, Grid, BarChart, Legend, LineChart, Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Badge, } from '@tremor/react';
import { User, fetchAllUsers, fetchUser } from '../../pages/api/userApi';
import { getRegisteredEvents, RegisteredEvent } from '../../pages/api/registeredEventApi';
import { Event } from '../../pages/api/eventApis';


async function EmployeeDetails(id : any) {

  //  const [userAvg, setUserAvg] = useState(0)
  // const [userData, setUserData] = useState<User>()
  //  const [numRegisteredEvents, setNumRegisteredEvents] = useState(0)
  // const [registeredEvents, setRegisteredEvents] = useState<Event[]>([])

  const employeeId = id.searchParams.id
  const userData = await fetchUser(employeeId)

  const registeredEvents = await getRegisteredEvents(employeeId)

  const allUsers = await fetchAllUsers()
  console.log(allUsers)     

  var total_events = 0
  var num_users = allUsers.length
  allUsers.map(async (user) => {
      const event_num = await getRegisteredEvents(user.userId.toString())
      total_events = event_num.length + total_events
  });
  const user_avg = total_events / num_users 

  /* useEffect(() => {
    async function getAvg() {

        const registeredEvents = await getRegisteredEvents(employeeId)
        setNumRegisteredEvents(registeredEvents.length)
        setRegisteredEvents(registeredEvents)
      
        const allUsers = await fetchAllUsers()
        console.log(allUsers)     
      
        var total_events = 0
        var num_users = allUsers.length
        allUsers.map(async (user) => {
            const event_num = await getRegisteredEvents(user.userId.toString())
            total_events = event_num.length + total_events
        });
        const user_avg =  total_events / num_users
        setUserAvg(user_avg)
    }
    getAvg()
  }, [])  */

  // setUserData(user_data)

  const comparisonData = [
      {
          name: "Agency Average", 
          "Number of sign ups": 5
      }, 
      {
          name: userData.firstName,
          "Number of sign ups": registeredEvents.length
      }
  ]

  const chartData = [
     {
        year: 1970,
        "Export Growth Rate": 2.04,
        "Import Growth Rate": 1.53,
      },
      {
        year: 1971,
        "Export Growth Rate": 1.96,
        "Import Growth Rate": 1.58,
      }
  ]

  const tableRows = [
      {
          name: "Employee ID",
          attribute: "userId"
      }, 
      {
          name: "Department", 
          attribute: "department"
      },{
          name: "Email",
          attribute: "email"
      }, {
          name: "Designation", 
          attribute: "designation"
      }, {
          name: "Admin Rights", 
          attribute: "isAdmin"
      }
  ]

  const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <main className="flex p-4 md:p-10 mx-auto min-w-2xl max-w-8xl flex-row justify-center">
      <div>
      <Card className="mt-6">
            <TableHead>
                <TableRow>
                    <TableHeaderCell>{userData.firstName} {userData.lastName}</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableRows.map((item) => (
                    <TableRow key={item.attribute} >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{(userData as any)[item.attribute].toString()}</TableCell>
                    </TableRow>
                ))
                }
                
            </TableBody>
        </Card>
        <BarChart
          data={comparisonData}
          index="name"
          categories={["Number of sign ups"]}
        />

            <LineChart
                className="mt-6"
                data={chartData}
                index="year"
                categories={["Julie", "Agency Average"]}
                colors={["emerald", "gray"]}
                valueFormatter={dataFormatter}
                yAxisWidth={40}
            />
            <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
            <Card key="Best Rated Events">
                <Title>Best Rated Events</Title>
                <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
                >
                <Metric>{4.2}/5</Metric>
                <Text>Average rating</Text>
                </Flex>
                <Flex className="mt-6">
                <Text>Event</Text>
                <Text className="text-right">Rating</Text>
                </Flex>
            </Card>
            <Card key="Event Distribution">
                <Title>Event Distribution</Title>
                <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
                >
                <Metric>{3}</Metric>
                <Text>Total Events in September</Text>
                </Flex>
                <Flex className="mt-6">
                </Flex>
       
                <Legend
                    className="mt-3"
                    categories={["Activities", "Workshops"]}
                    colors={["teal", "blue"]}
                />
            </Card>
        </Grid>
      </div>

      <div className="ml-5 flex flex-col"> 
        <h1 className="text-lg font-medium font-semibold">Registered Events</h1>

        {registeredEvents.map((card, index) => (
            <div id={`card-${card.eventId}`} key={index}>
                <CustomCardRegistered
                title={card.eventName}
                description={card.description}
                date={card.date.toString().split('T')[0]}
                status={card.status}
                style={{ marginBottom: '16px' }}
                />
            </div>
        ))}
      </div>

    </main>
  );
}

export default EmployeeDetails