export interface IRegister {
  email: string;
  username: string;
  phone: string;
  password: string;
}

export interface IUpdateUser {
  id: number;
  email: string | null | undefined;
  phone: string | null | undefined;
  fullName: string | null | undefined;
  sex: string | null | undefined;
  photoUrl: any;
  id_status?: number;
  groupID?: number;
}

export interface ILogin {
  username: string | null | undefined;
  password: string | null | undefined;
}

export interface IResponse {
  EM: string;
  EC: string;
  DT: any;
}

export interface IResponseToken {
  access_token: string;
  refresh_token: string;
}

type TUserDetail = {
  full_name: string;
  email: string;
  sex: string;
  photo_url: string;
};

export interface IGroup {
  name: string;
  desc?: string;
}

export interface IUser {
  id: number;
  username: string;
  phone: string;
  id_login_method: string;
  id_status: number;
  User_Detail: TUserDetail;
  Group: IGroup;
}

export interface IAddress {
  id?: number | null | undefined;
  userID: number;
  full_name: string | null | undefined;
  phone: string | null | undefined;
  address: string | null | undefined;
  city: string | null | undefined;
  district: string | null | undefined;
  ward: string | null | undefined;
  isDefault: boolean | null | undefined;
}

type IAddressDetail = {
  full_name: string | null | undefined;
  phone: string | null | undefined;
  address: string | null | undefined;
  city: string | null | undefined;
  district: string | null | undefined;
  ward: string | null | undefined;
};

export interface IAddressResponse {
  id?: number;
  userID: number;
  isDefault: boolean;
  Address_Detail: IAddressDetail;
}
