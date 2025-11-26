declare module "knexfile.cjs" {
  import type { Knex } from "knex";

  const config: Record<string, Knex.Config>;
  export default config;
}
