export class CreateCarDto {
  model: string;
  price: number;
  year?: number;
  color?: string;
  brandId: number;
}

export class CreateBrandDto {
  name: string;
  country?: string;
}