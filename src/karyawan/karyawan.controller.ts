import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  StreamableFile,
  Res,
  Query,
} from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { read, utils, writeFile } from 'xlsx';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns-tz';

class entity {
  nama: string;
  nomor: number;
  jabatan: string;
  departemen: string;
  tanggal_masuk: string;
  foto: string;
  status: string;
}

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  // CREATE KARYAWAN
  @Post()
  @UseInterceptors(ResponseInterceptor)
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.create(createKaryawanDto);
  }

  // Import CSV Data to System
  @Post('import_csv')
  @UseInterceptors(ResponseInterceptor)
  @UseInterceptors(
    FileInterceptor('file_csv', {
      storage: memoryStorage(),
    }),
  )
  async importCSV(@UploadedFile() file: Express.Multer.File) {
    const wb = read(file.buffer, { cellDates: true });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const jsonData = utils.sheet_to_json(sheet, {
      raw: true,
    });
    return this.karyawanService.bulkCreate(jsonData);
  }

  // Export Data to CSV File
  @Post('export_csv')
  @UseInterceptors(ResponseInterceptor)
  async exportCSV(@Req() req: Request) {
    let data = await this.karyawanService.findAllToExport();

    // Remove Unecessary Mongose Object keys
    data = data.map((d) => {
      const result = d['_doc'];
      return result;
    });

    // To CSV
    const sheet = utils.json_to_sheet(data, {
      header: [
        'nama',
        'nomor',
        'jabatan',
        'departmen',
        'tanggal_masuk',
        'foto',
        'status',
      ],
      cellDates: true,
      dateNF: 'YYYY-MM-DD',
    });
    const wb = utils.book_new(sheet, 'Sheet1');

    const folder = 'public/csv';
    const filename =
      'Export_Karyawan_' + new Date().getTime().toString() + '.csv';
    const finalPath = folder + '/' + filename;

    const csvFile = writeFile(wb, finalPath, {
      bookType: 'csv',
    });

    // Form a route (as requested on task)
    const downloadURL =
      `${req.protocol}://${req.get('Host')}` +
      '/karyawan/download_csv/' +
      filename;
    return downloadURL;
  }

  // DOWNLOAD BRIDGE CSV
  @Get('download_csv/:filename')
  downloadCSV(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string,
  ): StreamableFile {
    //Get path from Fixed CSV Folder on Local
    const filepath = 'public/csv/' + filename;
    const file = createReadStream(join(process.cwd(), filepath));

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="' + filename + '"',
    });

    return new StreamableFile(file);
  }

  // EXPORT DATA TO PDF FILE
  @Post('export_pdf')
  @UseInterceptors(ResponseInterceptor)
  async exportPDF(@Req() req: Request) {
    const data = await this.karyawanService.findAllToExport();

    // Remove Unecessary Mongose Object keys
    let index = 1;
    const dataFormated = data.map((d) => {
      d['_doc']['tanggal_masuk'] = format(
        d['_doc']['tanggal_masuk'],
        'yyyy/M/dd',
        {
          timeZone: 'Asia/Jakarta',
        },
      );
      let result: any[] = Object.values(d['_doc']);
      result = [index].concat(result);
      index++;
      return result;
    });

    // To PDF
    const pdf = new jsPDF('landscape', 'mm', 'a4', true);
    autoTable(pdf, {
      head: [
        [
          'No',
          'Nama',
          'Nomor',
          'Jabatan',
          'Departmen',
          'Tanggal Masuk',
          'Foto',
          'Status',
        ],
      ],
      body: dataFormated,
    });

    const folder = 'public/pdf';
    const filename =
      'PDF_Export_Karyawan_' + new Date().getTime().toString() + '.pdf';
    const finalPath = folder + '/' + filename;

    pdf.save(finalPath);

    // Form a route (as requested on task)
    const downloadURL =
      `${req.protocol}://${req.get('Host')}` +
      '/karyawan/download_pdf/' +
      filename;
    return downloadURL;
  }

  // DOWNLOAD BRIDGE FOR PDF
  @Get('download_pdf/:filename')
  downloadPDF(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string,
  ): StreamableFile {
    //Get path from Fixed CSV Folder on Local
    const filepath = 'public/pdf/' + filename;
    const file = createReadStream(join(process.cwd(), filepath));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="' + filename + '"',
    });

    return new StreamableFile(file);
  }

  // FIND ALL KARYAWAN
  @Get()
  @UseInterceptors(ResponseInterceptor)
  findAll() {
    return this.karyawanService.findAll();
  }

  // FIND KARYAWAN BY ID
  @Get(':id')
  @UseInterceptors(ResponseInterceptor)
  findOne(@Param('id') id: string) {
    return this.karyawanService.findOne(id);
  }

  // FIND KARYAWAN WITH FILTER AND SIMPLE PAGINATION
  @Get('search/paginate/')
  @UseInterceptors(ResponseInterceptor)
  findAllPagination(
    @Query('nama') nama: string = '',
    @Query('jabatan') jabatan: string = '',
    @Query('departmen') departmen: string = '',
    @Query('status') status: string = '',
    @Query('limit') limit: number = 25,
    @Query('offset') offset: number = 0,
  ) {
    return this.karyawanService.findAllPagination(
      nama,
      jabatan,
      departmen,
      status,
      limit,
      offset,
    );
  }

  // UPDATE KARYAWAN BY ID
  @Patch(':id')
  @UseInterceptors(ResponseInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
  ) {
    return this.karyawanService.update(id, updateKaryawanDto);
  }

  // DELETE KARYAWAN BY ID
  @Delete(':id')
  @UseInterceptors(ResponseInterceptor)
  remove(@Param('id') id: string) {
    return this.karyawanService.remove(id);
  }
}
