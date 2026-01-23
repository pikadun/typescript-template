import { Inject, Injectable } from "@nestjs/common";
import { TodoModel } from "./todo.model";
import type { Repository } from "../../core/database/database.module";

@Injectable()
export class TodoService {
    constructor(@Inject(TodoModel) private todoModel: Repository<TodoModel>) { }

    async findAll(): Promise<TodoModel[]> {
        return this.todoModel.findAll();
    }

    async create(title: string): Promise<TodoModel> {
        return this.todoModel.create({ title });
    }

    async delete(id: number): Promise<void> {
        const todo = await this.todoModel.findByPk(id);
        if (todo) {
            await todo.destroy();
        }
    }
}
