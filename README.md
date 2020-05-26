# Back-End

- This is the Rest API for Build-Week-Sleep-Tracker-Vick
- It can be found at `https://my-sleep-tracker.herokuapp.com/`

## /api/auth

These are the only two routes that do not require a token. You must register and then login and use the token to go to any other route.

- **[POST]** to `/api/auth/register`: returns the newly created user. Pass in the following credentials as the `body` of the request: `{ firstName: 'Jane', lastName: 'Doe', email: 'janedoe@gmail.com', password: 'mypassword'}`
- **[POST]** to `/api/auth/login`: returns a message, a Json Web Token (JWT) that is good for 1 day, the user's email, and the user's id. Pass in the following credentials as the `body` of the request: `{ firstName: 'Jane', lastName: 'Doe', password: 'mypassword' }`

## /api/users

These routes are for the manipulation of users in the database. You must pass a valid token in the headers of all these routes.

- **[GET]** to `/api/users`: returns an array of objects each containing a unique user's data.
- **[PUT]** to `/api/users/:id`: updates the user using the `id` passed as part of the URL. Send the user object with the updated information as the `body` of the request.
- **[DELETE]** to `/api/users/:id`: removes the user and any sleep entries associated with the user and returns a message.

## /api/entries

These routes are for the creation and manipulation of sleep entries in the database. You must pass a valid token in the headers of all these routes.

- **[GET]** to `/api/entries`: returns an array of objects containing each entries data.
- **[GET]** to `/api/entries/:id`: returns the entry specified in the `id` passed as part of the URL.
- **[GET]** to `/api/entries/:id/user`: returns 7 of the latest entries for the user specified in the `id` passed as part of the URL. They are returned as an array of objects.
- **[POST]** to `/api/entries`: returns the newly created entry. Pass in the following data as the `body` of the request: `{ date: a number expressing a date, timeSlept: a number expressing time slept, mood: a number from 0 to 3, userId: a number matching the user Id of the user creating the entry }`
- **[PUT]** to `/api/entries/:id`: updates the entry using the `id` passed as part of the URL. Send the entry object with the updated information as the `body` of the request.
- **[DELETE]** to `/api/entries/:id`: removes the entry with the `id` specified in the URL. Returns a message `{ message: "Successfully removed entry 1" }` only the entry number is the `id` specified in the URL.
