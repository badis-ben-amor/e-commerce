import axios from "axios";

export const getUserProfile = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};
