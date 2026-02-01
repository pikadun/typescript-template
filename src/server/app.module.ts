import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { SpaModule } from "./modules/spa/spa.module";

@Module({
    imports: [
        DatabaseModule.forRoot(),
        TodoModule,

        SpaModule,
    ],
    controllers: [],
})
export class AppModule { }
