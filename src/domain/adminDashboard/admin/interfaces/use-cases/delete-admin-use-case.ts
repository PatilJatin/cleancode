export interface DeleteAdminUseCase {
  execute(adminId: string): Promise<void>;
}
