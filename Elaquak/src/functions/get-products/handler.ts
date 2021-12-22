import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "../schema";
import { ducks } from "../../ducks";

const getProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    return formatJSONResponse({
      data: ducks,
      message: "success",
    });
  };

export const main = middyfy(getProducts);
