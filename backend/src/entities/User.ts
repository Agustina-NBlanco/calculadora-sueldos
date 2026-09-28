import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Template } from "./Template";
import { Calculation } from "./Calculation";


@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Template, template => template.user)
    templates!: Template[];

    @OneToMany(() => Calculation, calculation => calculation.user)
    calculations!: Calculation[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}