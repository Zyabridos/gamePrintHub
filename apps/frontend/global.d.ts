// global.d.ts (или любой .d.ts внутри frontend)
declare module "@sanity/image-url" {
  import type { SanityClient } from "@sanity/client";

  interface ImageUrlBuilder {
    image(source: any): ImageUrlBuilder;
    width(width: number): ImageUrlBuilder;
    height(height: number): ImageUrlBuilder;
    url(): string;
  }

  export default function imageUrlBuilder(
    client: SanityClient,
  ): ImageUrlBuilder;
}
