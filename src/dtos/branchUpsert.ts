import {Length, IsNotEmpty} from 'class-validator';

export class BranchUpsert{
    @Length(7,30, {
    message: 'Branch Name must be between 7 and 30 characters'})
    @IsNotEmpty()
    branchName: string

    @Length(7,30, {
    message: 'Location must be between 7 and 30 characters'})
    @IsNotEmpty()
    location: string
}