import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { GetOutletByIdUseCase } from "../interfaces/use-cases/get-outlet-id-use-case";
import { OutletResponseModel } from "../models/outlet";

export class GetOutletById implements GetOutletByIdUseCase {
  constructor(private readonly outletRepository: OutletRepository) {}

  async execute(outletId: string): Promise<OutletResponseModel | null> {
    return this.outletRepository.getOutletById(outletId);
  }
}
