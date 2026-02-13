"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-4xl font-bold text-balance">Algo salió mal</h1>
      <p className="mt-4 text-lg text-stone-500">
        Ha ocurrido un error inesperado. Inténtalo de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-md bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
