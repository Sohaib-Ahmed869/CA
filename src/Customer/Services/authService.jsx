import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${URL}/api/auth/login`, {
      email,
      password,
    });

    console.log("login", response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (
  industry,
  qualification,
  yearsOfExperience,
  locationOfExperience,
  state,
  formalEducation,
  formalEducationAnswer,
  firstName,
  lastName,
  phone,
  email,
  country,
  questions,
  toc,
  password,
  type,
  price
) => {
  try {
    console.log(URL);
    console.log(industry);
    const response = await axios.post(`${URL}/api/users/register`, {
      industry,
      lookingForWhatQualification: qualification,
      yearsOfExperience,
      locationOfExperience,
      state,
      formal_education: formalEducation,
      qualification: formalEducationAnswer,
      firstName,
      lastName,
      phone,
      email,
      country,
      questions,
      toc,
      password,
      type,
      price,
    });

    return response.data;
  } catch (error) {
    console.error("Register error:", error); // Log the error for debugging
    return error.response ? error.response.data : { message: "Network Error" };
  }
};

export const registerAgent = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${URL}/api/agent/register`, {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Register error:", error); // Log the error for debugging
    return error.response ? error.response.data : { message: "Network Error" };
  }
};
