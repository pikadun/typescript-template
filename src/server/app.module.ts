import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { SsrModule } from "./modules/ssr/ssr.module";

@Module({
    imports: [
        DatabaseModule.forRoot(),
        TodoModule,

        SsrModule,
    ],
    controllers: [],
})
export class AppModule { }
