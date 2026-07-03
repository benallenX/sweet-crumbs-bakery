export default function DemoBanner() {
  return (
    <div className="bg-amber-950 text-amber-100 text-center text-xs sm:text-sm px-4 py-2">
      Sweet Crumbs Bakery is a fictional business built as a demo project — it is not a real
      bakery. Forms on this site are functional and store real submissions;{" "}
      <a href="/privacy" className="underline hover:text-white">
        see how your data is handled
      </a>
      .
    </div>
  );
}
