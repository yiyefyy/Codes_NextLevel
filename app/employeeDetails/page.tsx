'use client';

import React, { useEffect, useState } from 'react';
import CustomCardRegistered from '../components/custom-card-registered';
import { Card, Metric, Text, Title, Flex, Grid, BarChart, Legend, LineChart, Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
     } from '@tremor/react';
import { fetchAllUsers, fetchUser } from '../../pages/api/userApi';
import { getRegisteredEvents } from '../../pages/api/registeredEventApi';


async function EmployeeDetails(id : any) {

  const employeeId = id.searchParams.id
  const userData = await fetchUser(employeeId)

  const registeredEvents = await getRegisteredEvents(employeeId)

  const allUsers = await fetchAllUsers()
  console.log(allUsers)     

  var total_events = 0
  var num_users = allUsers.length
  await Promise.all(
    allUsers.map(async (user) => {
        const event_num = await getRegisteredEvents(user.userId.toString())
        total_events = event_num.length + total_events
        console.log("calculation", total_events)
    })
  );

  console.log("out of map", total_events, num_users)
  const user_avg = (total_events / num_users).toFixed(3)

  const comparisonData = [
      {
          name: "Agency Average", 
          "Number of sign ups": user_avg
      }, 
      {
          name: userData.firstName,
          "Number of sign ups": registeredEvents.length
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

  return (
    <main className="flex p-4 md:p-10 mx-auto min-w-2xl max-w-8xl flex-row justify-center">
      <div>
      <Card className="mt-6 pb-4">
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