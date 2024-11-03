import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const createNewApplicationByAgent = async (data, userId) => {
  try {
    console.log(data, userId);
    const response = await axios.post(
      `${URL}/api/applications/newByAgent/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerByAdmin = async (
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
  agentId
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
      agentId,
    });

    return response.data;
  } catch (error) {
    console.error("Register error:", error); // Log the error for debugging
    return error.response ? error.response.data : { message: "Network Error" };
  }
};
