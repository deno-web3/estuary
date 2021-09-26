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
    const { '0': miner } = await client.public.getAllMiners()

    expect(typeof miner.addr).toBe('string')
    expect(typeof miner.name).toBe('string')
    expect(typeof miner.suspended).toBe('boolean')
    expect(miner.version).toMatch(/lotus/)
  })
  it('queryMiner(minerId)', async () => {
    const miner = await client.public.queryMiner('f015927')

    expect(typeof miner.miner).toBe('string')
    expect(typeof miner.price).toBe('string')
    expect(typeof miner.verifiedPrice).toBe('string')
    expect(typeof miner.maxPieceSize).toBe('number')
    expect(typeof miner.minPieceSize).toBe('number')
  })
})

run()
