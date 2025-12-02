import config from "../../knexfile.cjs";

import knex, { Knex } from "knex";

const env = process.env.NODE_ENV || "development";
const knexConfig = (config as Record<string, Knex.Config>)[env];

export const db = knex(knexConfig);
