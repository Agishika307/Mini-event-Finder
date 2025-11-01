import axios from "axios";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const listEvents = async (location) => {
  const res = await axios.get(`${API}/api/events`, { params: location ? { location } : {} });
  return res.data;
};
export const getEvent = async (id) => (await axios.get(`${API}/api/events/${id}`)).data;
export const createEvent = async (payload) => (await axios.post(`${API}/api/events`, payload)).data;
