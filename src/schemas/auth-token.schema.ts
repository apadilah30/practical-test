import mongoose, { Date, Document, Schema as Smo } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthTokenDocument = AuthToken & Document;

@Schema()
export class AuthToken {
    
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    })
    userId: mongoose.Schema.Types.ObjectId;
    
    @Prop()
    token: String;

    @Prop({ 
        type: Date, 
        expires: '1d', 
        default: Date.now
    })
    createdAt: Date;
}

export const AuthTokensSchema = SchemaFactory.createForClass(AuthToken);