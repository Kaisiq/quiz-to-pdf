import Link from "next/link";

export const LinkButton = (props: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={props.href}
      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {props.children}
    </Link>
  );
};
