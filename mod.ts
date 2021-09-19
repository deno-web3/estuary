import type { Pin, PinList, DataFromCID, Stats } from './types.ts'
import { createRequest } from './request.ts'

class Client {
  apiKey: string
  request: ReturnType<typeof createRequest>
  constructor(apiKey: string) {
    this.apiKey = apiKey

    this.request = createRequest({ apiKey })
  }
}

export class PinningClient extends Client {
  constructor(apiKey: string) {
    super(apiKey)
  }
  async listPins(): Promise<PinList> {
    return await this.request({ url: '/pinning/pins' })
  }
  async addPin({ name, cid }: { name: string; cid: string }): Promise<Pin> {
    return await this.request({
      url: '/pinning/pins',
      options: { body: JSON.stringify({ name, cid }), method: 'POST' }
    })
  }
  async pinById(id: number) {
    return await this.request({ url: `/pinning/pins/${id}` })
  }
  async removePin(id: number) {
    return await this.request({ url: `/pinning/pins/${id}`, options: { method: 'DELETE' } })
  }
}

export class ContentClient extends Client {
  constructor(apiKey: string) {
    super(apiKey)
  }
  async add(file: Blob) {
    const body = new FormData()
    body.append('append', file)
    return await this.request({ url: `/content/add`, options: { method: 'POST', body } })
  }
  async addFromIPFS({ name, root }: { name: string; root: string }): Promise<Pin> {
    return await this.request({
      url: `/content/add-ipfs`,
      options: { method: 'POST', body: JSON.stringify({ name, root }) }
    })
  }
  async dataByCID(cid: string): Promise<DataFromCID> {
    return await this.request({
      url: `/content/by-cid/${cid}`
    })
  }
  async stats({ offset = 0, limit = 500 }: { offset?: number; limit?: number }): Promise<Stats> {
    return await this.request({
      url: `/content/stats?offset=${offset}&limit=${limit}`
    })
  }
  async deals() {
    return await this.request({
      url: `/content/deals`
    })
  }
}

export class Estuary extends Client {
  pins: PinningClient
  content: ContentClient
  constructor(apiKey: string) {
    super(apiKey)
    this.pins = new PinningClient(this.apiKey)
    this.content = new ContentClient(this.apiKey)
  }
}

const client = new Estuary('EST1fc72df8-47a4-4a6f-9aef-df851240f2faARY')

client.content.stats({}).then(console.log)
