import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { DeleteOutletUseCase } from "../interfaces/use-cases/delete-outlet-use-case";

export class DeleteOutlet implements DeleteOutletUseCase {
  constructor(private readonly outletRepository: OutletRepository) {}

  async execute(outletId: string): Promise<void> {
    await this.outletRepository.deleteOutlet(outletId);
  }
}
