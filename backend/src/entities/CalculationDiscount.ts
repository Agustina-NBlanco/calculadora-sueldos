import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DiscountType } from "../enums/discount-type.enum";
import { Calculation } from "./Calculation";

@Entity({ name: "calculation_discounts" })
export class CalculationDiscount {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "uuid" })
    calculationId!: string

    @Column()
    name!: string

    @Column({ type: "enum", enum: DiscountType })
    type!: DiscountType

    @Column({ type: "integer", nullable: true })
    percentageBasisPoints!: number | null

    @Column({ type: "integer", nullable: true })
    amountCents!: number | null

    @ManyToOne(() => Calculation, calculation => calculation.discounts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "calculationId" })
    calculation!: Calculation

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}