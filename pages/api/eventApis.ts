import { fetchData } from "./utils";
import { Event } from "./interfaces";

const EVENTS_API = 'http://localhost:8000/events';

export interface NewEvent {
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
export interface updateEvents {
  eventName: string,
  eventType: string,
  description: string,
  date: Date,
  capacity: number,
  status: string;
  image: string
}

export interface Signup {
  userId: number,
  eventId: number
}

export async function createEvent(event: NewEvent): Promise<NewEvent> {
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

export async function fetchAllEvents(): Promise<NewEvent[]> {
  return fetchData(EVENTS_API);
}

export async function fetchAllEmployeeEvents(): Promise<Event[]> {
  return fetchData(EVENTS_API);
}

export async function fetchEvent(eventId: string): Promise<NewEvent> {
  const fetchEventApi = `${EVENTS_API}/${eventId}`
  return fetchData(fetchEventApi)
}

export async function fetchEventStatus(eventId: string): Promise<String> {
  const event = await fetchEvent(eventId);
  return event.status;
}

export async function changeEventStatus(eventId: string, status: string): Promise<void> {
  const requestOptions = {
    method: "PUT",
    mode: 'cors',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status)
  };
  const add_api = `${EVENTS_API}/status/${eventId}`
  return fetchData(add_api, requestOptions)
}

export async function updateEvent(event: updateEvents, eventId: string): Promise<updateEvents> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  };
  const add_api = `${EVENTS_API}/update/${eventId}`
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