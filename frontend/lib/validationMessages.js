export default {
  generic: {
    missing: "Please provide the required field",
    invalid: "The value you have provided is invalid"
  },

  /** these are examples of validation messages for input types
   * view an article here https://medium.com/@kettanaito/advanced-forms-in-react-made-easy-92a6e208f017
   * **/
  // type: {
  //   email: {
  //     missing: 'Please provide the e-mail',
  //     invalid: ({ value }) => `The e-mail "${value}" has invalid format`
  //   },
  //   password: {
  //     invalid: 'The password you entered is invalid',
  //     rule: {
  //       capitalLetter: 'Include at least one capital letter',
  //       minLength: 'Password must be at least 6 characters long'
  //     }
  //   }
  // },

  name: {
    // create job form
    jobGroup: {
      isRequired: "You need to provide job group to proceed"
    },

    createJob__title: {
      isRequired: "You need to provide job title to create a job"
    }
  }
};
