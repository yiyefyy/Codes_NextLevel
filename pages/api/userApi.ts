import { fetchData } from "./utils";
import { User } from "./interfaces";
const USERS_API = 'http://localhost:8000/users'

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

export async function updateUserPassword(id: Number, password: String): Promise<User> {
  const updateUserApi = `${USERS_API}/${id}`
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"password" : password})
  };
  return fetchData(updateUserApi, requestOptions)
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
