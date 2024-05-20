import { prisma } from "../../../shared/database";
import { ITrackRepository } from "./TrackRepositoryInterface";

class TrackRepository implements ITrackRepository {
  async deleteAll(productId: string): Promise<void> {
    await prisma.track.deleteMany({
      where: {
        productId,
      },
    });
  }
}

export { TrackRepository };
