import {OrderDTO} from '../../model/orderDTO';

export class Order {
  id!: number;
  clientId!: number;
  orderDate!: Date;
  status!: string;
  constructor(dto?: OrderDTO) {
    if(dto){
      this.id = dto?.id;
      this.clientId= dto?.clientId;
      this.orderDate = dto?.orderDate;
      this.status = dto?.status;
    }
  }
}
