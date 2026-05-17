import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://emre:yildirim123@localhost:5432/avize_db?schema=public",
  },
});