# React-GraphQL-siteapp
Nextjs/Prisma dashboard for construction site managers

![alt text](https://res.cloudinary.com/dyqwnbgpw/image/upload/v1562838467/toolbox/Screenshot_from_2019-07-11_05-46-32.png)
## Setting up
- Clone the repository on you machine with `git clone`
- To install all dependencies you need to run `npm install` in the root directory, then in
`./frontend`, then in `./backend`
- Get a prisma endpoint and stick it into `./backend/.env` (you can make a copy from `.env-examples`). To get an endpoint you need to
perform the following actions
   - go to [Prisma website](https://www.prisma.io/) and Sing up for an account.
   - `cd` to `./backend` and run `npm i -g prisma`
   - run `prisma login` in your terminal
   - after authentication run `prisma init` in `./backend` and choose Demo Server and follow the instructions. Chose 'Don't generate'
   for the last question.
   - after creating a service in Prisma there will be two new files created in your `./backend` folder: `prisma.yml` and 
   `datamodel.prisma`. Copy `endpoint` from the former and paste it into your `.env` as `PRISMA_ENDPOINT` (you can make a copy from 
   `.env-examples`)
   - replace contents of your `prisma.yml` with this code:
    ```
    endpoint: ${env:PRISMA_ENDPOINT}
    datamodel: datamodel.prisma
    #secret: ${env:PRISMA_SECRET}
    
    hooks:
      post-deploy:
        - graphql get-schema -p prisma
    ```
    - run `prisma deploy` in your `./backend` folder
    - go to [github repo](https://github.com/turisap/React-GraphQL-siteapp/blob/master/backend/datamodel.prisma) and copy contents
    of `datamodel.prisma` to your `./backend/datamodel.prisma`
    - run `prisma deploy` in your in `./backend`.
- You also need to set to set your `mailtrap` credentials