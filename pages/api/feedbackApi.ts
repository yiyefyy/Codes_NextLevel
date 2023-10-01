import { fetchData } from "./utils";
const FEEDBACK_API = 'http://localhost:8000/feedbacks'

export interface Feedback {
    rating: number,
    comment: String,
    eventId: number,
    userId: number
  }

export async function createFeedback(feedback: Feedback): Promise<Feedback> {
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback)
    };
    const create_api = `${FEEDBACK_API}/feedback`
    return fetchData(create_api, requestOptions)
}


export async function getFeedbacks(eventId: number): Promise<Feedback[]> {
  const getFeedbackApi = `${FEEDBACK_API}/${eventId}`
  return fetchData(getFeedbackApi);
}