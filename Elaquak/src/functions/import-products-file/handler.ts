import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { S3 } from "aws-sdk";

const s3 = new S3();

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  e
) => {
  const { name } = e.queryStringParameters;
  const Key = `uploaded/${name}`;
  const Body = String(e.body);

  await s3
    .putObject({
      Bucket: "import-products-file-for-elaquak",
      Key,
      Body,
    })
    .promise();

  return formatJSONResponse(
    `http://import-products-file-for-elaquak.s3-website-us-east-1.amazonaws.com/${Key}` as any
  );
};

export const main = middyfy(importProductsFile);
