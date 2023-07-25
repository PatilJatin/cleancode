import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { GetOutletsUseCase } from "../interfaces/use-cases/get-all-outlets-use-case";
import { OutletResponseModel } from "../models/outlet";

export class GetAllOutlets implements GetOutletsUseCase {
  constructor(private readonly outletRepository: OutletRepository) {}

  async execute(): Promise<OutletResponseModel[]> {
    return this.outletRepository.getAllOutlets();
  }
}
