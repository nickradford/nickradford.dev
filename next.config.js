module.exports = {
  images: {
    domains: ["images.ctfassets.net"],
  },

  async headers() {
    return [
      {
        source: "/api/generate-preview-image",
        headers: [
          {
            key: "Content-Type",
            value: "image/png",
          },
        ],
      },
    ];
  },
};
