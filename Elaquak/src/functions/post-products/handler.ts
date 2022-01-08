import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { Pool } from "pg";

const pool = new Pool();

import schema from "../schema";

const createDuckQuery = (
  id: string,
  title: string,
  description: string,
  price: number,
  image_src: string
) =>
  `INSERT INTO 
  public.ducks (id, title, description, price, image_src)
VALUES
  ('${id}', '${title}', '${description}', ${price}, '${image_src}')`;

const createCountQuery = (id: string, count: number) => `INSERT INTO
  public.stocks (id, count)
VALUES
  ('${id}', ${count})`;

const getProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  e
) => {
  const id = randomUUID();

  const { title, description, price, image_src, count } = e.body as any;

  await pool.query(createDuckQuery(id, title, description, price, image_src));
  await pool.query(createCountQuery(id, count));

  return formatJSONResponse({
    data: {
      id,
      ...e.body as any,
    },
    message: "success",
  });
};

export const main = middyfy(getProducts);
