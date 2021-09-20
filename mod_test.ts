import { describe, expect, it, run } from 'https://deno.land/x/tincan@0.2.2/mod.ts'
import { EstuaryClient } from './mod.ts'

const client = new EstuaryClient('')

describe('public endpoints', () => {
  it('getPublicStats()', async () => {
    const req = await client.public.getPublicStats()

    expect(typeof req.dealsOnChain).toBe('number')
    expect(typeof req.totalFiles).toBe('number')
    expect(typeof req.totalStorage).toBe('number')
  })
  it('getDealsOnChain()', async () => {
    const req = await client.public.getDealsOnChain()

    expect(Array.isArray(req)).toBe(true)

    const deal = req[0]

    expect(typeof deal.dealsAttempted).toBe('number')
    expect(typeof deal.dealsFailed).toBe('number')
  })
  it('getAllMiners()', async () => {
    const req = await client.public.getAllMiners()

    expect(req['0']).toEqual({
      addr: 'f015927',
      name: '',
      suspended: false,
      version: 'lotus-1.11.2-rc1+mainnet+git.80624845c'
    })
  })
})

run()
