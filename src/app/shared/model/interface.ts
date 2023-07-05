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

type TShopDetail = {
  name: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  photo_url: string | null | undefined;
  address: string | null | undefined;
  city: string | null | undefined;
  district: string | null | undefined;
  ward: string | null | undefined;
};

type TWarehouse = {
  id: number;
};

type TDiscount = {
  id: number;
};

export interface ICart {
  id: number;
  isGroupCart: boolean;
  name: string;
  userID: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  Shop: IShop;
  Product_Price_Option: IProductPriceOption;
  Product: IProduct;
  checked: boolean;
}

export interface IShop {
  id: number;
  feedback_rating: number;
  score_rating: number;
  id_status: number;
  slug: string;
  createdAt: any;
  Shop_Detail: TShopDetail;
  Warehouse: TWarehouse;
  Discount: TDiscount;
}

export interface IUser {
  id: number;
  username: string;
  phone: string;
  id_login_method: string;
  id_status: number;
  User_Detail: TUserDetail;
  Group: IGroup;
  Shop: IShop;
  Carts: ICart[];
}

type TStock = {
  id: number;
  quantity: number;
};

type TProductDetail = {
  desc: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  name: string;
  price_discount?: number;
  price_original: number;
};

type TImageProductDetail = {
  photo_url: string;
};

export interface IImageProducts {
  id: number;
  Image_Product_Detail: TImageProductDetail;
}

export interface ICategory {
  id: number;
  name_category: string;
  photo_url: string;
  status: number;
  createdAt: any;
}
export interface ICategoryFilter {
  id: number;
  name_category_filter: string;
  status: number;
  categoryID: number;
  createdAt: any;
  Category: ICategory;
  isChoose: boolean;
}

export interface IProductPriceOption {
  discountPercentID: number;
  firstFilter: TProductFilter;
  id: number;
  name: string;
  price: number;
  price_discount: number;
  productFirstFilterID: number;
  productSecondFilterID: number;
  quantity_stock: number;
  secondFilter: TProductFilter;
}

export type TProductFilter = {
  id: number;
  name_filter: string | any;
};

export interface IProductType {
  id: number;
  name_product_type: string;
  Product_Filters?: TProductFilter[];
}

export interface IProduct {
  id: number;
  status: number;
  shopID: number;
  discountPercentID?: number;
  categoryFilterID: number;
  Stock: TStock;
  Product_Detail: TProductDetail;
  Image_Products: IImageProducts[];
  Shop: IShop;
  checked?: boolean;
  Discount_Percent: IDiscountPercent;
  Category_Filter: ICategoryFilter;
  Product_Price_Options: IProductPriceOption[];
  Product_Types: IProductType[];
}

export interface IDiscountPercent {
  id?: number;
  percent: string | null | undefined;
  date_start?: Date | null | undefined;
  date_end?: Date | null | undefined;
  list_product: number[] | null | undefined;
}
