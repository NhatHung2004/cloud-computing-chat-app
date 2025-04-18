import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { File, FileSchema } from "./file.schema";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";


@Module({
    imports: [
        MongooseModule.forFeature([ { name: File.name, schema: FileSchema } ]),
    ],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule {}
