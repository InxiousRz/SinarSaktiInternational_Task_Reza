import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { format } from 'date-fns-tz';

export enum Status {
  KONTRAK = 'kontrak',
  TETAP = 'tetap',
  PROBATION = 'probation',
}

export type KaryawanDocument = HydratedDocument<Karyawan>;

@Schema({
  timestamps: true,
  collection: 'karyawan',
})
export class Karyawan {
  @Prop({ required: true })
  nama: string;

  @Prop({ required: true })
  nomor: number;

  @Prop({ required: true })
  jabatan: string;

  @Prop({ required: true })
  departmen: string; // Based on CSV Format

  @Prop({
    required: true,
    get: (tanggal_masuk) =>
      format(tanggal_masuk, 'yyyy/M/dd', { timeZone: 'Asia/Jakarta' }),
  })
  tanggal_masuk: Date;

  @Prop({ required: true })
  foto: string;

  @Prop({ required: true, enum: Status })
  status: Status;
}

export const KaryawanSchema = SchemaFactory.createForClass(Karyawan);
