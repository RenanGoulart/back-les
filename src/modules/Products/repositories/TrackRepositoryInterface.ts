interface ITrackRepository {
  deleteAll(productId: string): Promise<void>;
}

export { ITrackRepository };
