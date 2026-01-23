import { Controller, Delete, Get, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
    constructor(private readonly service: TodoService) { }

    @Get("/")
    async findAll() {
        return this.service.findAll();
    }

    @Delete("/:id")
    async delete(id: number) {
        return this.service.delete(id);
    }

    @Post("/")
    async create(title: string) {
        return this.service.create(title);
    }
}
