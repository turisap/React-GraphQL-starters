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
        //console.log('setting group filter to local state')
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
      // setJobGroupTags(_, { jobGroupTags }, { cache }) {
      //   //console.log("setting tags to local state to 0", jobGroupTags);
      //   cache.writeData({
      //     data: {
      //       jobGroupTags
      //     }
      //   });
      // },
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
