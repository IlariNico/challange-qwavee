import { IsNotEmpty, IsPositive, IsString, Length ,IsNumber, IsOptional} from "class-validator";
export class UpdateProductDto{ 

    @IsOptional()
    @IsString({message:"la descripcion debe ser texto"})
    @Length(4,150,{message:"la descripcion debe contener al menos 4 caracteres y 155 maximo"})
    nombre?:string;

    @IsOptional()
    @IsNumber({},{message:"el precio debe ser un número"})
    @IsPositive({message:"el precio debe ser un número mayor a 0"})
    precio?:number;
    
    @IsOptional()
    @IsString({message:"la descripcion debe ser texto"})
    @Length(8,255,{message:"la descripcion debe contener al menos 8 caracteres y 255 maximo"})
    descripcion?:string;
}