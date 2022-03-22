import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {BiosModel} from "src/bios/bios.model";
import {RolesModel} from "./roles.model";
import {TypesModel} from "./types.model";
import {UsersRolesModel} from "./user-has-roles.model";

@Table({tableName: 'users'})
export class UsersModel extends Model {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    login: string
    @Column({type: DataType.STRING, allowNull: true})
    password: string
    @HasOne(() => BiosModel)
    bio: BiosModel[]
    @ForeignKey(() => TypesModel)
    @Column({type: DataType.INTEGER})
    types_id: number
    @Column({type: DataType.STRING, allowNull: true})
    refresh_token: string
    @BelongsTo(() => TypesModel)
    types: TypesModel[]
    @BelongsToMany(() => RolesModel, () => UsersRolesModel)
    roles: RolesModel[]
}