import { IsArray, IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, Max, Min, ValidateIf, ValidateNested } from "class-validator"
import { DiscountType } from "../enums/discount-type.enum"
import { HolidaySundayRule } from "../enums/holiday-sunday-rule.enum"
import { Type } from "class-transformer"


export class CalculationDayDto {
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    date!: string

    @IsInt()
    @Min(0)
    minutesWorked!: number

    @IsBoolean()
    isHoliday!: boolean
}

export class CalculationDiscountDto {
    @IsNotEmpty()
    name!: string

    @IsEnum(DiscountType)
    type!: DiscountType

    @ValidateIf(discount => discount.type === DiscountType.PERCENTAGE)
    @IsDefined()
    @IsInt()
    @Min(0)
    @Max(10000)
    percentageBasisPoints?: number

    @ValidateIf(discount => discount.type === DiscountType.FIXED_AMOUNT)
    @IsDefined()
    @IsInt()
    @Min(0)
    amountCents?: number
}

export class CreateCalculationDto {
    @IsOptional()
    @IsUUID()
    templateId?: string

    @IsInt()
    @Min(1)
    @Max(12)
    month!: number

    @IsInt()
    @Min(2000)
    year!: number

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CalculationDayDto)
    days!: CalculationDayDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CalculationDiscountDto)
    discounts?: CalculationDiscountDto[]
}

export class UpdateCalculationDto {
    @IsOptional()
    @IsUUID()
    templateId?: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(12)
    month?: number

    @IsOptional()
    @IsInt()
    @Min(2000)
    year?: number

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

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CalculationDayDto)
    days?: CalculationDayDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CalculationDiscountDto)
    discounts?: CalculationDiscountDto[]
}