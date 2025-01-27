import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const registerData = await getData(request);

  const [passes, errors] = await validasaur.validate(
    registerData,
    registerValidationRules,
  );

  if (!passes) {
    console.log(errors);
    registerData.validationErrors = errors;
    render("registration.eta", registerData);
  } else {
    await userService.addUser(
      registerData.email,
      await bcrypt.hash(registerData.password),
    );
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  const data = {
    email: "",
  };
  render("registration.eta", data);
};

export { getData, registerUser, showRegistrationForm };
