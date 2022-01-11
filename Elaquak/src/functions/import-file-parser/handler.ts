import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { S3 } from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";

const csv = require("csv-parser");
const s3 = new S3();

const importFileParser: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  e: any
): Promise<APIGatewayProxyResult> =>
  new Promise((resolve) => {
    const Bucket = e.Records[0].s3.bucket.name;
    const Key = decodeURIComponent(
      e.Records[0].s3.object.key.replace(/\+/g, " ")
    );

    s3.getObject({
      Bucket,
      Key,
    })
      .createReadStream()
      .pipe(csv({ separator: ";" }))
      .on("data", (chunk) => console.info(chunk))
      .on("end", () =>
        resolve(formatJSONResponse(200, { message: "success" }))
      );
  });

export const main = middyfy(importFileParser);
