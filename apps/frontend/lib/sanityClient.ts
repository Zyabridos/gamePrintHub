import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // lets set it this way to always get the freshest data
});

console.log("Sanity config (backend):", {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  hasToken: Boolean(process.env.SANITY_READ_TOKEN),
});
