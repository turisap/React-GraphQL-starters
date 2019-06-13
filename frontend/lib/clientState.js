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
      },
      setSearchItems(_, { searchItems }, { cache }) {
        cache.writeData({
          data: {
            searchItems
          }
        });
        return null;
      },
      setJobGroupFilter(_, { jobGroupFilter }, { cache }) {
        cache.writeData({
          data: {
            jobGroupFilter
          }
        });
        return null;
      }
    }
  },
  defaults: {
    projectId: false,
    jobGroupFilter: false
  }
};
