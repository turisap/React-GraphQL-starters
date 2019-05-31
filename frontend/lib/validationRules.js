export default {
  type: {
    // here you can add validation for different types of inputs
    // omitted in this app due to implementing react-advanced-form middleway
    // view an article here https://medium.com/@kettanaito/advanced-forms-in-react-made-easy-92a6e208f017
    email: {},

    password: {}
  },

  name: {
    jobGroup: {
      isRequired: ({ value }) => value.length > 0
    }
  },

  // create job form
  createJob__title: {
    isRequired: ({ value }) => value.length
  },

  _isRequired: ({ value }) => value.length > 0
};
