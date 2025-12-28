'use client';

import { Container } from './Container';
import { Section } from './Section';
import { motion } from 'framer-motion';
import {
  RoadmapIconCircle,
  SparkIcon,
  ShieldIcon,
  LightningIcon,
  StorefrontIcon,
} from './RoadmapIcons';

const roadmapItems = [
  {
    id: 1,
    icon: SparkIcon,
    title: 'Implementaremos IA para ser más precisos con tus gastos por km',
    description: 'Inteligencia artificial que aprenda de tus patrones de conducción',
  },
  {
    id: 2,
    icon: ShieldIcon,
    title: 'Desarrollaremos alertas de mantención para que evites gastos inesperados',
    description: 'Notificaciones inteligentes basadas en el uso real de tu vehículo',
  },
  {
    id: 3,
    icon: LightningIcon,
    title: 'Integraremos también autos híbridos y eléctricos',
    description: 'Tracking especializado para los vehículos del futuro',
  },
  {
    id: 4,
    icon: StorefrontIcon,
    title: 'Marketplace gasmy: Queremos ofrecerte los mejores servicios para tu vehículo',
    description: 'Conecta con los mejores proveedores de servicios automotrices',
  },
];

export function Roadmap() {
  return (
    <Section className="bg-bg-main">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-text-strong"
              initial={{ backgroundPosition: '0% 50%' }}
              whileInView={{ backgroundPosition: '100% 50%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #0066ff, #0052cc, #0066ff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.25rem',
              }}
            >
              Roadmap gasmy.
            </motion.h2>
            <p className="text-lg text-text-mid">
              Estamos construyendo alertas de costo por pórtico y precios de bencina automáticos.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - centered behind icons */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent"
              style={{ left: '27px' }}
            />

            {/* Timeline items */}
            <div className="space-y-12">
              {roadmapItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="relative flex items-center gap-8"
                  >
                    {/* Timeline dot with custom icon */}
                    <div className="relative flex-shrink-0">
                      <RoadmapIconCircle>
                        <Icon />
                      </RoadmapIconCircle>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(79,142,247,0.15)] transition-shadow duration-300 overflow-hidden">
                      <h3 className="text-lg font-bold text-text-strong mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-mid leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
