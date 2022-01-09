import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: "import-products-file-for-elaquak",
        event: "s3:ObjectCreated:*",
        existing: true
      },
    },
  ],
} as any;
