# React-GraphQL-siteapp
Nextjs/Prisma dashboard for construction site managers

![alt text](https://res.cloudinary.com/dyqwnbgpw/image/upload/v1562838467/toolbox/Screenshot_from_2019-07-11_05-46-32.png)
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
- use credentials `example@gmail.com` and `Turisap1` as email and password to login. Sign up and change password 
features aren't enabled as it requires email verification and emailing service wasn't set up. You can 
use yours if you want, just set respective environmental vars in `./backend/.env`