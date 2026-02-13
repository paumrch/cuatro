export default function Subscribe() {

  return (
        <div className="mt-16 border-t border-stone-900/10 pt-8 sm:mt-10 lg:mt-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-medium leading-6 text-stone-900">
              Suscríbete, tenemos algo que contarte.
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Contenido que realmente merece la pena.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stone-600 sm:w-56 text-xs sm:text-sm sm:leading-6"
              placeholder="tucorreo@ejemplo.com"
              spellCheck={false}
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full rounded-md bg-stone-100 px-6 py-2.5 text-sm justify-center text-stone-900 shadow-sm hover:bg-stone-300 hover:text-stone-900 items-center transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
              >
                ¡Me apunto!
              </button>
            </div>
          </form>
        </div>
  );
}
