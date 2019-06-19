// const { forwardTo } = require("prisma-binding");
// const { hasPermission } = require("../utils");
// const { PERMISSIONS } = require("../PermissionTypes");
const { forwardTo } = require("prisma-binding");

const Query = {
    // items : forwardTo('db'),
    // item : forwardTo('db'),
    // itemsConnection : forwardTo('db'),
    user: forwardTo("db"),
    projects: forwardTo("db"),
    occupations: forwardTo("db"),
    organisations: forwardTo("db"),

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
   * Fetches a project based on id from request
   * @param parent
   * @param arg
   * @param ctx
   * @param info
   * @returns {*}
   */
    project(parent, arg, ctx, info) {
        const projectId = ctx.request.projectId;
        if (!projectId) throw new Error("You must specify a project to work with");
        return ctx.db.query.project(
            {
                where: { id: projectId }
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
                where: {
                    owner: { id: userId }
                }
            },
            `{
      id
      title
      address
      levels_number
      image
      owner {id, name}}`
        );
    },

    /**
   * Determines if project saved in cookies belongs to the logged in user and exist
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<boolean>}
   */
    async projectExistsAndBelongsToUser(parent, args, ctx, info) {
        const { userId } = ctx.request;
        const projectId = args.projectId;

        const project = await ctx.db.query.project(
            {
                where: { id: projectId }
            },
            `{ 
      owner {
      id
      name
      }
       }`
        );

        if (project) return project.owner.id === userId;
        return false;
    },

    /**
   * Fetches jobs for a given project based on a project id from client side.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */

    // async testJobs (parent, args, ctx, info) {
    //   return await ctx.db.query.jobs({
    //     where: {
    //       AND: [{ project: { id: args.projectId } }, { tag: { id: args.jobTag } }]
    //     }
    //   }, `{id
    //     title
    //     level
    //     unit
    //     tag {
    //       id
    //       jobGroup
    //       title
    //     }}`)
    // },



    async projectJobs(parent, args, ctx, info) {
        const { userId, projectId } = ctx.request;
        const { jobGroup, jobTag } = args;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please specify a project to work on");

        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ JBGORUP");
        // console.log({jobGroup, jobTag});
        if (jobGroup && jobTag) {

            const res = await ctx.db.query.jobs({
                where: {
                    AND: [{ project: { id: projectId } }, { tag: { id: args.jobTag } }]
                }
            }, `{id
      title
      level
      unit
      tag {
        id
        jobGroup
        title
      }}`);
            // console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS+++++++", res);
            return res;
        }

        return await ctx.db.query.jobs(
            {
                where: { project: { id: projectId } }
            },
            `{id
      title
      level
      unit
      tag {
        id
        jobGroup
        title
      }}`
        );
    },

    /**
   * Fetches people who participate in a given project
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*|{}>}
   */
    async projectParticipants(parent, args, ctx, info) {
        const { userId, projectId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please specify a project to work on");

        return await ctx.db.query.users(
            {
                where: { projects_every: { id: projectId } }
            },
            info
        );
    },

    /**
   * Fetches all employees of an organization based on a search term and logged in user id
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<void>}
   */
    async searchInOrganizationByName(parent, args, ctx, info) {
        const { userId, user, projectId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please specify a project to work on");

        return await ctx.db.query.users(
            {
                where: {
                    AND: [
                        { name_contains: args.searchTerm },
                        { organisation: { id: user.organisation } },
                        { occupation: { id: args.occupation } }
                    ]
                }
            },
            "{id, name, email, image, occupation {title}}"
        );
    },

    /**
   * Fetches all tags based on a chosen job category
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
    async allTagsOfJobGroup(parent, args, ctx, info) {
        return await ctx.db.query.tags(
            {
                where: {
                    jobGroup: args.jobGroup
                }
            },
            info
        );
    }
};

module.exports = Query;
