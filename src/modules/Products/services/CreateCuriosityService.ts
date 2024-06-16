import { injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { generateCuriosity } from "../../../shared/providers/openai";

@injectable()
class CreateCuriosityService {
  constructor() {}

  async execute(album: string, artist: string): Promise<string | null> {
    const curiosity = await generateCuriosity(album, artist);

    if (!curiosity) {
      throw new NotFoundError('Curiosidade não encontrada');
    }

    const formattedCuriosity = curiosity.replace(/(\\")/g, '');
    return formattedCuriosity;
  }
}

export { CreateCuriosityService };
