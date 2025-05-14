import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Scene } from '../../entities/scene.entity';
import { Injectable } from '@nestjs/common';
import { ScenesRepository } from '../scenes.repository';

@Injectable()
export class ScenesPrismaRepository implements ScenesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getSceneById(id: string): Promise<Scene> {
    return await this.prisma.scenes.findUnique({
      where: {
        id,
      },
    });
  }
  async createScene(glb: string): Promise<Scene> {
    return await this.prisma.scenes.create({
      data: {
        glb,
      },
    });
  }
  async deleteScene(id: string): Promise<Scene> {
    return await this.prisma.scenes.delete({
      where: { id },
    });
  }
  async getScenes(): Promise<Scene[]> {
    return await this.prisma.scenes.findMany({});
  }

 
}
