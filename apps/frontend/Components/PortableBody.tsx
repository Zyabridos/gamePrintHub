import { PortableText } from "@portabletext/react";

type Props = {
  value: any;
};

export function PortableBody({ value }: Props) {
  if (!value) return null;

  return (
    <div className="prose max-w-none">
      <PortableText value={value} />
    </div>
  );
}
