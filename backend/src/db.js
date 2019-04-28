/**
 * This files connects to the remote Prisma DB and allows us to query it with JS
 */

const { Prisma } = require('prisma-binding');

const db = new Prisma({
    typeDefs : 'src/generated/prisma.graphql',
    endpoint : process.env.PRISMA_ENDPOINT,
    secret   : process.env.PRISMA_SECRET,
    debug    : process.env.PRISMA_DEBUG
});

module.exports = db;