import { GeneratePayload } from "./types";

export async function mockGenerate(payload: GeneratePayload): Promise<string> {
    // Agora chama a API real (mantivemos o nome da função para não quebrar imports)
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao comunicar com o servidor');
    }

    const data = await response.json();
    return data.result;
}
