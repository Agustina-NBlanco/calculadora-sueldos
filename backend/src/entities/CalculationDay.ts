import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Calculation } from "./Calculation";

@Entity({ name: "calculation_days" })
@Index(["calculationId", "date"], { unique: true })
export class CalculationDay {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid" })
    calculationId!: string;

    @Column({ type: "date" })
    date!: Date

    @Column()
    minutesWorked!: number;

    @Column({ default: false })
    isHoliday!: boolean;

    @ManyToOne(() => Calculation, calculation => calculation.days, { onDelete: "CASCADE" })
    @JoinColumn({ name: "calculationId" })
    calculation!: Calculation

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}