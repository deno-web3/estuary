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

export type DataFromCID = [
  {
    content: {
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
    aggregatedIn: {
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
    deals: []
  }
]

export type Stats = {
  id: number
  cid: Record<string, string>
  file: string
  bwUsed: number
  totalRequests: number
  offloaded: boolean
  aggregatedFiles: number
}[]
