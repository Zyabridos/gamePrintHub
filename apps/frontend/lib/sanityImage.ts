import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient as any);

export function urlForImage(source: any) {
  return builder.image(source);
}
