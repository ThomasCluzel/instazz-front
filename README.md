# InstaZZ

This project is the *frontend* of the InstaZZ app of the course ZZ3-javascript-ecosystems.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment

This project uses `dotenv` to set the API_URL.
For the server to work, it needs a `.env` file at the root of the project
containing:
```
REACT_APP_API_URL="domain.name:port"
```

## Run the application

To run the test server:
```sh
npm run start
```

## TODO

* Stop refreshing the list of posts if we reached the end of the list.
* When we post a new post, it should be added to the list of posts below.

--------------------------------------------------------------------------------
Authors: Bruno Jousse & Thomas Cluzel
