import { fetchData } from "./utils";
import { Feedback } from "./interfaces";

const FEEDBACK_API = 'http://localhost:8000/feedbacks'

export async function createFeedback(userId: string, eventId: string, rating: number, comment: string): Promise<Feedback> {
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({"userId" : userId, "eventId" : eventId, "rating": rating, "comment": comment})
    };
    const create_api = `${FEEDBACK_API}/feedback`
    return fetchData(create_api, requestOptions)
}

export async function getFeedbackByUser(userId: string, eventId: string): Promise<Feedback> {
  const getFeedbackApi = `${FEEDBACK_API}/user/${userId}/event/${eventId}`
  return fetchData(getFeedbackApi);
}

export async function checkHasFeedback(userId: string, eventId: string): Promise<Boolean> {
  const data = await getFeedbackByUser(userId, eventId);
  return data != null;
}

export async function getFeedbacks(eventId: string): Promise<Feedback[]> {
  const getFeedbackApi = `${FEEDBACK_API}/${eventId}`
  return fetchData(getFeedbackApi);
}