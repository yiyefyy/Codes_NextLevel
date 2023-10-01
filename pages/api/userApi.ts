import { fetchData } from "./utils";
const USERS_API = 'http://localhost:8000/users'

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

export async function createUser(user: User): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  };
  const register_api = `${USERS_API}/register`
  return fetchData(register_api, requestOptions)
}

export async function fetchAllUsers(): Promise<User[]> {
  return fetchData(USERS_API);
}

export async function fetchUser(userId: string): Promise<User> {
  console.log("user id received", userId)
  const fetchUserApi = `${USERS_API}/${userId}`
  return fetchData(fetchUserApi)
}

export async function deleteUser(userId: string): Promise<void> {
  const deleteUserApi = `${USERS_API}/${userId}`
  const requestOptions = {
    method: "DELETE"
  };
  const response = await fetch(deleteUserApi, requestOptions)
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }
}
