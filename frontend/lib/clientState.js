export default {
  resolvers: {
    Mutation: {
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
      },
      removeFilters(_, args, { cache }) {
        cache.writeData({
          data: {
            jobTagFilter: null,
            jobGroupFilter: null,
            jobGroupTags: null
          }
        });
      }
    }
  },
  defaults: {
    projectId: false,
    jobGroupFilter: null,
    jobGroupTag: null
  }
};
