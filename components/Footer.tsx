export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-200 text-center text-sm py-8 px-6 flex flex-col items-center gap-3">
      <p>© {new Date().getFullYear()} Sweet Crumbs Bakery. All rights reserved.</p>
      <nav aria-label="Legal" className="flex gap-4 text-amber-300">
        <a href="/privacy" className="underline hover:text-white">
          Privacy Policy
        </a>
        <a href="/terms" className="underline hover:text-white">
          Terms of Service
        </a>
      </nav>
      <p className="text-xs text-amber-400 max-w-xl">
        Sweet Crumbs Bakery is a fictional business created for demonstration purposes only.
      </p>
    </footer>
  );
}
