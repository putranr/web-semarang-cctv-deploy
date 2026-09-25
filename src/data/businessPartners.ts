// ======================================================
// DATA MITRA BISNIS
// ======================================================
//
// File ini menyimpan data perusahaan / institusi
// yang menjadi mitra bisnis.
//
// Data dipisahkan dari UI supaya lebih mudah
// untuk menambah atau mengubah mitra.
// ======================================================


// ======================================================
// TYPE BUSINESS PARTNER
// ======================================================

export type BusinessPartner = {

  // Nama perusahaan / mitra
  name: string;

  // Logo mitra
  logo: string;

};


// ======================================================
// DATA MITRA BISNIS
// ======================================================

export const businessPartners: BusinessPartner[] = [

  {
    name: "Nama Mitra 1",
    logo: "/images/business/business-1.png",
  },

  {
    name: "Nama Mitra 2",
    logo: "/images/business/business-2.png",
  },

  {
    name: "Nama Mitra 3",
    logo: "/images/business/business-3.png",
  },

  {
    name: "Nama Mitra 4",
    logo: "/images/business/business-4.png",
  },

  {
    name: "Nama Mitra 5",
    logo: "/images/business/business-5.png",
  },

  {
    name: "Nama Mitra 6",
    logo: "/images/business/business-6.png",
  },

];