import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{ /*disclaimer: while i typically code in english, in this case, 
                i assume that the client (Qwavee this time) wants the response fields in the language specified in their requirements*/


    //all the fields must be necesary in the database, i am planning todo DTO validation as well

    @PrimaryGeneratedColumn() //auto generated id provide more confortable manage of id's  
    id:number;
    @Column({unique:true})
    nombre:string;
    @Column()
    precio:number;
    @Column()
    descripcion:string;
}