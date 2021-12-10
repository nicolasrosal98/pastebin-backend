# Pastebin Back-end

This repo sets up the backend for a pastebin web application:

[Project Documentation](https://www.notion.so/weareacademy/Team-C3A6-Project-1-520281047840438db29cd7d7e57dd5c7)

[Heroku Server](https://pastebin-kasianico.herokuapp.com/) (Use /pastes path to get data from database)

[Front-end Repo](https://github.com/nicolasrosal98/pastebin-frontend)

## Install

`yarn`

## Running the app
### Locally

`yarn start:dev`

Sets env var LOCAL to true, running the app locally. 

### Heroku
`start` or `start:dev:heroku`
When the project is deployed to heroku, the command in your Procfile file will be run.

## DB Setup
Copy .env.example to a .env file and set DATABASE_URL and PORT to your liking.

Example for a local database: DATABASE_URL=postgres://academy@localhost/pastebindb
