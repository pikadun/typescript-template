import { Column, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "todos",
    modelName: "Todo",
})
export class TodoModel extends Model {
    @Column
    title!: string;

    @Column
    completed!: boolean;
}
