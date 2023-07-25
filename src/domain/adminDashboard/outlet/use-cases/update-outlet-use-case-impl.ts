import { OutletRepository } from "../interfaces/repositories/outlet-repository";
import { UpdateOutletUseCase } from "../interfaces/use-cases/update-outlet-use-case";
import { OutletRequestModel } from "../models/outlet";

export class UpdateOutlet implements UpdateOutletUseCase {
  outletRepository: OutletRepository;
  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }
  async execute(outletId: string, outlet: OutletRequestModel): Promise<void> {
     if(outlet.email){
      const existingOutlet = await this.outletRepository.getOutletByEmail(
        outlet.email
      );
      if (existingOutlet) {
        throw new Error("Email already exists.");
      }}
    await this.outletRepository.updateOutlet(outletId, outlet);
  }
}
