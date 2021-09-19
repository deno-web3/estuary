const API_URL = 'https://api.estuary.tech'

export const createRequest =
  ({ apiKey }: { apiKey: string }) =>
  async ({ url, options = {} }: { url: string; options?: RequestInit }) => {
    const headers = new Headers({
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    })

    const res = await fetch(`${API_URL}${url}`, {
      ...options,

      headers
    })

    const json = await res.json()

    if (res.status.toString().startsWith('4')) {
      console.log(json)

      throw new Error(`${options.method || 'GET'} request to ${url} failed, error: ${json?.error}`)
    }

    return json
  }
