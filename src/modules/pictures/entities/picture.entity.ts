import { Collection } from '@prisma/client';

export class Picture {
  id: string;
  url: string;
  collection_id: string;
  collection?: Collection;
}
