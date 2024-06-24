import Meeting from "@/components/meeting";
import Copyright from "@/components/copyright";

export default function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <div className="mx-auto px-6 lg:px-8">
        <div className="relative isolate border-t border-stone-900/10">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          ></div>
          <div className="pt-8 sm:pt-12">
            <div className="mx-auto">
              <div className="flex flex-col md:flex-row mt-8 gap-6 md:justify-between">
                <div className="text-left w-full sm:w-1/2">
                  <h2 className="text-3xl">Cuéntanos más sobre tu proyecto.</h2>
                  <Meeting />
                </div>
                <div id="Office" className="flex flex-col gap-0">
                  <h2 className="text-base mt-4">¿Dónde estamos?</h2>
                  <p className="text-stone-500">
                    Pasaje Dr. Bartual Moret 8 - 6
                  </p>
                  <p className="text-stone-500">46010, Valencia</p>
                  <h2 className="text-base mt-4">Email</h2>
                  <p className="text-stone-500">hola@4dejunio.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Copyright />
      </div>
    </footer>
  );
}
