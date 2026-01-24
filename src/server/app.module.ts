import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { FallbackController } from "./modules/fallback/fallback.controller";

@Module({
    imports: [DatabaseModule.forRoot(), TodoModule],
    controllers: [FallbackController],
})
export class AppModule { }
