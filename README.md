# cuppa

> A full MERN stack tea collection tracker

Cuppa is built on React with Redux, Node using Express and Mongoose, and connected to a MongoDB database. It also uses JWT tokens for authentication and user management. Scripts are built using Webpack. This is not a Create-React-App-based project.

## Table of Contents

- [cuppa](#cuppa)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Install](#install)
  - [Local Usage](#local-usage)
  - [Heroku Usage](#heroku-usage)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## Background
Cuppa was created to fill a personal need. I have a large variety of teas I enjoy drinking, a whole cabinet full of them. In order to keep track of what I drink, how much, when I'm running low, etc. I needed a simple app. Coincedentally, I wanted to dig deeper into React and build something full stack while I was at it. The end result is Cuppa.

## Install

After downloading the repo, run `npm install` in both the root and client folders.

You'll need to create a MongoDB database (I used [mlab.com](mlab.com)). Once that's complete, make a copy of the `.env.default` file in the root, rename it `.env` and paste in the correct uri for your database.

## Local Usage

- Use `npm run dev` to launch both the server and front end apps.
- On a successful build, you can then open `http://localhost:1234` to view the app.

## Heroku Usage

- Use `npm run build` to create a static build.
- Add `MONGOURI` and the url for the mongoDB database to the Config Vars on Heroku's dashboard.
- [Deploy to Heroku](https://devcenter.heroku.com/articles/git)

## API
TODO: fill in this information

## Maintainers

[@jenniferlynparsons](https://github.com/jenniferlynparsons)

## Contributing
This is a personal project, so I'm unlikely to accept PRs but you're welcome to fork the project.

Please follow the [coding standards.](https://github.com/jenniferlynparsons/cuppa/blob/master/coding-standards.md)

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Jennifer Lyn Parsons
