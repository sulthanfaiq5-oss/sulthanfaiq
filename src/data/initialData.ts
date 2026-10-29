import { Transaction } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-2026-001",
    date: "2026-10-15",
    desc: "Pencairan Hibah Dana Kemahasiswaan BEM",
    type: "pemasukan",
    category: "Dana Hibah / Sponsor Masuk",
    method: "Transfer Bank (BCA)",
    amount: 20000000,
    receiptName: "surat-hibah-dana-rektorat.pdf",
    status: "approved",
    coaCode: "4-101 (Pendapatan Hibah)",
    auditorNote: "Dana masuk terkonfirmasi di rekening giro BCA.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-002",
    date: "2026-10-18",
    desc: "Sewa Aula Utama & Panggung Dies Natalis",
    type: "pengeluaran",
    category: "Sewa Tempat & Peralatan",
    method: "Transfer Bank (BCA)",
    amount: 3500000,
    receiptName: "kuitansi-sewa-aula.jpg",
    status: "approved",
    coaCode: "5-201 (Beban Sewa)",
    auditorNote: "Kuitansi bermeterai resmi dari pengelola gedung.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-003",
    date: "2026-10-20",
    desc: "Sponsor Kegiatan dari Bank Syariah",
    type: "pemasukan",
    category: "Dana Hibah / Sponsor Masuk",
    method: "Transfer Bank (BCA)",
    amount: 2500000,
    receiptName: "mou-sponsor-bank.pdf",
    status: "approved",
    coaCode: "4-102 (Pendapatan Sponsorship)",
    auditorNote: "Sesuai MoU sponsorship kemahasiswaan.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-004",
    date: "2026-10-22",
    desc: "Konsumsi Nasi Kotak Rapat Panitia 40 Orang",
    type: "pengeluaran",
    category: "Beban Konsumsi & Logistik",
    method: "Tunai / Kas Kecil (Petty Cash)",
    amount: 1200000,
    receiptName: "nota-katering-berkah.jpg",
    status: "approved",
    coaCode: "5-102 (Beban Konsumsi)",
    auditorNote: "Faktur kasir cocok dengan daftar hadir panitia.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-005",
    date: "2026-10-24",
    desc: "Pencetakan Spanduk & ID Card Panitia",
    type: "pengeluaran",
    category: "Perlengkapan & ATK",
    method: "QRIS",
    amount: 850000,
    receiptName: "struk-digital-percetakan.png",
    status: "approved",
    coaCode: "5-103 (Beban Publikasi & Cetak)",
    auditorNote: "Struk QRIS valid dengan timestamp 24/10.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-006",
    date: "2026-10-25",
    desc: "Pembelian ATK, Spidol, & Kertas HVS Rapat",
    type: "pengeluaran",
    category: "Perlengkapan & ATK",
    method: "Tunai / Kas Kecil (Petty Cash)",
    amount: 200000,
    receiptName: "struk-toko-buku-ceria.jpg",
    status: "approved",
    coaCode: "5-101 (Beban ATK & Kantor)",
    auditorNote: "Sesuai rincian kasir.",
    verifiedBy: "Rian Pratama, CA",
  },
  {
    id: "TX-2026-007",
    date: "2026-10-28",
    desc: "Konsumsi Coffee Break Pemateri Seminar",
    type: "pengeluaran",
    category: "Beban Konsumsi & Logistik",
    method: "QRIS",
    amount: 450000,
    receiptName: "struk-cafe-nara.jpg",
    status: "pending",
    coaCode: "5-102 (Beban Konsumsi)",
    auditorNote: "Baru disetor klien, menunggu verifikasi staf DOKU.",
    verifiedBy: "-",
  }
];

export const COA_OPTIONS = [
  "5-102 (Beban Konsumsi)",
  "5-101 (Beban ATK & Kantor)",
  "5-201 (Beban Sewa & Properti)",
  "5-301 (Beban Honorarium)",
  "4-101 (Pendapatan Hibah)",
  "4-102 (Pendapatan Sponsorship)",
  "5-999 (Beban Operasional Lainnya)"
];

export const CATEGORY_OPTIONS = [
  "Beban Konsumsi & Logistik",
  "Perlengkapan & ATK",
  "Sewa Tempat & Peralatan",
  "Honorarium / Jasa Narasumber",
  "Dana Hibah / Sponsor Masuk",
  "Lain-lain"
];

export const PAYMENT_METHODS = [
  "Transfer Bank (BCA)",
  "Transfer Bank (Mandiri)",
  "Tunai / Kas Kecil (Petty Cash)",
  "QRIS"
];

export const formatIDR = (val: number): string => {
  return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
};
