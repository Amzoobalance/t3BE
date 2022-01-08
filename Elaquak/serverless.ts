import type { AWS } from "@serverless/typescript";

import getProduct from "./src/functions/get-product";
import getProducts from "./src/functions/get-products";
import postProducts from "./src/functions/post-products";
import importProductsFile from "./src/functions/import-products-file";


const serverlessConfiguration: AWS = {
  service: "elaquak-shop",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject",
        ],
        Resource: "arn:aws:s3:::import-products-file-for-elaquak/*"
      }
    ],
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { getProduct, getProducts, postProducts, importProductsFile },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk", "pg-native"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
