import { MongooseModuleOptions } from "@nestjs/mongoose";

export const mongooseOptions: MongooseModuleOptions = {
    uri: "mongodb://127.0.0.1:27017/practical_test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};