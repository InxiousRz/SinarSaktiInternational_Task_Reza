import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Karyawan } from './schema/karyawan.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class KaryawanService {
  constructor(
    @InjectModel(Karyawan.name) private karyawanModel: Model<Karyawan>,
  ) {}

  async create(createKaryawanDto: CreateKaryawanDto) {
    const newKaryawan = new this.karyawanModel(createKaryawanDto);
    return await newKaryawan.save();
  }

  async findAll(): Promise<Karyawan[]> {
    const allKaryawan = await this.karyawanModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
    return allKaryawan;
  }

  async findOne(id: string): Promise<Karyawan> {
    const isValidMongoID = isValidObjectId(id);
    if (isValidMongoID) {
      const wantedKaryawan = await this.karyawanModel.findById(id);
      return wantedKaryawan;
    } else {
      return null;
    }
  }

  async update(
    id: string,
    updateKaryawanDto: UpdateKaryawanDto,
  ): Promise<Karyawan> {
    const isValidMongoID = isValidObjectId(id);
    if (isValidMongoID) {
      const updatedKaryawan = await this.karyawanModel.findByIdAndUpdate(
        id,
        updateKaryawanDto,
        {
          runValidators: true,
          new: true,
        },
      );
      return updatedKaryawan;
    } else {
      throw new BadRequestException('INVALID_ID_PROVIDED', {
        description: 'Provided ID is Invalid MongoDB ID : ' + id,
      });
    }
  }

  async remove(id: string): Promise<Karyawan> {
    const isValidMongoID = isValidObjectId(id);
    if (isValidMongoID) {
      const deletedKaryawan = await this.karyawanModel.findByIdAndDelete(id);
      return deletedKaryawan;
    } else {
      throw new BadRequestException('INVALID_ID_PROVIDED', {
        description: 'Provided ID is Invalid MongoDB ID : ' + id,
      });
    }
  }
}
