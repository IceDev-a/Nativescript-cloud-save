import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm/browser";
import UserApplication from "./application.entity";

@Entity({name: "saveFile"})
export default class SaveFile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;

    @ManyToOne((type) => UserApplication, (userApp) => userApp.saveFiles)
    userApplication: UserApplication;
}
