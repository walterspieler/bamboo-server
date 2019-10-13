# `Products`

> Products Endpoints microservice.

## Usage

`[POST]` /products
> Header required authorization : Valid jwt
Body: `{product: Product}`
Output: `product._id`

`[GET]` /products/:id
Output: `Product`

`[PUT]` /products/:id
> Header required authorization : Valid jwt
Body: {products: Product}
Output: `Product`

`[DELETE]`/products/:id
> Header required authorization : Valid jwt with Admin rights
