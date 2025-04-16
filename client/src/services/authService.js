import axios from "axios";

export const registerUser = async ({ name, email, password }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/auth/register`,
    {
      name,
      email,
      password,
    }
    // ,{ withCredentials: true }
  );
  return res;
};

export const loginUser = async ({ email, password }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const refresh = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/auth/refresh`,
    {}
    // ,{ withCredentials: true }
  );
  return res;
};

export const logout = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}auth/logout`,
    {}
    // ,{ withCredentials: true }
  );
  return res;
};
