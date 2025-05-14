export abstract class PicturesRepository {
  abstract create(url: string, collectionId: string);
  abstract findOne(id: string);
  abstract findAll(picturesParams);

  abstract delete(id: string);
}
