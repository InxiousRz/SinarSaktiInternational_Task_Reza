import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  departemen: string;

  @Prop({ required: true })
  tanggal_masuk: Date;

  @Prop({ required: true })
  foto: string;

  @Prop({ required: true, enum: Status })
  status: Status;
}

export const KaryawanSchema = SchemaFactory.createForClass(Karyawan);
