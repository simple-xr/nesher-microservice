import { Collection } from "src/modules/collections/entities/collection.entity"

export class Document {
    id:string
    url:string
    collection_id: string
    collection?:Collection
}
