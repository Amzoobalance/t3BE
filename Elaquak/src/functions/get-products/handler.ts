import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Pool } from "pg";

const pool = new Pool();

import schema from "../schema";

const selectDucksQuery = () =>
  "select public.ducks.id, title, description, price, image_src, count from public.ducks inner join public.stocks on public.ducks.id=public.stocks.id";

const getProducts: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const dbResponse = await pool.query(selectDucksQuery());

  return formatJSONResponse({
    data: dbResponse.rows,
    message: "success",
  });
};

export const main = middyfy(getProducts);
