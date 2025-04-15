import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      DatabaseModule,
      TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
