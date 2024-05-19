import axios from "axios";
import { useState } from "react";

const BASE_URL = "http://localhost:8000/api"; // Replace with your backend API URL


const storeTokenInLocalStorage = (serverToken) => {
  localStorage.setItem("token", serverToken);
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return { courses : response.data};
  } catch (error) {
    return `failed to fetch users , error : ${error}`;
  }
};

const fetchCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    return `failed to fetch courses , error : ${error}`;
  }
};
export { fetchCourses }


const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    return `failed to fetch users , error : ${error}`;
  }
};

const authenticate = async (logInfo) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/users/login`,
      logInfo
    );

    if (response.status === 200) {
      storeTokenInLocalStorage(response.data.token);
      // console.log(response.data.token)
      const loggedUser = await axios.get(`${BASE_URL}/users/user`, {
        headers: {
          'Authorization': response.data.token,
        },
      });
      return { user : loggedUser.data , token : response.data.token } ;
    } else {
      setErrors(response.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export { authenticate };
