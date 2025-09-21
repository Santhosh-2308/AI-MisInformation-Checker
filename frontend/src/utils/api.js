import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetchPrediction = async ({ text, url }) => {
  const response = await axios.post(`${API_BASE_URL}/predict`, { text, url });
  return response.data;
};
