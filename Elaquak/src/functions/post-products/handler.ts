import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { Pool } from "pg";

const pool = new Pool();

const schema = {
  type: "object",
  required: ["title", "description", "price", "image_src", "count"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    image_src: { type: "string" },
    count: { type: "integer" },
  },
} as const;

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

  const { title, description, price, image_src, count } = e.body;

  await pool.query(createDuckQuery(id, title, description, price, image_src));
  await pool.query(createCountQuery(id, count));

  return formatJSONResponse({
    data: {
      id,
      ...e.body,
    },
    message: "success",
  });
};

export const main = middyfy(getProducts);
