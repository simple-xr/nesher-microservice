import { Module } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ScenesRepository } from './repositories/scenes.repository';
import { ScenesPrismaRepository } from './repositories/prisma/scenes.prisma.repository';
import { FilesService } from 'aws/files.service';

@Module({
  controllers: [ScenesController],
  providers: [
    ScenesService,
    PrismaService,
    { provide: ScenesRepository, useClass: ScenesPrismaRepository },
    FilesService,
  ],
})
export class ScenesModule {}
