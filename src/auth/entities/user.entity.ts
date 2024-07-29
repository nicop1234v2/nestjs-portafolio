import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document{

    @Prop({
        unique: true,
        index: true,
    })
    email: string;

    @Prop()
    pass: string;

    @Prop()
    fullName: string;

    @Prop({default:["user"]})
    roles: string[];

}


export const UserSchema = SchemaFactory.createForClass( User )