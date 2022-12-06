import { Max, Min, IsInt } from "class-validator";

export class TypeDto{

    @IsInt()
    @Min(1)
    @Max(20)
    type: number
}