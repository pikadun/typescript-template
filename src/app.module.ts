import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";

@Module({
    imports: [DatabaseModule.forRoot(), TodoModule],
})
export class AppModule { }
