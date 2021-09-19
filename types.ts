export type Pin = {
  requestid: number
  status: string
  created: string
  pin: {
    cid: string
    name: string
    origins: any
    meta: any
  }
  delegates: string[]
  info: any
}

export type PinList = {
  count: number
  results: Pin[]
}

export type Content = {
  id: number
  cid: string
  name: string
  userId: number
  description: string
  size: number
  active: boolean
  offloaded: boolean
  replication: number
  aggregatedIn: number
  aggregate: boolean
  pinning: boolean
  pinMeta: string
  failed: boolean
  location: string
  dagSplit: boolean
}

export type DataFromCID = [
  {
    content: Content
    aggregatedIn: Content
    deals: []
  }
]

export type ChannelID = {
  Initiator: string
  Responder: string
  ID: number
}

export type Transfer = {
  selfPeer: string
  remotePeer: string
  status: number
  statusMessage: string
  sent: number
  received: number
  message: string
  baseCid: string
  channelId: ChannelID
}

export type Deal = {
  ID: number
  CreatedAt: string
  UpdatedAt: string | null
  DeletedAt: string | null
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
}
