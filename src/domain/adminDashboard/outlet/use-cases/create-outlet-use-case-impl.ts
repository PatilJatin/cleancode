import { OutletRequestModel } from "../models/outlet";
import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { CreateOutletUseCase } from "../interfaces/use-cases/create-outlet-use-case";

export class CreateOutlet implements CreateOutletUseCase {
  outletRepository: OutletRepository;
  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outlet: OutletRequestModel): Promise<void> {
    const existingOutlet = await this.outletRepository.getOutletByEmail(
      outlet.email
    );
    if (existingOutlet) {
      throw new Error("Email already exists.");
    }
    await this.outletRepository.createOutlet(outlet);
  }
}
