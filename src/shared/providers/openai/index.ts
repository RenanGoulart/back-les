import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.CHATGPT_KEY });

export async function generateCuriosity(album: string, artist: string, prompt: string) {
  const modelId = "gpt-3.5-turbo-0125";

  const {choices} = await openai.chat.completions.create({
    model: modelId,
    temperature: 0.7,
    max_tokens: 256,
    messages: [
      {
        role: 'system',
        content: 'Você é um assistente que fala sobre álbuns e artistas de música.'
      },
      {
        role: 'user',
        content: `Não responda perguntas que não estejam relacionadas com o album ${album} ou o artista/banda ${artist}. Eu quero que você responda em um único paragrafo a principal curiosidade sobre o album ${album} e o artista/banda ${artist}, não quero introdução, apenas a curiosidade. não mencione outros artistas ou álbuns.`
      },
      {
        role: 'user',
        content: `${prompt}. Mencione somente informações relacionadas ao ${album} de ${artist}.`
      },
    ]
  });

  return choices[0].message.content;
}
