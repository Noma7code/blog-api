const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Blog Api",
    description: "API documentation for BLog API",
  },
  host: "localhost:8000",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
