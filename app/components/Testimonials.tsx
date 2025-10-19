import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';

const testimonials = [
  {
    quote: 'Ahora sé exactamente cuánto gasto por mes usando el auto.',
    author: 'Luis',
    location: 'San Bernardo',
  },
  {
    quote: 'Me fui a la playa con mis amigos y fue bacán poder dividir el viaje exacto.',
    author: 'Bastián',
    location: 'Huechuraba',
  },
  {
    quote: 'Me hizo consciente de mis peajes y bajé mis costos.',
    author: 'Nicole',
    location: 'Maipú',
  },
];

export function Testimonials() {
  return (
    <Section id="testimonios" className="bg-bg-card">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="space-y-8">
            {/* Primera fila: 2 testimonios */}
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <Card key={index} className="p-6 space-y-4">
                  <p className="text-lg text-text-strong italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <span className="font-medium text-text-strong">{testimonial.author}</span>
                    <span>•</span>
                    <span>{testimonial.location}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Segunda fila: 1 testimonio centrado */}
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                <Card className="p-6 space-y-4">
                  <p className="text-lg text-text-strong italic">
                    &ldquo;{testimonials[2].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <span className="font-medium text-text-strong">{testimonials[2].author}</span>
                    <span>•</span>
                    <span>{testimonials[2].location}</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
