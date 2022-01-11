import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { getDucksListQuery } from "@functions/common/queries";
import { Pool } from "pg";

const pool = new Pool();

const getProducts: ValidatedEventAPIGatewayProxyEvent<{}> = async () => {
  const dbResponse = await pool.query(getDucksListQuery());

  const data = dbResponse.rows;

  return formatJSONResponse(200, { data, message: "success" });
};

export const main = middyfy(getProducts);
