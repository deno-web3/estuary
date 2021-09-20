# Estuary

[![nest badge][nest-badge]](https://nest.land/package/tinyhttp) [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Coverage][cov-badge]][cov] [![][docs-badge]][docs] [![][code-quality-img]][code-quality]

Unofficial Deno API client for [Estuary](https://estuary.tech/), a custom IPFS + Filecoin node that makes it easy to pin IPFS content and make Filecoin deals.

## Example

```ts
import { EstuaryClient } from 'https://deno.land/x/estuary/mod.ts'

const client = new EstuaryClient('API_KEY')

console.log(await client.public.getAllMiners())
```

[docs-badge]: https://img.shields.io/github/v/release/deno-libs/estuary?label=Docs&logo=deno&style=for-the-badge&color=black
[docs]: https://doc.deno.land/https/deno.land/x/estuary/mod.ts
[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/estuary/CI?style=for-the-badge&logo=github&label=&color=black
[cov]: https://coveralls.io/github/deno-libs/estuary
[github-actions]: https://github.com/deno-libs/estuary/actions
[cov-badge]: https://img.shields.io/coveralls/github/deno-libs/estuary?style=for-the-badge&color=black&
[nest-badge]: https://img.shields.io/badge/publushed%20on-nest.land-black?style=for-the-badge
[code-quality-img]: https://img.shields.io/codefactor/grade/github/deno-libs/estuary?style=for-the-badge&color=black&
[code-quality]: https://www.codefactor.io/repository/github/deno-libs/estuary
