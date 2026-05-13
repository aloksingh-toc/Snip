// Base URL of the server — used to construct short links
export const SERVER_URL = import.meta.env.VITE_SERVER_URL ||
  window.location.origin.replace('5173', '5000');
