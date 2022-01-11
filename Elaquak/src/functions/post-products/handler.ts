import { createDuckQuery, createCountQuery } from "@functions/common/queries";
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

const getProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  e
) => {
  const id = randomUUID();

  const { title, description, price, image_src, count } = e.body;

  try {
    await pool.query(createDuckQuery(id, title, description, price, image_src));
    await pool.query(createCountQuery(id, count));

    const data = { id, title, description, price, image_src, count };

    return formatJSONResponse(200, {
      data,
      message: "success",
    });
  } catch (e) {
    return formatJSONResponse(500, { message: e.message });
  }
};

export const main = middyfy(getProducts);
