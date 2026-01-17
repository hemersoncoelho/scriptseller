import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Webhook URL de TESTE fornecida pelo usuário
  const N8N_WEBHOOK_URL = "https://webhook.solucoesai.tech/webhook/4214a88e-7dc4-451d-86c5-273804d34fe0";

  try {
    const body = await request.json();

    console.log("[API Route] Enviando POST para (TESTE):", N8N_WEBHOOK_URL);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log(`[API Route] Status N8N: ${response.status} ${response.statusText}`);
    console.log(`[API Route] Body N8N: ${responseText}`);

    if (!response.ok) {
      let errorMessage = `N8N retornou erro ${response.status}`;
      try {
        const jsonErr = JSON.parse(responseText);
        if (jsonErr.message) errorMessage += `: ${jsonErr.message}`;
      } catch {
        errorMessage += `: ${responseText.substring(0, 100)}`;
      }
      throw new Error(errorMessage);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { result: responseText };
    }

    const finalResult = data.output || data.result || data.text || (typeof data === 'string' ? data : JSON.stringify(data));

    return NextResponse.json({ result: finalResult });

  } catch (error: any) {
    console.error('[API Route] Erro:', error.message);
    return NextResponse.json(
      { error: error.message || 'Falha na comunicação com N8N' },
      { status: 500 }
    );
  }
}
