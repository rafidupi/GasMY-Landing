import { Container } from './components/Container';

export default function PrivacidadPage() {
  return (
    <Container>
      <div className="prose prose-blue max-w-none">
        <h1>Política de Privacidad</h1>
        <p>
          En <b>gasmy.</b>, valoramos tu privacidad y nos comprometemos a proteger tus datos
          personales. Esta Política de Privacidad explica cómo recopilamos, usamos y compartimos tu
          información cuando utilizas nuestra aplicación móvil.
        </p>
        <h2>1. Información que Recopilamos</h2>
        <h3>1.1. Información Personal</h3>
        <p>
          Cuando te registras o inicias sesión, recopilamos la siguiente información a través de{' '}
          <b>Google Sign-In</b> y <b>Firebase Authentication</b>:
        </p>
        <ul>
          <li>Nombre completo.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Foto de perfil (URL).</li>
          <li>Identificador único de usuario (UID).</li>
        </ul>
        <h3>1.2. Datos del Vehículo</h3>
        <p>Para proporcionar cálculos precisos de combustible y peajes, almacenamos:</p>
        <ul>
          <li>Tipo de vehículo (Auto, Moto, Camión, etc.).</li>
          <li>Eficiencia de combustible (km/l).</li>
          <li>Costo del combustible (CLP/litro).</li>
          <li>Alias o nombre del dispositivo Bluetooth de tu auto.</li>
        </ul>
        <h3>1.3. Datos de Ubicación (GPS)</h3>
        <p>
          <b>gasmy.</b> recopila datos de ubicación precisa para permitir el funcionamiento
          principal de la aplicación:
        </p>
        <ul>
          <li>
            <b>Detección de Peajes (Tags):</b> Necesitamos tu ubicación para identificar cuándo
            pasas por un pórtico de cobro (Tag/Televía) en autopistas concesionadas.
          </li>
          <li>
            <b>Cálculo de Rutas:</b> Para estimar costos de viaje.
          </li>
          <li>
            <b>Ubicación en Segundo Plano:</b> Si activas el "Auto-Tracking" o el seguimiento de
            viaje, la aplicación recopilará datos de ubicación incluso cuando la app esté cerrada o
            no esté en uso, para garantizar que no pierdas el registro de tus peajes y costos
            durante el trayecto.
          </li>
        </ul>
        <h3>1.4. Información del Dispositivo y Bluetooth</h3>
        <ul>
          <li>
            <b>Bluetooth:</b> Accedemos a la lista de dispositivos emparejados y al estado del
            Bluetooth para detectar cuándo te conectas al sistema de audio de tu vehículo. Esto
            permite iniciar el seguimiento del viaje automáticamente ("Auto Inicio").
          </li>
          <li>
            <b>Identificadores del Dispositivo:</b> Para análisis de errores y métricas de
            rendimiento.
          </li>
        </ul>
        <h2>2. Cómo Usamos tu Información</h2>
        <p>Utilizamos la información recopilada para:</p>
        <ol>
          <li>
            <b>Calcular Costos:</b> Determinar el gasto en combustible y peajes en tiempo real.
          </li>
          <li>
            <b>Historial de Viajes:</b> Guardar y mostrar tus rutas y gastos pasados.
          </li>
          <li>
            <b>Automatización:</b> Iniciar y detener el rastreo basado en la conexión Bluetooth de
            tu auto.
          </li>
          <li>
            <b>Mejora del Servicio:</b> Analizar tendencias de uso y errores mediante{' '}
            <b>Firebase Analytics</b> para mejorar la estabilidad de la app.
          </li>
          <li>
            <b>Sincronización:</b> Mantener tus preferencias y datos de vehículo sincronizados en la
            nube mediante <b>Cloud Firestore</b>.
          </li>
        </ol>
        <h2>3. Servicios de Terceros</h2>
        <p>
          <b>gasmy.</b> NO vende, alquila ni comercializa tus datos personales con terceros.
          Compartimos datos únicamente con los siguientes proveedores de servicios esenciales para
          el funcionamiento de la app, bajo estrictas condiciones de confidencialidad y para los
          propósitos aquí descritos:
        </p>
        <ul>
          <li>
            <b>Google Firebase:</b> Para autenticación, base de datos (Firestore) y análisis de uso
            (Analytics).
          </li>
          <li>
            <b>Mapbox:</b> Utilizamos sus servicios de mapas para la visualización de rutas y
            navegación.
          </li>
          <li>
            <b>Google Maps Platform:</b> (Si aplica) Para servicios de geolocalización
            complementarios.
          </li>
        </ul>
        <h2>4. Tus Derechos y Control de Datos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>
            <b>Acceder:</b> Ver la información personal y de vehículos que tenemos guardada.
          </li>
          <li>
            <b>Editar:</b> Modificar tu eficiencia, precio de combustible y tipo de vehículo en la
            configuración.
          </li>
          <li>
            <b>Eliminar:</b> Puedes solicitar la eliminación de tu cuenta y todos los datos
            asociados. Al hacerlo, borraremos tu historial de viajes y preferencias de nuestros
            servidores.
          </li>
        </ul>
        <h2>5. Seguridad de los Datos</h2>
        <p>
          Implementamos medidas de seguridad estándar de la industria (incluyendo encriptación en
          tránsito y en reposo proporcionada por Google Cloud Platform) para proteger tu información
          contra acceso no autorizado, alteración o destrucción.
        </p>
        <h2>6. Permisos del Sistema</h2>
        <p>
          Para funcionar correctamente, <b>gasmy.</b> solicitará los siguientes permisos:
        </p>
        <ul>
          <li>
            <b>Ubicación (Precisa y Siempre):</b> Para el rastreo de peajes en segundo plano.
          </li>
          <li>
            <b>Bluetooth (Nearby Devices):</b> Para la detección de auto-inicio.
          </li>
          <li>
            <b>Notificaciones:</b> Para informarte sobre el estado del viaje o alertas de peajes.
          </li>
          <li>
            <b>Actividad Física:</b> (En algunos dispositivos) Para optimizar el uso de batería
            detectando movimiento.
          </li>
        </ul>
        <h2>7. Cambios en esta Política</h2>
        <p>
          Puedes actualizar nuestra Política de Privacidad ocasionalmente. Te notificaremos sobre
          cualquier cambio publicando la nueva política en esta página o a través de la aplicación.
        </p>
        <h2>8. Contacto</h2>
        <p>Si tienes preguntas sobre esta política, puedes contactarnos en:</p>
        <ul>
          <li>
            Email: <a href="mailto:contacto@gasmy.org">contacto@gasmy.org</a>
          </li>
          <li>
            Web:{' '}
            <a href="https://gasmy.org" target="_blank" rel="noopener noreferrer">
              https://gasmy.org
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
}
