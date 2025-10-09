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
    quote: 'Me hizo consciente de mis peajes y bajé mis costos.',
    author: 'Nicole',
    location: 'Maipú',
  },
  {
    quote: 'Me fui a la playa con mis amigos y fue bacán poder dividir el viaje exacto.',
    author: 'Bastián',
    location: 'Huechuraba',
  },
];

export function Testimonials() {
  return (
    <Section className="bg-bg-card">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4">
                <p className="text-lg text-text-strong italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-2 text-sm text-text-mid">
                  <span className="font-medium text-text-strong">{testimonial.author}</span>
                  <span>•</span>
                  <span>{testimonial.location}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
