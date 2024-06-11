import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Karyawan, KaryawanSchema } from './schema/karyawan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Karyawan.name, schema: KaryawanSchema },
    ]),
  ],
  controllers: [KaryawanController],
  providers: [KaryawanService],
})
export class KaryawanModule {}
