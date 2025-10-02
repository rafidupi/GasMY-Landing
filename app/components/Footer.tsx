import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-text-strong text-white py-12">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">GasMy</h3>
            <p className="text-white/70 text-sm">
              Tu gasto en auto, ordenado y optimizado.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Producto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Calculadora
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:hola@gasmy.org" className="hover:text-white transition-colors">
                  hola@gasmy.org
                </a>
              </li>
              <li>
                <a href="https://gasmy.org" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  gasmy.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} GasMy — Hecho en Chile con cariño por gente bacán.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
