import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "../schema";

import { ducks } from "../../ducks";

const getProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const product = ducks.find((x) => x.id === event.pathParameters.productId);
  return formatJSONResponse({
    data: product,
    message: product ? "success" : "Not Found",
  });
};

export const main = middyfy(getProduct);
