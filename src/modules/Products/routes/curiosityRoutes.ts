import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios'

const curiosityRouter = Router();

curiosityRouter.get('/:album', async (req: Request, res: Response) => {
  const { album } = req.params;
  if (!album) {
    return res.status(400).json({ erro: 'Parâmetro "album" é necessário' });
  }
  const prompt = `Diga-me curiosidades interessantes sobre o álbum "${album}".`;
  const id_model = "babbage-002";
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        prompt: prompt,
        max_tokens: 150,
        model: id_model,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHATGPT_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const curiosity = response.data.choices[0].message.content;
    console.log(curiosity);
    res.json({ curiosity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao obter curiosidade' });
  }
});

export { curiosityRouter };
