import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HolidaySundayRule } from "../enums/holiday-sunday-rule.enum";
import { User } from "./User";
import { Template } from "./Template";
import { CalculationDay } from "./CalculationDay";
import { CalculationDiscount } from "./CalculationDiscount";

@Entity({ name: "calculations" })
export class Calculation {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "uuid" })
    userId!: string

    @Column({ type: "uuid", nullable: true })
    templateId!: string | null

    @Column({ type: "integer" })
    month!: number

    @Column({ type: "integer" })
    year!: number

    @Column({ type: "integer" })
    normalRateCents!: number

    @Column({ type: "integer" })
    sundayRateCents!: number

    @Column({ type: "integer" })
    holidayRateCents!: number

    @Column({ type: "enum", enum: HolidaySundayRule })
    holidaySundayRule!: HolidaySundayRule

    @Column({ type: "integer" })
    totalMinutes!: number

    @Column({ type: "integer" })
    normalMinutes!: number

    @Column({ type: "integer" })
    sundayMinutes!: number

    @Column({ type: "integer" })
    holidayMinutes!: number

    @Column({ type: "integer" })
    grossAmountCents!: number

    @Column({ type: "integer" })
    totalDiscountsCents!: number

    @Column({ type: "integer" })
    finalAmountCents!: number

    @ManyToOne(() => User, user => user.calculations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User

    @ManyToOne(() => Template, template => template.calculations, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "templateId" })
    template!: Template | null

    @OneToMany(() => CalculationDay, day => day.calculation, { cascade: true, orphanedRowAction: "delete" })
    days!: CalculationDay[]

    @OneToMany(() => CalculationDiscount, discount => discount.calculation, {
        cascade: true,
        orphanedRowAction: "delete"
    })
    discounts!: CalculationDiscount[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}