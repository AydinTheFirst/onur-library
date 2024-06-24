const BACKEND = import.meta.env.PROD
  ? import.meta.env.VITE_BACKEND
  : "http://localhost:3000";

const config = {
  BACKEND,
};

export default config;
