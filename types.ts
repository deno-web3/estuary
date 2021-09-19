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
