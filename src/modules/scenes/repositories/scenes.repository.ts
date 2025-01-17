import { Scene } from '../entities/scene.entity';

export abstract class ScenesRepository {
  abstract getScenes(): Promise<Scene[]>;
  abstract getSceneById(id: string): Promise<Scene>;
  abstract createScene(glb: string): Promise<Scene>;
  abstract deleteScene(id: string): Promise<Scene>;
}
