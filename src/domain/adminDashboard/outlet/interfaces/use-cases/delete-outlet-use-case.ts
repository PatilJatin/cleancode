export interface DeleteOutletUseCase {
  execute(id: string): Promise<void>;
}
