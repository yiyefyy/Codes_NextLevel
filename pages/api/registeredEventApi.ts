import { fetchData } from "./utils";
import {Event} from './eventApis';
const REGISTERED_EVENT_API = 'http://localhost:8000/registeredevents'

export interface RegisteredEvent {
    status: String,
    eventId: number,
    userId: number
  }

export async function getRegisteredEvents(userId: string): Promise<Event[]> {
  const getEventsApi = `${REGISTERED_EVENT_API}/${userId}`
  return fetchData(getEventsApi);
}

// TODO: get user from token
export async function registerForEvent(userId: string, eventId: string): Promise<RegisteredEvent[]> {
    const getEventsApi = `${REGISTERED_EVENT_API}/${userId}`
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventId)
    };
    return fetchData(getEventsApi, requestOptions);
}

export async function deregisterFromEvent(userId: string, eventId: string): Promise<void> {
    const getEventsApi = `${REGISTERED_EVENT_API}/${userId}`
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventId)
    };
    const response = await fetch(getEventsApi, requestOptions)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }
}