import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, nombre } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Personalizar el saludo
    const greeting = nombre ? `¡Hola ${nombre}!` : '¡Hola!';

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'GasMy <onboarding@resend.dev>', // Dominio temporal mientras se verifica gasmy.org
      to: [email],
      subject: '¡Bienvenido a la beta de GasMy! 🎉',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #007AFF;">${greeting}</h2>
          <h1 style="font-size: 24px; color: #2C2E30;">¡Bacán! 🎉</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #6E757C;">
            Te inscribiste oficialmente para probar la <strong>versión beta</strong> 🚀
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #6E757C;">
            En los próximos días te vamos a contactar para que puedas descargarla y darnos tu feedback.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #6E757C;">
            Estamos súper motivados con esta etapa, así que <strong>gracias por sumarte</strong> y ayudarnos a mejorar.
          </p>
          <div style="background: linear-gradient(135deg, #4F8EF7 0%, #64C6FF 100%); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
            <p style="font-size: 18px; color: white; margin: 0; font-weight: bold;">
              ¡Nos vemos pronto y prepárate para ser parte de los primeros en probarla! 👀🔥
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #E0E6ED; margin: 30px 0;">
          <p style="font-size: 14px; color: #9DA3AA;">
            El equipo de GasMy<br>
            <a href="mailto:contact@gasmy.org" style="color: #007AFF; text-decoration: none;">contact@gasmy.org</a><br>
            <a href="https://gasmy.org" style="color: #007AFF; text-decoration: none;">gasmy.org</a>
          </p>
        </div>
      `,
      text: `${greeting}\n\n¡Bacán! 🎉\n\nTe inscribiste oficialmente para probar la versión beta 🚀\n\nEn los próximos días te vamos a contactar para que puedas descargarla y darnos tu feedback.\n\nEstamos súper motivados con esta etapa, así que gracias por sumarte y ayudarnos a mejorar.\n\n¡Nos vemos pronto y prepárate para ser parte de los primeros en probarla! 👀🔥\n\n---\nEl equipo de GasMy\ncontact@gasmy.org\ngasmy.org`,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error in send-email route:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
