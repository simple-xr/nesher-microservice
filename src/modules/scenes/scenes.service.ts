import { Injectable } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { ScenesRepository } from './repositories/scenes.repository';

@Injectable()
export class ScenesService {
  constructor(private readonly repository: ScenesRepository) {}
  create(glb: string) {
    return this.repository.createScene(glb);
  }

  findAll() {
    return this.repository.getScenes();
  }

  findOne(id: string) {
    return this.repository.getSceneById(id);
  }


  remove(id: string) {
    return this.repository.deleteScene(id);
  }
}
