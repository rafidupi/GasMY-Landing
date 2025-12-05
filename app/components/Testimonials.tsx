'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Nunca sabía con claridad en qué se me iba la plata… hasta que me instalé gasmy. Ahora sé realmente cuánto gasto y no me llevo sorpresas a fin de mes, manejo mucho más tranquilo ahora.',
    author: 'Luis',
    location: 'San Bernardo',
  },
  {
    quote:
      'Nos escapamos a la playa con mis amigos y gasmy. nos tiró el costo exacto del viaje. Entonces hubieron 0 momentos tensos, cero cálculos fomes, todo excelente. Porque cuentas claras conservan la amistad!',
    author: 'Bastián',
    location: 'Huechuraba',
  },
  {
    quote:
      'Pensaba que me estaban cobrando de más cuando me llegaba la cuenta del TAG, pero no. Sin embargo, gasmy. me hizo ver otras opciones de ruta que por el mismo tiempo gastaba mucho menos.',
    author: 'Nicole',
    location: 'Maipú',
  },
  {
    quote:
      'Antes no tenia idea de cuánto gastaba moviéndome. Ahora con gasmy cacho los costos por km y dejé de gastar de más en carretes innecesarios y bajé mis costos heavy. Literal, salvó mi sueldo.',
    author: 'Francisco',
    location: 'Melipilla',
  },
];

export function Testimonials() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <Section id="testimonios" className="bg-[#1b1b1b] text-white">
      <Container className="!px-0 !max-w-full">
        <div className="space-y-12">
          <div className="text-center space-y-4 px-4">
            <h2 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros usuarios</h2>
          </div>

          <div className="relative overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1b1b1b] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1b1b1b] to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <motion.div
              className="flex gap-6 px-4"
              animate={{
                x: [0, -1920], // Adjust based on card width * number of original testimonials
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[450px]"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  style={{ overflow: 'hidden', borderRadius: '24px' }}
                >
                  <Card className="p-6 space-y-4 h-full bg-[#141414] border-white/10">
                    <p className="text-lg text-white italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <span className="font-medium text-white">{testimonial.author}</span>
                      <span>•</span>
                      <span>{testimonial.location}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
