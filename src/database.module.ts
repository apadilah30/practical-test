import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseOptions } from "./mongoose.options";
import { databaseProviders } from "./database.providers";


@Module({
    imports: [MongooseModule.forRootAsync({ useFactory: () => mongooseOptions})],
    // providers: [...databaseProviders],
    // exports: [...databaseProviders],
})

export class DatabaseModule {}