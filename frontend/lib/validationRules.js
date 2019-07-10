const validationRules = {
  type: {
    // here you can add validation for different types of inputs
    // omitted in this app due to implementing react-advanced-form middleway
    // view an article here https://medium.com/@kettanaito/advanced-forms-in-react-made-easy-92a6e208f017
    text: {
      isRequired: ({ value }) => value.length > 0
    }
  },

  name: {
    /**
     * Create Jjob form
     */
    jobGroup: {
      isRequired: ({ value }) => parseInt(value) !== 0
    },

    createJob__title: {
      isRequired: ({ value }) => value.length > 0,
      minLength: ({ value }) => value.length > 3
    },

    level: {
      isRequired: ({ value }) => value.length > 0,
      isInteger: ({ value }) => /^[0-9]+$/.test(parseInt(value))
    },

    unit__number: {
      isRequired: ({ value }) => value.length > 0
    },

    assignee: {
      isRequired: ({ value }) => parseInt(value) !== 0
    },

    job__picture: {
      isRequired: ({ file }) => file.length > 6
    },

    createJob__tag: {
      // validates the presence of tag's id
      isRequired: ({ value }) => value.length > 0
    },

    createJob__description: {
      isRequired: ({ value }) => value.length > 0,
      minLength: ({ value }) => value.length > 5
    }
  }
};

export default validationRules;
