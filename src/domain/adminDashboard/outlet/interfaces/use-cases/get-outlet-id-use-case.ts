import { OutletResponseModel } from "../../models/outlet";

export interface GetOutletByIdUseCase {
  execute(id: string): Promise<OutletResponseModel | null>;
}
