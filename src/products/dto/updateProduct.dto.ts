import { IsNotEmpty, IsPositive, IsString, Length } from "class-validator";
export class UpdateProductDto{ 
    @IsString({message:"la descripcion debe ser texto"})
    @Length(4,150,{message:"la descripcion debe contener al menos 4 caracteres y 155 maximo"})
    @IsNotEmpty({message: "nombre no puede estar vacío"})
    nombre?:string;

    @IsNotEmpty({message: "precio no puede estar vacío"})
    @IsPositive({message:"el precio debe ser un número mayor a 0"})
    precio?:number;

    @IsString({message:"la descripcion debe ser texto"})
    @Length(8,255,{message:"la descripcion debe contener al menos 8 caracteres y 255 maximo"})
    descipcion?:string;
}