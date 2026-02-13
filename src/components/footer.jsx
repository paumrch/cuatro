import Link from "next/link";

const currentYear = new Date().getFullYear();

const social = [
  {
    name: "Instagram",
    href: "https://instagram.com/4dejunio_",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/4dejunio/",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M20.447 20.452H16.84V14.742c0-1.363-.027-3.116-1.899-3.116-1.899 0-2.19 1.481-2.19 3.016v5.81H9.135V9h3.45v1.561h.05c.48-.905 1.651-1.858 3.4-1.858 3.635 0 4.306 2.392 4.306 5.502v6.247zM5.337 7.433a1.97 1.97 0 110-3.94 1.97 1.97 0 010 3.94zm-1.788 13.02h3.576V9H3.549v11.453zM22.225 0H1.771C.79 0 0 .771 0 1.729v20.542C0 23.228.79 24 1.771 24h20.451C23.21 24 24 23.228 24 22.271V1.729C24 .771 23.21 0 22.225 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto px-6 lg:px-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* CTA Section */}
      <div className="border-t border-stone-900/10 pt-16 sm:pt-20 pb-12">
        <div className="max-w-xl">
          <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Cuéntanos tu proyecto.
          </h3>
          <p className="text-stone-500 mt-3 text-lg">
            Sin compromiso. Reserva 30 minutos y hablamos.
          </p>
          <div className="mt-8">
            <Link
              href="https://www.cal.eu/paumarch/15min"
              target="_blank"
              className="inline-flex items-center rounded-md border border-stone-300 bg-transparent px-6 py-2.5 text-sm font-medium text-stone-900 hover:border-stone-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
            >
              <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
              Agendar reunión
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Internal Links */}
      <div className="border-t border-stone-900/10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-stone-900 font-medium mb-3">Servicios</h3>
          <ul className="space-y-2">
            <li><Link href="/servicios/branding" className="text-stone-400 hover:text-stone-600 transition-colors">Branding</Link></li>
            <li><Link href="/servicios/diseno-web" className="text-stone-400 hover:text-stone-600 transition-colors">Diseño Web</Link></li>
            <li><Link href="/servicios/implementacion-ia" className="text-stone-400 hover:text-stone-600 transition-colors">Implementación de IA</Link></li>
            <li><Link href="/servicios/automatizaciones" className="text-stone-400 hover:text-stone-600 transition-colors">Automatizaciones</Link></li>
            <li><Link href="/servicios/paid-media" className="text-stone-400 hover:text-stone-600 transition-colors">Paid Media</Link></li>
            <li><Link href="/servicios/posicionamiento-seo" className="text-stone-400 hover:text-stone-600 transition-colors">Posicionamiento SEO</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-stone-900 font-medium mb-3">Ciudades</h3>
          <ul className="space-y-2">
            <li><Link href="/servicios/diseno-web/madrid" className="text-stone-400 hover:text-stone-600 transition-colors">Madrid</Link></li>
            <li><Link href="/servicios/diseno-web/barcelona" className="text-stone-400 hover:text-stone-600 transition-colors">Barcelona</Link></li>
            <li><Link href="/servicios/diseno-web/valencia" className="text-stone-400 hover:text-stone-600 transition-colors">Valencia</Link></li>
            <li><Link href="/servicios/diseno-web/sevilla" className="text-stone-400 hover:text-stone-600 transition-colors">Sevilla</Link></li>
            <li><Link href="/servicios/diseno-web/malaga" className="text-stone-400 hover:text-stone-600 transition-colors">Málaga</Link></li>
            <li><Link href="/servicios/diseno-web/bilbao" className="text-stone-400 hover:text-stone-600 transition-colors">Bilbao</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-stone-900 font-medium mb-3">Contacto</h3>
          <ul className="space-y-2">
            <li><Link href="/servicios/diseno-web/ecommerce" className="text-stone-400 hover:text-stone-600 transition-colors">Ecommerce</Link></li>
            <li><Link href="/servicios/diseno-web/startups" className="text-stone-400 hover:text-stone-600 transition-colors">Startups y Tech</Link></li>
            <li><Link href="/servicios/diseno-web/restauracion" className="text-stone-400 hover:text-stone-600 transition-colors">Hostelería</Link></li>
          </ul>
          <div className="mt-6">
            <p className="text-stone-500">Pasaje Dr. Bartual Moret 8 - 6.</p>
            <p className="text-stone-500">46010, Valencia.</p>
            <p className="text-stone-500 mt-2">hola@4dejunio.com</p>
          </div>
        </div>
      </div>

      {/* Bottom bar: social + legal + copyright */}
      <div className="border-t border-stone-900/10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6">
          {social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-stone-400 hover:text-stone-600 transition-colors"
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/legal"
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
          >
            Aviso legal y privacidad
          </Link>
          <p className="text-xs text-stone-400">
            4 de Junio &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
