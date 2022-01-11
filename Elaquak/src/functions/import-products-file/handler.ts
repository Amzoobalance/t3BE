import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { S3 } from "aws-sdk";
import { BUCKET_NAME, CSV_UPLOAD_FOLDER } from "@functions/common/constants";

const s3 = new S3();

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  e
) => {
  const { name } = e.queryStringParameters;
  const Bucket = BUCKET_NAME;
  const Key = `${CSV_UPLOAD_FOLDER}/${name}`;
  const Expires = 150;
  const ContentType = "text/csv";

  const url = await s3.getSignedUrlPromise("putObject", {
    Bucket,
    Key,
    Expires,
    ContentType,
  });

  return formatJSONResponse(200, url);
};

export const main = middyfy(importProductsFile);
