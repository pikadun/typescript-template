import { SequelizeModule } from "@nestjs/sequelize";

export const DatabaseModule = SequelizeModule.forRoot({
    dialect: "sqlite",
    synchronize: true,
    autoLoadModels: true,
});
