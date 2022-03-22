import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {BiosModel} from "src/bios/bios.model";
import {UsersModel} from "./users.model";

enum Types {
    active_directory = 'active_directory',
    without_active_directory = 'without_active_directory'
}

@Table({tableName: 'types'})
export class TypesModel extends Model {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING, allowNull: false})
    type: Types
    @HasOne(() => UsersModel)
    user: UsersModel[]
}