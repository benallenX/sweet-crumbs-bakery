import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="#top"
      className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800 text-lg"
      >
        🥐
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-bold text-amber-900 text-base">Sweet Crumbs</span>
        <span className="text-[11px] uppercase tracking-widest text-amber-600">Bakery</span>
      </span>
    </Link>
  );
}
