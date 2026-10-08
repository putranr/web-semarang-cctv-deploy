import "dotenv/config";
import { definePrismaConfig } from "prisma/config";
import { defineConfig as definePostgresConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  // Konfigurasi Prisma untuk PostgreSQL
  orm: definePostgresConfig({
    // Lokasi contract Prisma kita
    contract: "./src/prisma/contract.prisma",

    // URL koneksi PostgreSQL
    db: {
      connection: process.env.DATABASE_URL!,
    },
  }),
});