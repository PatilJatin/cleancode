import { OutletResponseModel } from "../../models/outlet";

export interface GetOutletsUseCase {
  execute(): Promise<OutletResponseModel[]>;
}
