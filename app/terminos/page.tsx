import GasMyNavbar from '../components/Navbar';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';

export default function TerminosPage() {
  return (
    <main className="bg-bg-main text-text-strong min-h-screen flex flex-col">
      <GasMyNavbar ctaText="Iniciar sesion" ctaHref="/login" />
      <div className="flex-1">
        <Section className="aurora-bg pt-32 pb-12 min-h-screen">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
                style={{
                  color: '#f3f4f6', // Tailwind gray-100
                  paddingBottom: '0.25rem',
                }}
              >
                Términos y Condiciones de Uso
              </h1>
              <div className="space-y-10 text-base md:text-lg text-gray-700">
                {/* ...existing content... */}
                <section className="space-y-4">
                  <p>
                    Bienvenido a <b>gasmy.</b> Al descargar, instalar o utilizar nuestra aplicación
                    móvil, aceptas estar legalmente vinculado por estos Términos y Condiciones. Si
                    no estás de acuerdo con alguno de estos términos, te rogamos que no utilices la
                    aplicación.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. Licencia de Uso</h2>
                  <p>
                    <b>gasmy.</b> te otorga una licencia limitada, no exclusiva, intransferible y
                    revocable para utilizar la aplicación estrictamente para fines personales y no
                    comerciales, de acuerdo con estos términos.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    2. Uso Aceptable y Seguridad Vial
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-900">
                    2.1. Responsabilidad del Conductor
                  </h3>
                  <p>
                    El uso de <b>gasmy.</b> es únicamente una ayuda para el cálculo de costos y
                    seguimiento de viajes.{' '}
                    <b>Tu responsabilidad principal es la conducción segura.</b>
                  </p>
                  <ul className="list-disc pl-6">
                    <li>No interactúes con la aplicación mientras conduces.</li>
                    <li>Configura tu ruta y preferencias antes de iniciar la marcha.</li>
                    <li>
                      Respeta siempre las leyes de tránsito y las señales viales de la República de
                      Chile.
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900">2.2. Prohibiciones</h3>
                  <ul className="list-disc pl-6">
                    <li>
                      Usar la aplicación de manera que distraiga o ponga en peligro la seguridad
                      vial.
                    </li>
                    <li>
                      Intentar descompilar, realizar ingeniería inversa o copiar el código fuente de
                      la app.
                    </li>
                    <li>Utilizar la aplicación para actividades ilegales o fraudulentas.</li>
                  </ul>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    3. Precisión de la Información
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-900">3.1. Estimaciones</h3>
                  <p>
                    <b>gasmy.</b> proporciona <b>estimaciones</b> de costos de combustible y peajes
                    basándose en la información disponible y en los datos proporcionados por el
                    usuario.
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      Los precios de los peajes pueden variar sin previo aviso por parte de las
                      concesionarias.
                    </li>
                    <li>
                      El consumo real de combustible depende de factores externos (tráfico, estilo
                      de conducción, estado del vehículo) que la app no puede predecir con
                      exactitud.
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900">3.2. Sin Garantía</h3>
                  <p>
                    No garantizamos que la información sobre rutas, ubicaciones de pórticos o
                    precios esté libre de errores. La aplicación se proporciona "tal cual" y "según
                    disponibilidad".
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    4. Cuentas de Usuario
                  </h2>
                  <p>
                    Eres responsable de mantener la confidencialidad de tu cuenta de Google/Firebase
                    utilizada para acceder a la app. <b>gasmy.</b> no se hace responsable por
                    cualquier pérdida derivada del uso no autorizado de tu cuenta.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    5. Propiedad Intelectual
                  </h2>
                  <p>
                    Todo el contenido, diseño, gráficos, código y software de <b>gasmy.</b> son
                    propiedad exclusiva de sus desarrolladores y están protegidos por las leyes de
                    propiedad intelectual de Chile y tratados internacionales.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    6. Limitación de Responsabilidad
                  </h2>
                  <ul className="list-disc pl-6">
                    <li>
                      Daños directos, indirectos, incidentales o consecuentes derivados del uso o
                      imposibilidad de uso de la aplicación.
                    </li>
                    <li>Multas de tránsito, accidentes o daños al vehículo.</li>
                    <li>Errores en el cálculo de costos que resulten en gastos imprevistos.</li>
                  </ul>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">7. Modificaciones</h2>
                  <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Las
                    modificaciones entrarán en vigencia inmediatamente después de su publicación en
                    la aplicación. El uso continuado de la app constituirá tu aceptación de dichos
                    cambios.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">8. Ley Aplicable</h2>
                  <p>
                    Estos términos se rigen por las leyes de la República de Chile. Cualquier
                    disputa relacionada con estos términos se someterá a la jurisdicción exclusiva
                    de los tribunales de Santiago de Chile.
                  </p>
                </section>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">9. Contacto</h2>
                  <p>Si tienes dudas sobre estos términos, contáctanos en:</p>
                  <ul className="list-disc pl-6">
                    <li>
                      Email:{' '}
                      <a href="mailto:contacto@gasmy.org" className="text-blue-600 underline">
                        contacto@gasmy.org
                      </a>
                    </li>
                    <li>
                      Web:{' '}
                      <a
                        href="https://gasmy.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        https://gasmy.org
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </Container>
        </Section>
      </div>
      <Footer />
    </main>
  );
}
