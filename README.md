# mini-auth-project

## API documentation

Start the backend from the `backend` directory with `npm run dev`. Once the
server is running, open Scalar at `http://localhost:5000/docs`. The generated
OpenAPI document is available at `http://localhost:5000/openapi.json`.

The API is served under `/api`:

- `POST /api/register`
- `POST /api/login`
- `GET /api/users` (requires a JWT bearer token)
- `DELETE /api/users/me` (deletes the authenticated user's account)

To delete an account in Scalar, first call `/api/login` and copy the returned
JWT. Use Scalar's **Authorize** control to enter the token, then execute
`DELETE /api/users/me`. The backend creates the users table on startup if it
does not exist.