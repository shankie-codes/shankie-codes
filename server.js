const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: config,
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log("File: " + request.originalUrl);
  return app.prepare().then(() => handle(request, response));
});

// const triggerRedeploy = functions
//   .region("europe-west1")
//   .firestore.document("pages/{documentId}")
//   .onWrite(async (change, context) => {
//     fetch(
//       "https://api.bitbucket.org/2.0/repositories/proper-design/poli-hosting/pipelines/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Basic " +
//             Buffer.from("shankie:mPCVhE2q6DytwSZxbGs3").toString("base64"),
//         },
//         body: JSON.stringify({
//           target: {
//             type: "pipeline_ref_target",
//             ref_type: "branch",
//             ref_name: "master",
//             selector: {
//               type: "custom",
//               pattern: "deploy-testing",
//             },
//           },
//         }),
//       }
//     )
//       .then(() => console.log("succes"))
//       .catch((err) => console.log(err));
//   });

exports.nextjs = { server };
