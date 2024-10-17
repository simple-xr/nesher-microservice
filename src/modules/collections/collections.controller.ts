import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionsParamsDto } from './dto/collections-params.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollectionExistPipePipe } from './pipes/collection-exist-pipe/collection-exist-pipe.pipe';
import { Collection } from './entities/collection.entity';

@Controller('collections')
@ApiTags('Coleções')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiResponse({ status: 201, description: 'coleção criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'dados inválidos.' })
  @ApiOperation({
    summary: 'cria uma coleção a partir dos dados informados.',
  })
  @HttpCode(201)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @ApiResponse({
    status: 200,
    description: 'coleções paginadas resgatadas com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'parametros inválidos.' })
  @ApiOperation({
    summary:
      'retorna todas as coleções de forma paginada e filtrada por parâmetros de url.',
  })
  @Get()
  findAll(@Query() params: CollectionsParamsDto) {
    return this.collectionsService.findAll(params);
  }

  @ApiResponse({ status: 200, description: 'coleção resgatada com sucesso.' })
  @ApiResponse({ status: 404, description: 'coleção não existe.' })
  @ApiOperation({
    summary: 'retorna uma coleção a partir de seu id.',
  })
  @Get(':id')
  findOne(@Param('id', CollectionExistPipePipe) collection: Collection) {
    return collection;
  }

  @ApiResponse({ status: 200, description: 'coleção atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'coleção não existe.' })
  @ApiResponse({ status: 400, description: 'dados inválidos não existe.' })
  @ApiOperation({
    summary: 'atualiza uma coleção a partir de seu id e dos dados informados.',
  })
  @Patch(':id')
  update(
    @Param('id', CollectionExistPipePipe) collection: Collection,
    @Body() data: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(collection.id, data);
  }

  @ApiResponse({ status: 204, description: 'coleção deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'coleção não existe.' })
  @ApiOperation({
    summary: 'deleta um coleção a partir de seu id.',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', CollectionExistPipePipe) collection: Collection) {
    return this.collectionsService.remove(collection.id);
  }
}
