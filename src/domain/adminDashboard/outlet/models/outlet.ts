import { AdminResponseModel } from "../../admin/model/admin";

export class OutletRequestModel {
  constructor(
    public brandName: string = "",
    public email: string = "",
    public phone: string = "",
    public altPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public active: boolean = true,
    public admins: string[] = [] // Update the type to string[] (array of admin IDs)
  ) {}
}

export class OutletResponseModel {
  constructor(
    public id: string,
    public brandName: string,
    public email: string,
    public phone: string,
    public altPhone: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public active: boolean,
    public admins: AdminResponseModel[]
  ) {}
}
