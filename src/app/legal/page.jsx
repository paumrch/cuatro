import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Aviso Legal y Política de Privacidad",
  description:
    "Aviso legal, política de privacidad y política de cookies de 4 de Junio, agencia creativa en Valencia.",
  alternates: {
    canonical: "https://4dejunio.com/legal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Legal() {
  return (
    <>
      <Navbar />
      <div className="mx-auto px-6 pb-8 lg:px-8 max-w-3xl">
        <div className="py-8 sm:py-12 lg:pb-12">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">Aviso Legal</h1>

          <section className="mt-12 space-y-4 text-stone-600 leading-7">
            <h2 className="text-2xl font-medium text-stone-900">
              Datos identificativos
            </h2>
            <p>
              En cumplimiento del deber de información recogido en el artículo 10
              de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de
              la Información y del Comercio Electrónico, le informamos que el
              titular de este sitio web es:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Denominación:</strong> 4 de Junio
              </li>
              <li>
                <strong>Domicilio:</strong> Pasaje Dr. Bartual Moret 8 - 6,
                46010 Valencia, España
              </li>
              <li>
                <strong>Email:</strong> hola@4dejunio.com
              </li>
              <li>
                <strong>Sitio web:</strong> https://4dejunio.com
              </li>
            </ul>
          </section>

          <section className="mt-12 space-y-4 text-stone-600 leading-7">
            <h2 className="text-2xl font-medium text-stone-900">
              Propiedad intelectual
            </h2>
            <p>
              Todos los contenidos de este sitio web, incluyendo textos,
              imágenes, diseños, logotipos, iconos, y código fuente, están
              protegidos por derechos de propiedad intelectual e industrial y son
              propiedad de 4 de Junio o de terceros que han autorizado su uso.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación
              pública o transformación de los contenidos de esta web sin la
              autorización expresa del titular.
            </p>
          </section>

          <section className="mt-12 space-y-4 text-stone-600 leading-7">
            <h2 className="text-2xl font-medium text-stone-900">
              Política de Privacidad
            </h2>
            <p>
              De conformidad con el Reglamento General de Protección de Datos
              (RGPD) UE 2016/679, le informamos que los datos personales que nos
              facilite a través de este sitio web serán tratados con la finalidad
              de atender sus consultas y gestionar la relación comercial.
            </p>

            <h3 className="text-xl font-medium text-stone-900 mt-6">
              Responsable del tratamiento
            </h3>
            <p>
              4 de Junio — Pasaje Dr. Bartual Moret 8 - 6, 46010 Valencia.
              Contacto: hola@4dejunio.com
            </p>

            <h3 className="text-xl font-medium text-stone-900 mt-6">
              Finalidad del tratamiento
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Responder a sus consultas o solicitudes de información.</li>
              <li>
                Gestionar la relación comercial y la prestación de servicios
                contratados.
              </li>
              <li>
                Enviar comunicaciones comerciales si ha dado su consentimiento
                explícito.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-stone-900 mt-6">
              Base legal
            </h3>
            <p>
              El tratamiento de sus datos se realiza en base al consentimiento
              del interesado y/o la ejecución de un contrato o precontrato.
            </p>

            <h3 className="text-xl font-medium text-stone-900 mt-6">
              Derechos del usuario
            </h3>
            <p>
              Puede ejercer sus derechos de acceso, rectificación, supresión,
              oposición, limitación del tratamiento y portabilidad de los datos
              enviando un email a hola@4dejunio.com.
            </p>
          </section>

          <section className="mt-12 space-y-4 text-stone-600 leading-7">
            <h2 className="text-2xl font-medium text-stone-900">
              Política de Cookies
            </h2>
            <p>
              Este sitio web utiliza cookies técnicas necesarias para el correcto
              funcionamiento del sitio y cookies analíticas de Vercel Analytics
              para recopilar información estadística anónima sobre el uso de la
              web.
            </p>
            <p>
              Puede configurar su navegador para rechazar la instalación de
              cookies, aunque esto podría afectar al correcto funcionamiento de
              algunas funcionalidades del sitio.
            </p>
          </section>

          <section className="mt-12 space-y-4 text-stone-600 leading-7">
            <h2 className="text-2xl font-medium text-stone-900">
              Limitación de responsabilidad
            </h2>
            <p>
              4 de Junio no se hace responsable de los daños o perjuicios que
              puedan derivarse del acceso o uso de este sitio web. Tampoco se
              responsabiliza del contenido de los enlaces externos que puedan
              aparecer en esta web.
            </p>
          </section>

          <p className="mt-16 text-sm text-stone-400">
            Última actualización: febrero de 2026
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
