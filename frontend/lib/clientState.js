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
      // job sorting filter bar in /features/jobs/JOBS.js
      setJobGroupFilter(_, { jobGroupFilter }, { cache }) {
        cache.writeData({
          data: {
            jobGroupFilter
          }
        });
        return null;
      },
      setJobTagFilter(_, { jobTagFilter }, { cache }) {
        cache.writeData({
          data: {
            jobTagFilter
          }
        });
      }
    }
  },
  defaults: {
    projectId: false,
    jobGroupFilter: false,
    jobGroupTag: null
  }
};
