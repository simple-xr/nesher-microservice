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
import { FurnituresService } from './furnitures.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { CreateFurnitureUploadDto } from './dto/create-furniture-upload.dto';
import { FurnitureParamsDto } from './dto/furnitures-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('furnitures')
@ApiTags("Móveis")
export class FurnituresController {
  constructor(private readonly furnituresService: FurnituresService) {}

  @ApiResponse({ status: 201, description: 'móvel criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'dados inválidos.' })
  @ApiOperation({
    summary: 'cria um móvel a partir dos dados informados.',
  })
  @HttpCode(201)
  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureUploadDto) {
    return this.furnituresService.create(createFurnitureDto);
  }

  @ApiResponse({
    status: 200,
    description: 'móveis paginados resgatadas com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'parametros inválidos.' })
  @ApiOperation({
    summary:
      'retorna todos os móveis de forma paginada e filtrada por parâmetros de url.',
  })
  @Get()
  findAll(@Query() params: FurnitureParamsDto) {
    console.log(params);
    return this.furnituresService.findAll(params);
  }

  @ApiResponse({ status: 200, description: 'móvel resgatado com sucesso.' })
  @ApiResponse({ status: 404, description: 'móvel não existe.' })
  @ApiOperation({
    summary: 'retorna um móvel a partir de seu id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnituresService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'móvel atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'móvel não existe.' })
  @ApiResponse({ status: 400, description: 'dados inválidos não existe.' })
  @ApiOperation({
    summary: 'atualiza um móvel a partir de seu id e dos dados informados.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ) {
    return this.furnituresService.update(id, updateFurnitureDto);
  }

  @ApiResponse({ status: 204, description: 'móvel deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'móvel não existe.' })
  @ApiOperation({
    summary: 'deleta um móvel a partir de seu id.',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnituresService.remove(id);
  }
}
