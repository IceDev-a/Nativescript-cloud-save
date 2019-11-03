import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm/browser";
import SaveFile from "./savefile.entity";

@Entity({name: "userApplication"})
export default class UserApplication extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    systemName: string;

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;

    @OneToMany((type) => SaveFile, (saveFile) => saveFile.userApplication)
    saveFiles: Array<SaveFile>;
}
