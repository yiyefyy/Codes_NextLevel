'use client';
import React, { createContext, useContext, useState } from 'react';
import { eventData } from './EventData';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [initialEventData, setInitialEventData] = useState(eventData);

  const addEventToUpcoming = (event) => {
    setInitialEventData((prevEvents) => [...prevEvents, event]);
    updateEventStatus(event.id, 'Registered');
  };

  const removeEventFromUpcoming = (event) => {
    const updatedEvents = initialEventData.map((e) =>
      e.id === event.id ? { ...e, status: 'Open' } : e
    );

    setInitialEventData(updatedEvents);
    updateEventStatus(event.id, 'Open');
  };

  const updateEventStatus = (eventId, newStatus) => {
    const updatedEventData = initialEventData.map((event) => {
      if (event.id === eventId) {
        return { ...event, status: newStatus };
      }
      return event;
    });

    setInitialEventData(updatedEventData);
  };

  return (
    <EventContext.Provider
      value={{
        eventData: initialEventData,
        addEventToUpcoming,
        updateEventStatus,
        removeEventFromUpcoming
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
