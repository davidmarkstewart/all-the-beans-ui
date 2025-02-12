export type Bean = {
  id: string;
  index: number;
  isBOTD: boolean;
  cost: number;
  image: string;
  colour: string;
  name: string;
  description: string;
  country: string;
};

export type CartBean = Pick<Bean, 'id' | 'name' | 'cost' | 'image'> & { quantity: number };

export type Cart = {
  beans: CartBean[];
}

export type RawBean = {
  _id: string;
  index: number;
  isBOTD: boolean;
  Name: string;
  Country: string;
  colour: string;
  Cost: string;
  Image: string;
  Description: string;
}