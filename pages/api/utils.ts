export async function fetchData(api: string, requestOptions = {}): Promise<any> {
    const response = await fetch(api, requestOptions)
    const results = await response.json()
    if (!response.ok) {
      throw new Error(results.error)
    }
    return results.res
  }
  