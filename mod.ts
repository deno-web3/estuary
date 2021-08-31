const API_URL = 'https://api.estuary.tech'

const request = async ({
  url,
  apiKey,
  options = { headers: {} }
}: {
  url: string
  apiKey: string
  options?: RequestInit
}) =>
  await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${apiKey}`
    }
  })

export class PinningClient {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
  async pins() {
    const res = await request({ url: '/pinning/pins', apiKey: this.apiKey })

    const json = await res.json()

    return json
  }
}

export class Estuary {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
}
