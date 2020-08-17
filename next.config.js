const { projectId } = require("./firebase-config");

module.exports = {
  distDir: "nextjs",
  env: {
    FIREBASE_PROJECT_ID: projectId,
  },
  experimental: {
    sprFlushToDisk: false,
  },
};
