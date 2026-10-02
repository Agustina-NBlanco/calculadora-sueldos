import { IsEnum, IsInt, IsNotEmpty, Min } from "class-validator";
import { HolidaySundayRule } from "../enums/holiday-sunday-rule.enum";


export class CreateTemplateDto {

    @IsNotEmpty()
    name!: string

    @IsInt()
    @Min(0)
    normalRateCents!: number

    @IsInt()
    @Min(0)
    sundayRateCents!: number

    @IsInt()
    @Min(0)
    holidayRateCents!: number

    @IsEnum(HolidaySundayRule)
    holidaySundayRule!: HolidaySundayRule
}

export class UpdateTemplateDto {
    @IsNotEmpty()
    name?: string

    @IsInt()
    @Min(0)
    normalRateCents?: number

    @IsInt()
    @Min(0)
    sundayRateCents?: number

    @IsInt()
    @Min(0)
    holidayRateCents?: number

    @IsEnum(HolidaySundayRule)
    holidaySundayRule?: HolidaySundayRule
}