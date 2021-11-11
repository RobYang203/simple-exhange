import axios from 'axios';

const server = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  'Content-Type': 'application/json',
});

export const getServer = () => server;
export default server;
