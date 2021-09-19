import { Pin } from './types.ts'
import { request } from './request.ts'

type EstuaryResponse<T> = T | { error: string }

export class PinningClient {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
  async listPins(): Promise<EstuaryResponse<Pin>> {
    const json = await request({ url: '/pinning/pins', apiKey: this.apiKey })

    return json
  }
  async addPin({ name, cid }: { name: string; cid: string }): Promise<Pin> {
    const json = await request({
      url: '/pinning/pins',
      apiKey: this.apiKey,
      options: { body: JSON.stringify({ name, cid }), method: 'POST' }
    })

    return json
  }
}

export class Estuary {
  apiKey: string
  pins: PinningClient
  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.pins = new PinningClient(this.apiKey)
  }
}

const client = new Estuary('EST1fc72df8-47a4-4a6f-9aef-df851240f2faARY')

client.pins
  .addPin({
    name: 'rainbow.png',
    cid: 'QmVSra3pDm1vNbSSXKXCtCKrq47eAfo5oczTHzty57gyQG'
  })
  .then(console.log)
