import { OutletRequestModel } from "../../../outlet/models/outlet";

export interface CreateOutletUseCase {
  execute(outlet: OutletRequestModel): Promise<void>;
}
