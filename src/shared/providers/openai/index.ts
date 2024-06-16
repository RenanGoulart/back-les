import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.CHATGPT_KEY });

export async function generateCuriosity(album: string, artist: string) {
  const prompt = `Diga-me uma curiosidade interessante sobre o álbum ${album} de ${artist} ou sobre ${artist}.`;
  const modelId = "gpt-3.5-turbo-0125";

  const {choices} = await openai.chat.completions.create({
    model: modelId,
    temperature: 0.7,
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: 'Eu quero que você responda em um único paragrafo a principal curiosidade sobre o album que irei falar, não quero introdução, apenas a curiosidade.'
      },
      {
        role: 'user',
        content: `Diga-me curiosidades interessantes sobre o álbum "Thriller" de Michael Jackson ou sobre Michael Jackson.`
      },
      {
        role: 'assistant',
        content: 'O álbum "Thriller" de Michael Jackson, lançado em 30 de novembro de 1982, é o mais vendido de todos os tempos, com mais de 66 milhões de cópias. Produzido por Quincy Jones, inclui sete singles de sucesso como "Billie Jean", "Beat It" e "Thriller". O videoclipe de "Thriller", dirigido por John Landis, é revolucionário.'
      },
      {
        role: 'user',
        content: prompt
      },
    ]
  });

  return choices[0].message.content;
}
