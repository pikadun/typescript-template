import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoModel } from "./todo.model";
import { DatabaseModule } from "../../core/database/database.module";

@Module({
    imports: [DatabaseModule.forFeature(TodoModel)],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }
