
export type ProductProps = {
    name?:string;
    description?:string;
    price?:number;
    images?:Array;
    _id?:string;
    category?:string;
    subcategory?:string;
    properties?:Array;
    updatedAt?:any; 
}

export interface queryProps { 
    params: {
      id: string;
    }; 
  }


export type Category = {
    _id:        string;
    name:       string;
    properties: Property[];
}

export type Property = {
    name:   string;
    values: string[];
}



export type Review = {
  _id: string;
  title:string;
  comment: string;
  rating:number;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export type Order ={
  _id: string;
  line_items: Array;
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export type WishlistProps = {
  _id: string;
  user:string;
  products: any | productsProps[]; 
  __v: number;
}