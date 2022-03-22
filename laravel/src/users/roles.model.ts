import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {BiosModel} from "src/bios/bios.model";
import {UsersRolesModel} from "./user-has-roles.model";
import {UsersModel} from "./users.model";

enum Types {
    admin = 'admin',
    student = 'student',
    teacher = 'teacher',
    parent = 'parent'
}

@Table({tableName: 'roles'})
export class RolesModel extends Model {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING, allowNull: false})
    type: Types
    @BelongsToMany(() => UsersModel, () => UsersRolesModel)
    users: UsersModel[]
}