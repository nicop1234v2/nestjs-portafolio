import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Post extends Document{

    @Prop({
        index: true
    })
    title: string;

    @Prop({
        index: true
    })
    subtitle: string;

    @Prop()
    content: string[];

    @Prop()
    bibliografia?: string[];

    @Prop()
    date: string
}


export const PostSchema = SchemaFactory.createForClass( Post )