import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Pool } from "pg";

const pool = new Pool();

import schema from "../schema";

const getDuckQuery = (productId: string) =>
  `select public.ducks.id, title, description, price, image_src, count from public.ducks inner join public.stocks on public.ducks.id=public.stocks.id where public.ducks.id = '${productId}'`;

const getProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const dbResponse = await pool.query(
    getDuckQuery(event.pathParameters.productId)
  );

  return formatJSONResponse({
    data: dbResponse.rows[0],
    message: dbResponse.rows[0] ? "success" : "Not Found",
  });
};

export const main = middyfy(getProduct);
