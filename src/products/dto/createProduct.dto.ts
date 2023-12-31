import {IsString,Length, IsNotEmpty, IsPositive, IsNumber } from "class-validator";

export class CreateproductDto{
    @IsString({message:"la descripcion debe ser texto"})
    @Length(4,150,{message:"la descripcion debe contener al menos 4 caracteres y 155 maximo"})
    @IsNotEmpty({message: "nombre no puede estar vacío"})
    nombre:string;

    @IsNotEmpty({message: "precio no puede estar vacío"})
    @IsPositive({message:"el precio debe ser un número mayor a 0"})
    @IsNumber({},{message:"Debe ser un número"})
    precio:number;

    @IsString({message:"la descripcion debe ser texto"})
    @Length(8,255,{message:"la descripcion debe contener al menos 8 caracteres y 255 maximo"})
    descripcion:string;
}