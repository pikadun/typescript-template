import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TodoModel } from "./todo.model";

@Injectable()
export class TodoService {
    constructor(@InjectModel(TodoModel) private todoModel: typeof TodoModel) { }

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
