import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'order.db',
      entities: [],
      synchronize: true,
    }), OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
