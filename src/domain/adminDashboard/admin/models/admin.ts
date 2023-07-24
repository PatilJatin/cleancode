export class AdminRequestModel {
  constructor(
    public name: string = "",
    public email: string = "",
    public phone: number = 0,
    public brand: string = "",
    public jobTitle: string = "",
    public superAdmin: boolean = false,
    public admin: boolean = false,
    public permissions: number[] = [],
    public active: boolean = false,
    public outlet: string = ""
  ) {}
}

export class AdminResponseModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: number,
    public brand: string,
    public jobTitle: string,
    public superAdmin: boolean,
    public admin: boolean,
    public permissions: number[],
    public active: boolean,
    public outlet: string
  ) {}
}
