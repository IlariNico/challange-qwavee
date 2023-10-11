import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product} from './products/product.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type:'mysql', //configuracions, ports and credentials of the database
      host:'localHost',
      username:'root',
      password:'',
      port:3306,
      database:'njs_challenge_db',
      entities:[Product],//entities mapped in database
      synchronize:true //property to automatically modificate the db, do not use in production
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
