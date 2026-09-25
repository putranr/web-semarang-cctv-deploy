// ======================================================
// DATA PORTFOLIO
// ======================================================
//
// File ini berisi informasi project yang pernah
// dikerjakan perusahaan.
//
// Nanti kalau ada project baru, kita cukup menambahkan
// data baru di file ini.
// ======================================================


// ======================================================
// TYPE PORTFOLIO
// ======================================================

export type Portfolio = {

  // Judul project
  title: string;

  // Kategori project
  category: string;

  // Lokasi project
  location: string;

  // Jumlah kamera
  cameras: number;

  // Tahun pengerjaan
  year: number;

  // Gambar project
  image: string;

  // Deskripsi project
  description: string;
};


// ======================================================
// DATA PROJECT
// ======================================================

export const portfolios: Portfolio[] = [

  {
    title: "Installation CCTV Office",

    category: "Kantor",

    location: "Semarang",

    cameras: 16,

    year: 2026,

    image: "/images/portfolio/portfolio-1.jpg",

    description:
      "Instalasi 16 kamera CCTV untuk kebutuhan monitoring dan keamanan area kantor.",
  },


  {
    title: "CCTV Rumah Tinggal",

    category: "Rumah",

    location: "Semarang",

    cameras: 6,

    year: 2026,

    image: "/images/portfolio/portfolio-2.jpg",

    description:
      "Pemasangan sistem CCTV untuk memantau area depan, samping, dan belakang rumah.",
  },


  {
    title: "Warehouse Security System",

    category: "Gudang",

    location: "Jakarta",

    cameras: 24,

    year: 2026,

    image: "/images/portfolio/portfolio-3.jpg",

    description:
      "Pemasangan CCTV pada area gudang untuk meningkatkan keamanan dan monitoring aktivitas.",
  },


  {
    title: "Retail Store CCTV",

    category: "Toko",

    location: "Semarang",

    cameras: 8,

    year: 2026,

    image: "/images/portfolio/portfolio-4.jpg",

    description:
      "Instalasi CCTV untuk membantu pemilik toko melakukan monitoring aktivitas secara real-time.",
  },

];