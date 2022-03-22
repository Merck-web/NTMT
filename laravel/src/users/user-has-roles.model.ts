import {BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {BiosModel} from "src/bios/bios.model";
import { RolesModel } from "./roles.model";
import { UsersModel } from "./users.model";

enum Types {
    admin = 'admin',
    student = 'student',
    teacher = 'teacher',
    parent = 'parent'
}

@Table({tableName: 'user_has_roles'})
export class UsersRolesModel extends Model {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number
    @ForeignKey(() => UsersModel)
    @Column({type: DataType.INTEGER})
    user_id: number
    @ForeignKey(() => RolesModel)
    @Column({type: DataType.INTEGER})
    role_id: number
}