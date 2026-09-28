// ======================================================
// DATA BRAND YANG DIGUNAKAN
// ======================================================
//
// File ini berisi informasi brand CCTV yang digunakan
// perusahaan.
//
// Data dipisahkan dari tampilan agar mudah diperbarui.
// ======================================================


// ======================================================
// TYPE BRAND
// ======================================================

export type Brand = {

  // Nama brand
  name: string;

  // Kategori / jenis produk
  category: string;

  // Logo brand
  logo: string;

  // Deskripsi singkat
  shortDescription: string;

  // Penjelasan lengkap
  description: string;

  // Kegunaan / keunggulan
  features: string[];

};


// ======================================================
// DATA BRAND
// ======================================================

export const brands: Brand[] = [

  // ----------------------------------------------------
  // BRAND 1
  // ----------------------------------------------------

  {
    name: "Brand 1",

    category: "CCTV & Security",

    logo: "/images/brands/brand-1.png",

    shortDescription:
      "Brand solusi keamanan yang digunakan untuk kebutuhan monitoring dan surveillance.",

    description:
      "Brand ini digunakan sebagai salah satu pilihan perangkat dalam sistem keamanan CCTV. Pemilihan perangkat disesuaikan dengan kebutuhan lokasi, area monitoring, kualitas gambar, dan kebutuhan pelanggan.",

    features: [
      "Monitoring area",
      "Sistem surveillance",
      "Berbagai pilihan kamera",
    ],
  },


  // ----------------------------------------------------
  // BRAND 2
  // ----------------------------------------------------

  {
    name: "Brand 2",

    category: "CCTV & Security",

    logo: "/images/brands/brand-2.png",

    shortDescription:
      "Salah satu brand yang digunakan untuk kebutuhan sistem monitoring keamanan.",

    description:
      "Perangkat dari brand ini dapat digunakan sebagai bagian dari sistem CCTV pada berbagai kebutuhan instalasi. Konfigurasi dipilih berdasarkan karakteristik lokasi dan kebutuhan pengguna.",

    features: [
      "Monitoring keamanan",
      "Pilihan perangkat beragam",
      "Dapat digunakan untuk berbagai kebutuhan",
    ],
  },


  // ----------------------------------------------------
  // BRAND 3
  // ----------------------------------------------------

  {
    name: "Brand 3",

    category: "CCTV & Security",

    logo: "/images/brands/brand-3.png",

    shortDescription:
      "Brand perangkat keamanan yang digunakan untuk mendukung sistem surveillance.",

    description:
      "Brand ini menjadi salah satu alternatif perangkat yang dapat digunakan dalam kebutuhan installation CCTV dan sistem monitoring.",

    features: [
      "Sistem monitoring",
      "Perangkat surveillance",
      "Pilihan kamera",
    ],
  },


  // ----------------------------------------------------
  // BRAND 4
  // ----------------------------------------------------

  {
    name: "Brand 4",

    category: "Networking",

    logo: "/images/brands/brand-4.png",

    shortDescription:
      "Brand yang digunakan untuk mendukung kebutuhan networking pada sistem CCTV.",

    description:
      "Networking merupakan bagian penting dalam instalasi CCTV. Perangkat networking dari brand ini dapat digunakan sesuai kebutuhan sistem dan kondisi instalasi.",

    features: [
      "Networking",
      "Koneksi perangkat",
      "Supporting CCTV system",
    ],
  },


  // ----------------------------------------------------
  // BRAND 5
  // ----------------------------------------------------

  {
    name: "Brand 5",

    category: "Storage",

    logo: "/images/brands/brand-5.png",

    shortDescription:
      "Brand yang digunakan untuk mendukung kebutuhan penyimpanan data CCTV.",

    description:
      "Penyimpanan merupakan bagian penting dalam sistem surveillance. Perangkat penyimpanan dipilih berdasarkan kapasitas, kebutuhan rekaman, dan konfigurasi sistem.",

    features: [
      "Penyimpanan data",
      "Kapasitas beragam",
      "Supporting CCTV recording",
    ],
  },


  // ----------------------------------------------------
  // BRAND 6
  // ----------------------------------------------------

  {
    name: "Brand 6",

    category: "Accessories",

    logo: "/images/brands/brand-6.png",

    shortDescription:
      "Brand perangkat pendukung yang digunakan dalam instalasi CCTV.",

    description:
      "Perangkat pendukung diperlukan agar sistem CCTV dapat terpasang dan bekerja dengan baik. Pemilihan perangkat dilakukan berdasarkan kebutuhan instalasi.",

    features: [
      "Perangkat pendukung",
      "Kebutuhan instalasi",
      "Supporting security system",
    ],
  },

];