import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm/browser";

@Entity({name: "userApplication"})
export default class UserApplication extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    systemName: string;
}
