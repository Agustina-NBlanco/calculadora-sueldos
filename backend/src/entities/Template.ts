import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HolidaySundayRule } from "../enums/holiday-sunday-rule.enum";
import { User } from "./User";
import { Calculation } from "./Calculation";

@Entity({ name: "templates" })
export class Template {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "uuid" })
    userId!: string

    @Column()
    name!: string

    @Column()
    normalRateCents!: number

    @Column()
    sundayRateCents!: number

    @Column()
    holidayRateCents!: number

    @Column({ type: "enum", enum: HolidaySundayRule })
    holidaySundayRule!: HolidaySundayRule

    @ManyToOne(() => User, user => user.templates, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User

    @OneToMany(() => Calculation, calculation => calculation.template)
    calculations!: Calculation[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}