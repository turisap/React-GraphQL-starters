# React-GraphQL-siteapp

![alt text](https://res.cloudinary.com/dyqwnbgpw/image/upload/v1562838467/toolbox/Screenshot_from_2019-07-11_05-46-32.png)

## [DEMO](https://site-app-next-prod.herokuapp.com) 
Use credentials `example@gmail.com` and `Turisap1` as email and password to login. Signup and reset password features are disabled

## Nextjs/Prisma dashboard for construction site managers
This is a simple dashboard for monitoring projects and task at each one. Basically, it is a TODO app 
adjasted to a site manager's needs. However, far not all planned features have been implemented due 
to challenges appeared while using stack, namely complexity and failure-prone of code when making complex 
nested queries to the server. Additionally, it was too ambitious to build such a complex application only on
my own, therefore most of features hasn't been implemented.

## Stack
- Frontend: `Nextjs` and `React-Apollo`
- Backend: `graphql-yoga` wih a `prisma` demo server.
- Styling: SCSS, CSS grid and flexbox for layout
- Form validation: [react-advanced-form](https://github.com/kettanaito/react-advanced-form)

## Setting up
- clone the repository on you machine
- to install all dependencies you need to run `npm install` in the root directory, then in
`./frontend`, then in `./backend`
- delete cookies from `localhost` in the browser you are going to use
- open `./backend/prisma.yml` and comment out this line
    ```
    endpoint: https://site-app-production-f849e89a54.herokuapp.com/site-app-prod/prod
    ```
   and uncomment this line (by removing `#`):
   ```
   #endpoint: ${env:PRISMA_ENDPOINT}
   ```
- rename `./backend/.env-examples` to `./backend/.env`
- replace empty the four following environment vars as follows:
    ```
    PRISMA_ENDPOINT="https://us1.prisma.sh/kirill-shakirov-5f22b4/boilerplate/dev"
    PRISMA_SECRET="9RZZ3ubXCaeCocPrWp9Vx6gBdmM4iBeE"
    PRISMA_DEBUG=false
    APP_SECRET="1XPsHxXYKYIfi0uG4TgGfet3zxBE6DB8"
    ```
    This is a demo server which was set up specifically for demonstration purposes this is the reason 
    why I share those env vars, so feel free to make any changes. 
- run `npm run app` in the root directory. If everything has been set up well you will be able to 
see login page at `localhost:7777`
- you also might need to install some global dependencies
- use credentials `example@gmail.com` and `Turisap1` as email and password to login. Sign up and change password 
features aren't enabled as it requires email verification and emailing service wasn't set up. You can 
use yours if you want, just set respective environmental vars in `./backend/.env`
