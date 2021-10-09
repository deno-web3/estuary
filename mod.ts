import type { Pin, PinList, DataFromCID, Content, Deal, Transfer } from './types.ts'
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
  /**
   * Get a list of all pinned objects.
   * @see https://docs.estuary.tech/pinning-list
   * @returns pin list
   */
  async listPins(): Promise<PinList> {
    return await this.request({ url: '/pinning/pins' })
  }
  /**
   * Add a new pin object for the current access token.
   * @param options
   * @returns pin
   */
  async addPin({ name, cid }: { name: string; cid: string }): Promise<Pin> {
    return await this.request({
      url: '/pinning/pins',
      options: { body: JSON.stringify({ name, cid }), method: 'POST' }
    })
  }
  /**
   * Get a pinned object.
   * @param id pin ID
   * @returns pin
   */
  async pinById(id: number | string): Promise<Pin> {
    return await this.request({ url: `/pinning/pins/${id}` })
  }
  /**
   * Remove a pinned object
   * @param id pin ID
   */
  async removePin(id: number | string): Promise<void> {
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
  async stats({ offset = 0, limit = 500 }: { offset?: number; limit?: number }): Promise<
    {
      id: number
      cid: Record<string, string>
      file: string
      bwUsed: number
      totalRequests: number
      offloaded: boolean
      aggregatedFiles: number
    }[]
  > {
    return await this.request({
      url: `/content/stats?offset=${offset}&limit=${limit}`
    })
  }
  async deals(): Promise<Content[]> {
    return await this.request({
      url: `/content/deals`
    })
  }
  async dealStatusById(id: number): Promise<{
    content: Content
    deals: {
      deal: Deal
      transfer: Transfer
      onChainState: any
    }[]
    failuresCount: number
  }> {
    return await this.request({
      url: `/content/status/${id}`
    })
  }
}

export class PublicClient extends Client {
  constructor(apiKey: string) {
    super(apiKey)
  }
  async getPublicStats(): Promise<{
    totalStorage: number
    totalFiles: number
    dealsOnChain: number
  }> {
    return await this.request({
      url: `/public/stats`
    })
  }
  async getDealsOnChain(): Promise<
    {
      time: string
      dealsOnChain: number
      dealsOnChainBytes: number
      dealsAttempted: number
      dealsSealed: number
      dealsSealedBytes: number
      dealsFailed: number
    }[]
  > {
    return await this.request({
      url: '/public/metrics/deals-on-chain'
    })
  }
  async queryMiner(miner: string): Promise<{
    miner: string
    price: string
    verifiedPrice: string
    minPieceSize: number
    maxPieceSize: number
  }> {
    return await this.request({
      url: `/public/miners/storage/query/${miner}`
    })
  }
  async getMinerFailures(miner: string): Promise<
    Record<
      string,
      {
        ID: number
        CreatedAt: string
        UpdatedAt: string
        DeletedAt: null
        miner: string
        phase: string
        message: string
        content: number
        minerVersion: string
      }
    >
  > {
    return await this.request({
      url: `/public/miners/failures/${miner}`
    })
  }
  async getMinerDeals(miner: string): Promise<
    Record<
      string,
      {
        id: number
        CreatedAt: string
        UpdatedAt: string
        content: number
        propCid: string
        miner: string
        dealId: number
        failed: boolean
        verified: boolean
        failedAt: string
        dtChan: string
        transferStarted: string
        transferFinished: string
        onChainAt: string
        sealedAt: string
        contentCid: string
      }
    >
  > {
    return await this.request({
      url: `/public/miners/deals/${miner}`
    })
  }
  async getMinerStats(miner: string): Promise<{
    miner: string
    name: string
    version: string
    usedByEstuary: true
    dealCount: number
    errorCount: number
    suspended: boolean
    suspendedReason: string
    chainInfo: {
      peerId: string
      addresses: string[]
      owner: string
      worker: string
    }
  }> {
    return await this.request({
      url: `/public/miners/stats/${miner}`
    })
  }
  async getAllMiners(): Promise<
    Record<
      string,
      {
        addr: string
        name: string
        suspended: boolean
        version: string
      }
    >
  > {
    return await this.request({
      url: `/public/miners`
    })
  }
}

export class EstuaryClient extends Client {
  pins: PinningClient
  content: ContentClient
  public: PublicClient
  constructor(apiKey: string) {
    super(apiKey)
    this.pins = new PinningClient(this.apiKey)
    this.content = new ContentClient(this.apiKey)
    this.public = new PublicClient(this.apiKey)
  }
}
