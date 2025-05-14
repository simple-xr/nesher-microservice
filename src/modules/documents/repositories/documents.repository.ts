import { DocumentsParamsDto } from '../dto/documents-param.dto';
import { Document } from '../entities/document.entity';

export abstract class DocumentsRepository {
  abstract create(url: string, collectionId: string): Promise<Document>;
  abstract findOne(id:string);
  abstract findAll(documentsParam: DocumentsParamsDto);
 
  abstract delete(id:string);
}
