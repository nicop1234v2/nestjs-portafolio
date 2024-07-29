import { IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    subtitle: string;

    @IsString({each: true})
    content: string[];

    @IsOptional()
    @IsString({each: true})
    bibliografia?: string[];

    @IsString()
    date: string

}
