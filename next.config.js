/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",          // Redirect the root URL "/"
        destination: "/index.page", // To the renamed file's route "/index.page"
        permanent: true,      // Use a 301 redirect for permanent redirection
      },
    ];
  },
};