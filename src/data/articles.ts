// ======================================================
// DATA ARTIKEL
// ======================================================
//
// File ini digunakan untuk menyimpan data artikel.
//
// Kita memisahkan DATA dan TAMPILAN agar kode lebih rapi.
//
// Nanti kalau ingin menambah artikel,
// cukup tambahkan data baru di file ini.
// ======================================================


// ======================================================
// TYPE ARTICLE
// ======================================================
//
// Type ini menentukan bentuk data sebuah artikel.
//
// Setiap artikel wajib memiliki:
// - title
// - category
// - date
// - image
// - excerpt
// - content
// ======================================================

export type Article = {

  title: string;

  category: string;

  date: string;

  image: string;

  excerpt: string;

  content: string;

};


// ======================================================
// DATA ARTICLES
// ======================================================

export const articles: Article[] = [

  // ----------------------------------------------------
  // ARTIKEL 1
  // ----------------------------------------------------

  {
    title:
      "Cara Memilih CCTV yang Tepat untuk Rumah",

    category:
      "Tips CCTV",

    date:
      "23 September 2026",

    image:
      "/images/article/article-1.jpg",

    excerpt:
      "Beberapa hal penting yang perlu diperhatikan sebelum memilih sistem CCTV untuk rumah.",

    content:
      "Memilih CCTV untuk rumah tidak hanya berdasarkan harga. Beberapa hal yang perlu diperhatikan adalah kualitas gambar, area monitoring, kemampuan night vision, kapasitas penyimpanan, dan kemudahan akses melalui smartphone. Dengan menentukan kebutuhan sejak awal, sistem CCTV yang digunakan dapat bekerja secara optimal."
  },


  // ----------------------------------------------------
  // ARTIKEL 2
  // ----------------------------------------------------

  {
    title:
      "5 Tips Meningkatkan Keamanan Rumah dengan CCTV",

    category:
      "Keamanan",

    date:
      "20 September 2026",

    image:
      "/images/article/article-2.jpg",

    excerpt:
      "Penempatan kamera dan konfigurasi sistem yang tepat dapat membantu meningkatkan keamanan rumah.",

    content:
      "Penempatan kamera merupakan salah satu faktor penting dalam sistem keamanan CCTV. Area seperti pintu utama, garasi, halaman, dan akses samping rumah dapat menjadi prioritas. Selain itu, pastikan kamera memiliki sudut pandang yang sesuai dan sistem penyimpanan mampu menyimpan rekaman sesuai kebutuhan."
  },


  // ----------------------------------------------------
  // ARTIKEL 3
  // ----------------------------------------------------

  {
    title:
      "Mengenal Teknologi CCTV Modern",

    category:
      "Teknologi",

    date:
      "18 September 2026",

    image:
      "/images/article/article-3.jpg",

    excerpt:
      "Teknologi CCTV terus berkembang dengan berbagai fitur seperti motion detection dan remote monitoring.",

    content:
      "CCTV modern tidak hanya digunakan untuk merekam video. Beberapa perangkat telah dilengkapi fitur seperti motion detection, human detection, remote monitoring, dan integrasi dengan perangkat lainnya. Teknologi yang digunakan sebaiknya disesuaikan dengan kebutuhan dan kondisi lokasi."
  },


  // ----------------------------------------------------
  // ARTIKEL 4
  // ----------------------------------------------------

  {
    title:
      "Pentingnya Maintenance CCTV Secara Berkala",

    category:
      "Maintenance",

    date:
      "15 September 2026",

    image:
      "/images/article/article-4.jpg",

    excerpt:
      "Maintenance berkala membantu menjaga performa kamera dan sistem CCTV tetap optimal.",

    content:
      "Maintenance CCTV secara berkala dapat membantu menemukan masalah sebelum berkembang menjadi kerusakan yang lebih serius. Pemeriksaan dapat mencakup kondisi kamera, kabel, konektor, power supply, media penyimpanan, dan kualitas rekaman."
  }

];