import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { getDuckQuery } from "@functions/common/queries";
import { Pool } from "pg";

const pool = new Pool();

const getProduct: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  const dbResponse = await pool.query(
    getDuckQuery(event.pathParameters.productId)
  );

  const data = dbResponse.rows[0];

  if (!data) {
    return formatJSONResponse(404, { message: "Not Found" });
  }

  return formatJSONResponse(200, { message: "success", data });
};

export const main = middyfy(getProduct);
