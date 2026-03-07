export interface OrderItemDTO {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderDTO {
  id?: number;
  clientId?: number;
  items: OrderItemDTO[];
  total: number;
  status: string;
  orderDate?: string;
}
