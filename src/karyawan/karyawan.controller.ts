import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';

@Controller('karyawan')
@UseInterceptors(ResponseInterceptor)
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Post()
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.create(createKaryawanDto);
  }

  @Get()
  findAll() {
    return this.karyawanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.karyawanService.findOne(id);
  }

  // @Get('pagination')
  // findPagination(@Param('page') page: number, @Param('max_entries') max_entries: number) {
  //   return this.karyawanService.findPagination(page, max_entries);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
  ) {
    return this.karyawanService.update(id, updateKaryawanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.karyawanService.remove(id);
  }
}
