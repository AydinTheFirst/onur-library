const BACKEND = import.meta.env.PROD ? "" : "http://localhost:3000";

const config = {
  BACKEND,
};

export default config;
