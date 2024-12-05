/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",          
        destination: "/index.page", 
        permanent: true,      
      },
    ];
  },
};