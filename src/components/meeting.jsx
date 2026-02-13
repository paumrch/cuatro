import Link from "next/link";

export default function Meeting() {
  return (
    <div id="Meet" className="my-8 mx-auto">
      <Link
        href="https://calendar.app.google/12L5HW9PUfJbCfrL8"
        target="_blank"
      >
        <div
          className="flex w-48 rounded-md bg-stone-100 px-6 py-2.5 text-sm justify-center text-stone-900 shadow-sm hover:bg-stone-300 hover:text-stone-900 items-center transition-colors duration-300 ease-in-out"
        >
          <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
          <span className="mx-2">Agendar reunión</span>
        </div>
      </Link>
    </div>
  );
}
