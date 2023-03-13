<div align="center">

# Estuary

[![nest badge][nest-badge]](https://nest.land/package/estuary) [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Coverage][cov-badge]][cov] [![][docs-badge]][docs] [![][code-quality-img]][code-quality]

</div>

Unofficial Deno API client for [Estuary](https://estuary.tech/), a custom IPFS + Filecoin node that makes it easy to pin IPFS content and make Filecoin deals.

## Example

```ts
import { EstuaryClient } from 'https://deno.land/x/estuary/mod.ts'

const client = new EstuaryClient('API_KEY')

console.log(await client.public.getAllMiners())
```

[docs-badge]: https://img.shields.io/github/v/release/deno-web3/estuary?label=Docs&logo=deno&style=flat-square&color=black
[docs]: https://doc.deno.land/https/deno.land/x/estuary/mod.ts
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/deno-web3/estuary/main.yml?branch=master&style=flat-square&logo=github&label=&color=black
[cov]: https://coveralls.io/github/deno-web3/estuary
[github-actions]: https://github.com/deno-web3/estuary/actions
[cov-badge]: https://img.shields.io/coveralls/github/deno-web3/estuary?style=flat-square&color=black&
[nest-badge]: https://img.shields.io/badge/published%20on-nest.land-black?style=flat-square
[code-quality-img]: https://img.shields.io/codefactor/grade/github/deno-web3/estuary?style=flat-square&color=black&
[code-quality]: https://www.codefactor.io/repository/github/deno-web3/estuary
