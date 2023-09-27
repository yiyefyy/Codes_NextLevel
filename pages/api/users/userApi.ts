
const USERS_API = 'http://localhost:8000/users'

export interface User {
    userId: number;
    email: string;
    username: string;
    password: string;
    name: string;
  }

async function fetchData(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  return results.res
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

export async function fetchUser(username: string): Promise<User> {
  const fetchUserApi = `${USERS_API}/${username}`
  return fetchData(fetchUserApi)
}

export async function deleteUser(username: string): Promise<void> {
  const deleteUserApi = `${USERS_API}/${username}`
  const requestOptions = {
    method: "DELETE"
  };
  const response = await fetch(deleteUserApi, requestOptions)
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }
}