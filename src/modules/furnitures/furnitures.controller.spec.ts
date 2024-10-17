import { Test, TestingModule } from '@nestjs/testing';
import { FurnituresController } from './furnitures.controller';
import { FurnituresService } from './furnitures.service';

describe('FurnituresController', () => {
  let controller: FurnituresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnituresController],
      providers: [FurnituresService],
    }).compile();

    controller = module.get<FurnituresController>(FurnituresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
