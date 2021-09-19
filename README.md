# Estuary

Unofficial Deno API client for [Estuary](https://estuary.tech/), a custom IPFS + Filecoin node that makes it easy to pin IPFS content and make Filecoin deals.

## Example

```ts
import { EstuaryClient } from 'https://deno.land/x/estuary/mod.ts'

const client = new EstuaryClient('API_KEY')

console.log(await client.public.getAllMiners())
```
