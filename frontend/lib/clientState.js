export default {
  resolvers: {
    Mutation: {
      setProjectId(_, { projectId }, { cache }) {
        cache.writeData({
          data: {
            projectId
          }
        });
        return { data: { projectId } };
      }
    }
  },
  defaults: {
    projectId: false
  }
};
