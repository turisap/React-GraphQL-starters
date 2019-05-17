import PasswordValidator from "password-validator";

const validatePassword = password => {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .lowercase()
    .has()
    .uppercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

  return schema.validate(password);
};

export default validatePassword;
