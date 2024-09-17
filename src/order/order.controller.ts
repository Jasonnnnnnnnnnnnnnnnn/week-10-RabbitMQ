import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    @Inject('INVENTORY_SERVICE') private inventoryService: ClientProxy,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderService.create(createOrderDto);
    console.log('Order sent to inventory for processing')
    this.inventoryService.emit('order_created', newOrder);
    return newOrder;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @MessagePattern('order_completed')
  handleOrderCompleted(@Payload() data: any, @Ctx() context: RmqContext) {
    data.status = 'completed' ;
    return this.orderService.update(data.id, data);
  }

  @MessagePattern('order_canceld')
  handleOrderCanceled(@Payload() data: any, @Ctx() context: RmqContext) {
    data.status = 'canceled' ;
    return this.orderService.update(data.id, data);
  }
}
