import { OutletRequestModel } from "../../models/outlet";

export interface UpdateOutletUseCase {
  execute(id: string, data: OutletRequestModel): Promise<void>;
}
