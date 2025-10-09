import { Container } from './Container';
import { Instagram, Music, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-text-strong text-white py-12">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">GasMy</h3>
            <p className="text-white/70 text-sm">Tu gasto en auto, ordenado y optimizado.</p>
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

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold">Comunidad</h4>
            <div className="space-y-3">
              <p className="text-white/70 text-sm">Síguenos en redes sociales</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/gasmy.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-ios flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="Instagram @gasmy.cl"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://tiktok.com/@gasmy.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-ios flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="TikTok @gasmy.cl"
                >
                  <Music className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@gasmy.org" className="hover:text-white transition-colors">
                  contact@gasmy.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@gasmy.org" className="hover:text-white transition-colors">
                  support@gasmy.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} GasMy — Hecho en Chile con cariño por gente bacán.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Legal Links */}
              <div className="flex gap-4 text-sm text-white/60">
                <a href="#" className="hover:text-white transition-colors">
                  Privacidad
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Términos
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/gasmy.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/70" />
                </a>
                <a
                  href="https://tiktok.com/@gasmy.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="TikTok"
                >
                  <Music className="w-4 h-4 text-white/70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
