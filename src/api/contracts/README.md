# `Contracts`

> Contracts Endpoints microservice.

## Usage

`[POST]` /contracts
> Header required authorization : Valid jwt
Body: `{contract: Contract}`
Output: `contract._id`

`[GET]` /contracts/:id
> Header required authorization : Valid jwt
Output: `Contract`

`[PUT]` /contracts/:id
> Header required authorization : Valid jwt
Body: {contract: Contract}
Output: `Contract`

`[DELETE]`/contracts/:id
> Header required authorization : Valid jwt with Admin rights
