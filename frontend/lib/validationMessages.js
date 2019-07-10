export default {
  generic: {
    missing: "Please provide the required field",
    invalid: "The value you have provided is invalid"
  },

  /** these are examples of validation messages for input types
   * view an article here https://medium.com/@kettanaito/advanced-forms-in-react-made-easy-92a6e208f017
   * **/
  type: {
    email: {
      missing: "Please provide the e-mail",
      invalid: ({ value }) => `The e-mail "${value}" has invalid format`
    },
    password: {
      invalid: "The password you entered is invalid",
      rule: {
        capitalLetter: "Include at least one capital letter",
        minLength: "Password must be at least 6 characters long"
      }
    }
  },

  name: {
    /**
     * create job form
     */
    jobGroup: {
      missing: pleaseProvideField("job group"),
      rule: {
        isRequired: "You need to provide job group to proceed"
      }
    },
    createJob__title: {
      missing: pleaseProvideField("job title"),
      rule: {
        isRequired: "You need to provide job title to create a job",
        minLength: "Job title should be at least 4 characters long"
      }
    },

    level: {
      missing: pleaseProvideField("level"),
      rule: {
        isInteger: "Level should be a number"
      }
    },

    unit__number: {
      missing: "Please provide unit number"
    },

    assignee: {
      missing: pleaseProvideField("assignee"),
      rule: {
        isRequired: "Please provide an assignee for this job"
      }
    },

    job__picture: {
      missing: pleaseProvideField("job picture"),
      rule: {
        isRequired: pleaseProvideField("job picture")
      }
    },

    createJob__tag: {
      missing: pleaseProvideField("tag. You need to choose job group first.")
    },

    createJob__description: {
      missing: pleaseProvideField("job description"),
      rule: {
        minLength: "Job description should be at least 5 characters long"
      }
    }
  }
};

function pleaseProvideField(fieldName) {
  return `Please provide ${fieldName}`;
}
