export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    designation: string;
    password: string;
    isAdmin: string;
  }

export interface Event {
    eventId: number;
    eventName: string;
    eventType: string;
    description: string;
    date: Date;
    capacity: number;
    signups: number;
    status: string;
    image: string;
}

export interface Feedback {
  rating: number,
  comment: string,
  eventId: number,
  userId: number
}