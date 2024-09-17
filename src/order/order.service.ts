import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }
  create(createOrderDto: CreateOrderDto) {
    const newOrder = new Order();
    newOrder.email = createOrderDto.email;
    newOrder.productId = createOrderDto.productId;
    newOrder.status = 'draft';

    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id)
    const updatedOrder = {...order , ...updateOrderDto};
    return this.ordersRepository.save(updatedOrder);
  }

  remove(id: number) {
    return this.ordersRepository.delete(id);
  }
}
