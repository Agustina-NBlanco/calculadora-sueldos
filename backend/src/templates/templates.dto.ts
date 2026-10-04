import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";
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
    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsInt()
    @Min(0)
    normalRateCents?: number

    @IsOptional()
    @IsInt()
    @Min(0)
    sundayRateCents?: number

    @IsOptional()
    @IsInt()
    @Min(0)
    holidayRateCents?: number

    @IsOptional()
    @IsEnum(HolidaySundayRule)
    holidaySundayRule?: HolidaySundayRule
}