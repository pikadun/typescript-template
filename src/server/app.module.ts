import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { RenderModule } from "./modules/render/render.module";

@Module({
    imports: [
        DatabaseModule.forRoot(),
        TodoModule,

        RenderModule,
    ],
    controllers: [],
})
export class AppModule { }
