// ======================================================
// DATA SERVICES
// ======================================================
//
// Data seluruh jasa dan layanan perusahaan.
// ======================================================

import {
  Camera,
  Wrench,
  Settings,
  Cable,
} from "lucide-react";


// ======================================================
// TYPE SERVICE
// ======================================================

export type Service = {

  // Nama layanan
  title: string;

  // Deskripsi singkat untuk card
  description: string;

  // Icon
  icon: typeof Camera;

  // Penjelasan lengkap untuk modal
  detail: string;

  // Daftar pekerjaan yang termasuk
  features: string[];

};


// ======================================================
// SERVICES DATA
// ======================================================

export const services: Service[] = [

  // ====================================================
  // 1. INSTALLATION
  // ====================================================

  {
    title: "Installation CCTV",

    description:
      "Pemasangan sistem CCTV untuk rumah, kantor, toko, gudang, dan berbagai kebutuhan bisnis.",

    icon: Camera,

    detail:
      "Layanan installation CCTV mencakup proses perencanaan, penempatan kamera, pemasangan perangkat, penarikan kabel, konfigurasi recorder, hingga pengujian sistem agar dapat digunakan sesuai kebutuhan lokasi.",

    features: [
      "Survey dan analisis lokasi",
      "Penentuan titik kamera",
      "Pemasangan kamera CCTV",
      "Penarikan dan perapihan kabel",
      "Konfigurasi DVR/NVR",
      "Pengujian sistem",
    ],
  },


  // ====================================================
  // 2. MAINTENANCE
  // ====================================================

  {
    title: "Maintenance CCTV",

    description:
      "Perawatan berkala untuk menjaga performa CCTV dan sistem monitoring tetap optimal.",

    icon: Wrench,

    detail:
      "Maintenance CCTV dilakukan untuk membantu menjaga kondisi perangkat dan sistem tetap berfungsi dengan baik. Pemeriksaan dapat dilakukan secara berkala maupun berdasarkan kebutuhan ketika ditemukan gangguan.",

    features: [
      "Pemeriksaan kamera",
      "Pengecekan kabel dan konektor",
      "Pemeriksaan DVR/NVR",
      "Pengecekan media penyimpanan",
      "Pemeriksaan power supply",
      "Pembersihan perangkat",
    ],
  },


  // ====================================================
  // 3. TROUBLESHOOTING
  // ====================================================

  {
    title: "Troubleshooting",

    description:
      "Pemeriksaan dan penanganan gangguan pada sistem CCTV yang tidak bekerja sebagaimana mestinya.",

    icon: Settings,

    detail:
      "Layanan troubleshooting ditujukan untuk membantu menemukan sumber masalah pada sistem CCTV. Pemeriksaan dilakukan pada perangkat, koneksi, kabel, power supply, recorder, dan konfigurasi sistem.",

    features: [
      "Pemeriksaan kamera offline",
      "Pengecekan koneksi",
      "Pemeriksaan kabel",
      "Pengecekan power supply",
      "Pemeriksaan DVR/NVR",
      "Analisis gangguan sistem",
    ],
  },


  // ====================================================
  // 4. UPGRADE SYSTEM
  // ====================================================

  {
    title: "Upgrade System",

    description:
      "Peningkatan perangkat dan sistem CCTV untuk menyesuaikan kebutuhan keamanan yang berkembang.",

    icon: Cable,

    detail:
      "Upgrade system dilakukan ketika sistem CCTV yang sudah ada membutuhkan penambahan atau peningkatan perangkat. Kebutuhan upgrade dapat disesuaikan dengan kondisi sistem dan target pengguna.",

    features: [
      "Penambahan kamera",
      "Penggantian perangkat",
      "Upgrade kapasitas penyimpanan",
      "Perbaikan jaringan",
      "Pengaturan ulang sistem",
      "Optimalisasi monitoring",
    ],
  },

];