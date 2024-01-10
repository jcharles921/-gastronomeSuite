import { IsString, IsInt,IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CategoryDto {
@ApiProperty(
    {
        description: 'The name of the category',
        type: String,
    },

)
@IsString()
@IsNotEmpty()
name: string;
@ApiProperty(
    {
        description: 'The inputation number of the category',
        type: Number,
    }
)
@IsInt()
@IsNotEmpty()
inputationNumber: number;
}