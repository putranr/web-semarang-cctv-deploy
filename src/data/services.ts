// ======================================================
// DATA SERVICES
// ======================================================
// File ini berisi data jasa/layanan perusahaan.
//
// Kenapa datanya dipisahkan?
//
// Supaya nanti kalau ingin menambah atau mengubah
// layanan, kita tidak perlu mengubah kode UI.
//
// Contoh:
// tambah layanan baru → cukup tambah object di sini.
// ======================================================

import {
  Camera,
  Wrench,
  Settings,
  Cable,
} from "lucide-react";


// ======================================================
// TYPE
// ======================================================
// TypeScript memberi tahu bentuk data yang kita gunakan.
// ======================================================

export type Service = {
  title: string;
  description: string;
  icon: typeof Camera;
};


// ======================================================
// SERVICES DATA
// ======================================================

export const services: Service[] = [

  {
    title: "Installation CCTV",

    description:
      "Pemasangan sistem CCTV untuk rumah, kantor, toko, gudang, dan kebutuhan bisnis.",

    icon: Camera,
  },

  {
    title: "Maintenance CCTV",

    description:
      "Perawatan dan pemeriksaan CCTV untuk menjaga sistem keamanan tetap optimal.",

    icon: Wrench,
  },

  {
    title: "Troubleshooting",

    description:
      "Pemeriksaan dan perbaikan ketika CCTV mengalami gangguan atau tidak berfungsi.",

    icon: Settings,
  },

  {
    title: "Upgrade System",

    description:
      "Upgrade perangkat dan sistem CCTV untuk meningkatkan kualitas dan keamanan.",

    icon: Cable,
  },

];