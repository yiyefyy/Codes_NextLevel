import { fetchData } from "./utils";
import { Feedback } from "./interfaces";

const FEEDBACK_API = 'http://localhost:8000/feedbacks'

export async function createFeedback(userId: Number, eventId: number, rating: number, comment: string): Promise<Feedback> {
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


export async function getFeedbackByUser(userId: Number, eventId: number): Promise<Feedback[]> {
  const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({"userId" : userId })
};
  const getFeedbackApi = `${FEEDBACK_API}/${eventId}`
  return fetchData(getFeedbackApi, requestOptions);
}

export async function getFeedbacks(eventId: number): Promise<Feedback[]> {
  const getFeedbackApi = `${FEEDBACK_API}/${eventId}`
  return fetchData(getFeedbackApi);
}