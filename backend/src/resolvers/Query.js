// const { forwardTo } = require("prisma-binding");
// const { hasPermission } = require("../utils");
// const { PERMISSIONS } = require("../PermissionTypes");
const { forwardTo } = require("prisma-binding");

const Query = {
    // items : forwardTo('db'),
    // item : forwardTo('db'),
    // itemsConnection : forwardTo('db'),
    user: forwardTo("db"),
    project: forwardTo("db"),
    projects: forwardTo("db"),
    occupations : forwardTo("db"),

    /**
   * Gets a current user
   */
    me(parent, arg, ctx, info) {
        const userId = ctx.request.userId;
        if (!userId) return null;
        return ctx.db.query.user(
            {
                where: { id: userId }
            },
            info
        );
    },

    /**
   * returns a logged in user's own projects
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*|{}>}
   */
    async myProjects(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");

        return await ctx.db.query.projects(
            {
                where: { owner: { id: userId } }
            },
            info
        );
    },

    /**
   * Fetches jobs for a given project based on a project id from client side.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
    async projectJobs(parent, args, ctx, info) {
        const { userId, projectId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please specify a project to work on");

        return await ctx.db.query.jobs({
            where: { project: { id: projectId } }
        }, info);
    },

    async projectParticipants(parent, args, ctx, info) {
        const { userId, projectId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please specify a project to work on");

        return await ctx.db.query.users({
            where: { projects_every: { id: projectId } }
        }, info);
    }
};

module.exports = Query;
