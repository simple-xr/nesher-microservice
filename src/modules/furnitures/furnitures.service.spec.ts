import { Test, TestingModule } from '@nestjs/testing';
import { FurnituresService } from './furnitures.service';

describe('FurnituresService', () => {
  let service: FurnituresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnituresService],
    }).compile();

    service = module.get<FurnituresService>(FurnituresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
