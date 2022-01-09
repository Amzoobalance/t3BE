import { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { S3 } from "aws-sdk";

const csv = require("csv-parser");
const s3 = new S3();

const importFileParser: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  e: any,
  _,
  callback
) => {
  const Bucket = e.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(
    e.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  return s3
    .getObject({
      Bucket,
      Key,
    })
    .createReadStream()
    .pipe(csv({ separator: ";" }))
    .on("data", console.info)
    .on("end", callback(null, { message: "success" } as any));
};

export const main = middyfy(importFileParser);
