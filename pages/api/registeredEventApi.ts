import { fetchData } from "./utils";
import { Event } from "./interfaces";

const REGISTERED_EVENT_API = 'http://localhost:8000/registeredevents'


export async function getRegisteredEvents(userId: string): Promise<Event[]> {
  const getEventsApi = `${REGISTERED_EVENT_API}/${userId}`
  return fetchData(getEventsApi);
}

export async function registerForEvent(userId: string, eventId: string): Promise<Event[]> {
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
      body: JSON.stringify({"eventId" : eventId})
    };
    const response = await fetch(getEventsApi, requestOptions)
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error)
    }
}