import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UsersModel} from "src/users/users.model";

@Table({tableName: 'bios'})
export class BiosModel extends Model {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING, allowNull: false})
    name: string
    @Column({type: DataType.STRING, allowNull: false})
    second_name: string
    @Column({type: DataType.STRING, allowNull: true})
    patronomyc: string
    @Column({type: DataType.DATE, allowNull: false})
    flura: Date
    @Column({type: DataType.DECIMAL, allowNull: false})
    grant: number

    @ForeignKey(() => UsersModel)
    @Column({type: DataType.INTEGER})
    user_id: number
    @BelongsTo(() => UsersModel)
    user: UsersModel[]
}