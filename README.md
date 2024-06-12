<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Hasil Coding Test Project dari PT Sinar Sakti Internasional Oleh : Reza Fahrul Rozik

## Environment yang saya gunakan
Mohon untuk melakukan instalasi pada sebagian program berikut mengikuti versi yang ada sebelum menjalankan program :

1. Node Js : v21.0.0 ([Cek](https://nodejs.org/en))
2. Nest Js : v10.3.2 ([Cek](https://docs.nestjs.com/first-steps))
3. MongoDB (Database) : v7.0 ([Cek](https://www.mongodb.com/try/download/community))
4. Mongoose (MongoDB ORM)
5. Sheet JS (Excel Library for Javascript)
6. JsPDF (Light PDF Library for Javascript)

## Langkah Instalasi

1. Clone Project dari GIT ini.
```bash
$ git clone https://github.com/InxiousRz/SinarSaktiInternational_Task_Reza.git
```

2. Instalasi Library yang diperlukan Project Ini lewat NPM.
```bash
$ npm install
```

3. Pastikan Anda sudah menginstall Database MongoDB dan sudah bisa berkoneksi dengan Database Lokal anda.
   
4. Buka code pada program code editor Seperti VSCode/Editor Lain dan Rename file <strong>*.env.example*</strong> menjadi <strong>*.env*</strong> saja dan ganti parameter berikut sesuai authentikasi koneski Database MongoDB di Lokal anda.
```bash
# Disini contoh koneksi Fresh install yang tidak menggunakan username/password untuk authentikasi koneksi dan Nama Database TestDB
MONGODB_URI==mongodb://localhost:27017/TestDB

# Kalau MongoDB anda sudah di setup authentikasi silahkan menyesuaikan format string koneksi dengan Username dan Password anda sekiranya dengan format berikut
MONGODB_URI==mongodb://Username:Password@Domain_Host:Port_MongoDB/Nama_Database

```
4. Setelah itu harap buka Terminal/Command Prompt di perangkat anda, pastikan lokasi command berada pada root directory repositori ini yang telah anda clone. Lalu jalankan Dev Server Nest JS dengan mengetik command di bawah pada terminal anda.
```bash
$ npm run start
```

1. Buka halaman  http://localhost:3000 pada browser pilihan anda untuk mengecek apakah program sudah berjalan.

## Penggunaan API

1. Pertama tama silahkan untuk mendownload file dokumentasi API di Link Google Docs dibawah.
Dikarenakan keterbatasan space dan utilitas di Readme maka saya akan melampikan dokumentasi api pada URL Google Docs Publik ini : [Lihat Dokumentasi API disini](https://docs.google.com/document/d/1MdGPYFL70tWmhuOWXgYCDsfIURlM4Maq/edit?usp=sharing&ouid=107351349214550915503&rtpof=true&sd=true)

2. Setelah meninjau dokumentasi anda bebas bisa melakukan test pemanggilan API Lewat Postman/Tool Lain degan Ketentuan sesuai petunjuk di Dokumentasi Google Docs.
3. Untuk melihat data di database lebih rinci anda bisa melihatnya lewat Aplikasi MongoDB Compass [Disini](https://www.mongodb.com/products/tools/compass)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
