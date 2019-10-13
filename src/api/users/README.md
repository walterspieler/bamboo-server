# `users`

> User Endpoints microservice.

## Usage

`[POST]` /users
Body: `{user: User, password: string}`
Output: `user._id`

`[GET]` /users/:id
> Header required authorization : Valid jwt
Output: `User`

`[PUT]` /users/:id
Body: {user: User}
> Header required authorization : Valid jwt
Output: `User`

`[POST]`/users/login
Body: {email: string, password: string}
Output: `user.id`

`[POST]`/users/login/:id
Body: {otp: string}
Output: `JWToken`

`[DELETE]`/users/:id
> Header required authorization : Valid jwt
