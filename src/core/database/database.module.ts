import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { Sequelize, AbstractDialect, Options, ModelStatic, Model } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";

export const SEQUELIZE_PROVIDER = Symbol("SEQUELIZE_PROVIDER");
export type Repository<T extends Model> = ModelStatic<T>;

@Global()
@Module({})
export class DatabaseModule {
    static models = new Set<ModelStatic>();

    static forRoot() {
        const options: Options<AbstractDialect> = {
            dialect: SqliteDialect,
        };

        const dynamicModule: DynamicModule = {
            module: DatabaseModule,
            providers: [
                {
                    provide: SEQUELIZE_PROVIDER,
                    useFactory: async () => {
                        const sequelize = new Sequelize(options);

                        sequelize.addModels(Array.from(this.models));

                        await sequelize.authenticate();
                        await sequelize.sync();

                        return sequelize;
                    },
                },
            ],
            exports: [SEQUELIZE_PROVIDER],
        };

        return dynamicModule;
    }

    static forFeature(...models: ModelStatic[]) {
        const providers = models.map<Provider>((model) => {
            const provider: Provider = {
                provide: model,
                useFactory: (sequelize: Sequelize) => {
                    return sequelize.models.get(model.options.modelName);
                },
                inject: [SEQUELIZE_PROVIDER],
            };

            this.models.add(model);

            return provider;
        });

        const dynamicModule: DynamicModule = {
            module: DatabaseModule,
            providers: providers,
            exports: providers,
        };

        return dynamicModule;
    }
}
