import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log to console (in development)
    console.log('📨 New lead received:', {
      type: body.type,
      timestamp: new Date().toISOString(),
      data: body,
    });

    // Google Sheets webhook - Always send data here
    const googleSheetsWebhook =
      'https://script.google.com/macros/s/AKfycbzTxhcvTOc1A45y8GkqNefhhCUgrBZbB6BIuuRqgJsvSxJfwzusTZZ8bifMQb6r2WZNxQ/exec';

    try {
      const response = await fetch(googleSheetsWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error('Failed to save to Google Sheets:', response.statusText);
      } else {
        console.log('✅ Lead saved to Google Sheets successfully');
      }
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
    }

    // Optional: If NEXT_PUBLIC_FORM_ENDPOINT is configured, forward there too
    const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error('Failed to forward to external endpoint:', response.statusText);
        } else {
          console.log('✅ Lead forwarded to external endpoint successfully');
        }
      } catch (error) {
        console.error('Error forwarding to external endpoint:', error);
      }
    }

    // Send confirmation email for beta registrations
    if (body.type === 'beta' && (body.email || body.correo)) {
      try {
        const emailResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: body.email || body.correo,
              nombre: body.nombre,
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error('Failed to send confirmation email:', emailResponse.statusText);
        } else {
          console.log('✅ Confirmation email sent successfully');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Lead received successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing lead',
      },
      { status: 500 }
    );
  }
}
