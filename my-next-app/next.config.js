module.exports = {
  reactStrictMode: true,
  env: {
    FRONTEND_API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://lucetre.vercel.app/api",
    BACKEND_API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api"
        : "https://lucetre.herokuapp.com/api",
    BACKEND_SOCKET:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://lucetre.herokuapp.com",
  },
};
