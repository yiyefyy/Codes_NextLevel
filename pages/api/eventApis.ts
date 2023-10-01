import { fetchData } from "./utils";
const EVENTS_API = 'http://localhost:8000/events';

export interface Event {
  eventId: number,
  eventName: string,
  eventType: string,
  description: string,
  date: Date,
  capacity: number,
  signUps: number,
  status: string,
  image: string
}

export interface Signup {
  userId: number,
  eventId: number
}

export async function createEvent(event: Event): Promise<Event> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  };
  const add_api = `${EVENTS_API}/add`
  return fetchData(add_api, requestOptions)
}

export async function fetchAllEvents(): Promise<Event[]> {
  return fetchData(EVENTS_API);
}

export async function fetchEvent(eventId: string): Promise<Event> {
  const fetchEventApi = `${EVENTS_API}/${eventId}`
  return fetchData(fetchEventApi)
}

export async function changeEventStatus(eventId: string): Promise<void> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventId)
  };
  const add_api = `${EVENTS_API}/status/${eventId}`
  return fetchData(add_api, requestOptions)
}

export async function updateEvent(event: Event): Promise<Event> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  };
  const add_api = `${EVENTS_API}/update/${event.eventId}`
  return fetchData(add_api, requestOptions)
}


export async function signUpEvent(signup: Signup): Promise<Signup> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signup)
  };
  const add_api = `${EVENTS_API}/signup`
  return fetchData(add_api, requestOptions)
}

export async function deleteEvent(eventId: string): Promise<void> {
  const deleteEventsApi = `${EVENTS_API}/delete/${eventId}`
  const requestOptions = {
    method: "DELETE"
  };
  const response = await fetch(deleteEventsApi, requestOptions)
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }
}