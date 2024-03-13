# Proshop

## Description

This is a fully fledged ecommerce web application ecommerce store built with MERN stack. This ecommerce store enable two main different flows or implementations:

1. Buyers browse the store products and checkout when items to be bought have been selected
2. Admins setup and manage products and users

- Technologies:
  - ExpressJs provides the backend environment for this application
  - Mongoose schemas to model the application data
  - React for displaying UI components
  - Redux to manage application's state
  - Redux Thunk middleware to handle asynchronous redux actions

## Database Seed

The seed command will :

- Add initial users to the application database.
- Add initial products to the application database.
- For more information, see code [here](server/utils/seed.js)

```
npm run data:import
```

## Install

1. In your command line navigate to the root of the application containing the `client` and `backend` directories then run

```
$ npm install
```

2. In your command line navigate to the client directory then run

```
$ npm install
```

## Setup

```
 * Create .env file
 * Copy the contents of .env.example and paste in .env
 * fill the values required
```

## Start development

In the root of the application run

```
$ npm run start
```

This will start both the client and server using `concurrently`

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)
