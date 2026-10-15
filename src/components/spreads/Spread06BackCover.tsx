import React from 'react';
import { CompanyProfileData, ThemeId, TogglesState } from '../../types/monograph';
import { CropMarks, GridOverlay } from '../common/CropMarks';
import { Mail, Phone, Globe, MapPin, Building2, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

interface Spread06BackCoverProps {
  data: CompanyProfileData;
  toggles?: TogglesState;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

// Clean Vector SVG QR Code with genuine quiet zones and finder marks
const SvgQrCode: React.FC<{ size?: number; color?: string; bg?: string }> = ({
  size = 76,
  color = '#000000',
  bg = '#ffffff',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="100" height="100" fill={bg} />
      {/* Top Left Finder */}
      <rect x="8" y="8" width="26" height="26" stroke={color} strokeWidth="4" fill="none" />
      <rect x="14" y="14" width="14" height="14" fill={color} />
      {/* Top Right Finder */}
      <rect x="66" y="8" width="26" height="26" stroke={color} strokeWidth="4" fill="none" />
      <rect x="72" y="14" width="14" height="14" fill={color} />
      {/* Bottom Left Finder */}
      <rect x="8" y="66" width="26" height="26" stroke={color} strokeWidth="4" fill="none" />
      <rect x="14" y="72" width="14" height="14" fill={color} />
      {/* Timing Patterns */}
      <line x1="38" y1="17" x2="62" y2="17" stroke={color} strokeWidth="3" strokeDasharray="3 3" />
      <line x1="17" y1="38" x2="17" y2="62" stroke={color} strokeWidth="3" strokeDasharray="3 3" />
      {/* Data Matrix Dots */}
      <rect x="40" y="30" width="6" height="6" fill={color} />
      <rect x="52" y="30" width="6" height="6" fill={color} />
      <rect x="40" y="42" width="6" height="6" fill={color} />
      <rect x="60" y="42" width="6" height="6" fill={color} />
      <rect x="50" y="52" width="6" height="6" fill={color} />
      <rect x="70" y="52" width="6" height="6" fill={color} />
      <rect x="40" y="62" width="6" height="6" fill={color} />
      <rect x="60" y="62" width="6" height="6" fill={color} />
      <rect x="70" y="70" width="6" height="6" fill={color} />
      <rect x="82" y="42" width="6" height="6" fill={color} />
      <rect x="32" y="72" width="6" height="6" fill={color} />
      <rect x="52" y="80" width="6" height="6" fill={color} />
      <rect x="72" y="80" width="6" height="6" fill={color} />
      <rect x="82" y="80" width="6" height="6" fill={color} />
    </svg>
  );
};

export const Spread06BackCover: React.FC<Spread06BackCoverProps> = ({
  data,
  toggles,
  showGrid,
  themeId = 'tech-navy',
}) => {
  if (toggles && toggles.showBackCover === false) {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white border border-zinc-200 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center print:hidden">
        <div className="w-12 h-12 bg-amber-50 border border-amber-300 rounded-none flex items-center justify-center text-amber-600 mb-4">
          <Building2 className="w-6 h-6" />
        </div>
        <p className="font-headline text-base font-bold text-[#1c1917] tracking-[-0.02em]">
          BAB 06 // HALAMAN PENUTUP (BACK COVER) DINONAKTIFKAN
        </p>
        <p className="font-editorial-body text-xs mt-2 max-w-md leading-[1.6]">
          Halaman penutup disembunyikan. Untuk menampilkan kembali lembar ini pada monograf dan hasil cetak PDF, aktifkan tombol saklar pada tab &quot;Kontak &amp; Penutup&quot; atau &quot;Toggles&quot; di Panel Editor Kiri.
        </p>
      </article>
    );
  }

  const photoUrl =
    data.backCover?.photoUrl ||
    data.portfolio.flagship.photoUrl ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

  const closingHeadline =
    data.backCover?.closingHeadline ||
    'MEMBANGUN NEGERI DENGAN REKAYASA PRESISI & STANDAR INTEGRITAS TERTINGGI.';

  const branchOffices =
    data.contact.regional ||
    data.backCover?.branches ||
    'JAKARTA (HQ) // SURABAYA // BALIKPAPAN';

  // -------------------------------------------------------------
  // THEME 1: TECH NAVY
  // -------------------------------------------------------------
  if (themeId === 'tech-navy') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // BACK COVER MONOGRAPH" regText="TECH-NAVY // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT (360px high, sharp corners, overlay) */}
          <section className="mt-2 mb-3.5 shrink-0">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden border border-slate-700/80 bg-slate-900">
              <img
                src={photoUrl}
                alt="Headquarters & Strategic Infrastructure"
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
              
              {/* Minimalist Header Overlay on Corner */}
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-xs border border-slate-700/80 px-3.5 py-1.5 flex items-center gap-2.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-folio-mono text-[10px] text-white font-bold tracking-[0.1em] uppercase">
                  HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-xs border border-slate-800 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-white">ASSET REGISTER: ACK-HQ-SCBD // KELAS A+ SUPER-TALL</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-400 hidden sm:inline">
                  LAT: 06°13'44"S // LONG: 106°48'33"E
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-none bg-emerald-400/20 border border-emerald-400 flex items-center justify-center font-bold text-emerald-400 text-xs">
                ACK
              </div>
              <div>
                <h1 className="font-headline text-lg sm:text-xl font-extrabold uppercase text-white tracking-[-0.02em]">
                  {data.companyName}
                </h1>
                <p className="text-[11px] text-emerald-400 font-semibold tracking-wide uppercase">
                  {data.tagline}
                </p>
              </div>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-bold text-slate-100 uppercase tracking-[-0.01em] mb-2.5 leading-snug">
              {closingHeadline}
            </h2>

            {/* Blok CTA Kemitraan Resmi */}
            <div className="p-3.5 bg-slate-900 border-l-4 border-emerald-400 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Kemitraan & Penugasan Proyek Strategis
                </span>
                <span className="font-folio-mono text-[9px] text-slate-400">SLA RESPON: &lt; 24 JAM</span>
              </div>
              <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.6]">
                {data.backCover.body ||
                  'PT Arya Cipta Konstruksi Tbk siap melayani penugasan proyek rekayasa sipil, arsitektur monumental, dan kontrak EPC skala nasional maupun regional dengan tata kelola profesional dan kepatuhan standar internasional.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Tabel Kontak Resmi (7 cols) */}
            <div className="col-span-12 sm:col-span-7 bg-slate-900/80 border border-slate-800 p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Direktori Kantor Pusat
                </span>
                <span className="text-[10px] text-emerald-400 font-folio-mono">INDONESIA</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug text-[11px]">
                  <p className="font-semibold text-white">{data.contact.headquarters.line1}</p>
                  <p className="text-slate-400">{data.contact.headquarters.line2}</p>
                  <p className="text-slate-400">{data.contact.headquarters.line3}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">{data.contact.comms.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium text-emerald-400">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                <div className="flex items-center gap-2 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white tracking-wide">{data.contact.comms.website}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-folio-mono">SLA: 24/7 DEDICATED</span>
              </div>
            </div>

            {/* Kolom Kanan: Verifikasi Dokumen & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 bg-slate-900/80 border border-slate-800 p-3.5 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                    Validasi Digital
                  </span>
                  <span className="text-[10px] text-emerald-400 font-folio-mono">LPJK / PUPR</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1 bg-white border border-slate-700">
                    <SvgQrCode size={56} color="#0f172a" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-slate-300 space-y-0.5">
                    <p className="font-bold text-white uppercase">Pangkalan Data Resmi</p>
                    <p className="text-slate-400 leading-tight">Pindai QR untuk validasi keabsahan dokumen tender & perizinan berusaha OSS.</p>
                  </div>
                </div>
              </div>

              {/* Daftar Kantor Cabang & Stempel */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-[10px]">
                  <span className="text-slate-400 font-semibold block">JARINGAN OPERASIONAL:</span>
                  <span className="text-white font-medium">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] text-emerald-400 bg-slate-950/80 px-2 py-0.5 border border-slate-800/80 flex items-center justify-between">
                  <span>STAMP: 89AF-ACK2026-B1</span>
                  <span>TERVERIFIKASI</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
            <div>Publikasi Monograf Resmi // {data.companyName} // Hak Cipta Dilindungi</div>
            <div className="font-folio-mono text-[10px] text-emerald-400">HALAMAN 06 DARI 06 // PENUTUP</div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 2: SWISS EDITORIAL & TANGERINE
  // -------------------------------------------------------------
  if (themeId === 'swiss-tangerine') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // SWISS STRICT GRID" regText="SWISS-TANGERINE // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT (~45% / 360px high, monochrome, sharp corners) */}
          <section className="mt-2 mb-3.5 border-2 border-black relative shrink-0 bg-black">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
              <img
                src={photoUrl}
                alt="Headquarters Architecture"
                className="w-full h-full object-cover object-center grayscale contrast-125"
              />
              
              {/* Minimalist Top Left Corner Overlay */}
              <div className="absolute top-0 left-0 bg-black text-white px-3.5 py-1.5 font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em] border-b-2 border-r-2 border-black">
                HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
              </div>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-white border-t-2 border-black px-4 py-2 flex items-center justify-between text-xs font-bold text-black">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ff5722]" />
                  <span>KANTOR PUSAT & SENTRA OPERASI TEKNIK // SCBD JAKARTA</span>
                </div>
                <span className="font-folio-mono text-[10px] text-zinc-600 hidden sm:inline">
                  LAT: 06°13'44"S // LONG: 106°48'33"E
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-xs">
                  ACK
                </div>
                <div>
                  <h1 className="font-headline text-lg sm:text-xl font-extrabold uppercase text-black tracking-[-0.02em]">
                    {data.companyName}
                  </h1>
                  <p className="text-xs font-bold text-zinc-600 uppercase">
                    KONTRAKTOR UMUM EPC & REKAYASA INFRASTRUKTUR SIPIL
                  </p>
                </div>
              </div>
              <span className="font-folio-mono text-[10px] bg-zinc-100 border border-black px-2 py-1 font-bold">
                STATUS: TERVERIFIKASI B1
              </span>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-extrabold text-black uppercase tracking-[-0.02em] mb-2 leading-tight">
              {closingHeadline}
            </h2>

            {/* Solid Tangerine CTA Box */}
            <div className="bg-[#ff5722] text-white p-4 border-2 border-black">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider block">
                  Kemitraan Resmi & Penugasan Proyek
                </span>
                <span className="font-folio-mono text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">
                  DIVISI TENDER BUMN / SWASTA
                </span>
              </div>
              <p className="font-editorial-body text-xs text-white/95 leading-[1.6]">
                {data.backCover.body ||
                  'PT Arya Cipta Konstruksi Tbk mengundang sinergi strategis bersama instansi pemerintah, BUMN, lembaga pendanaan internasional, serta pengembang properti swasta terkemuka dalam mewujudkan infrastruktur berdaya tahan tinggi, fasilitas industri presisi, dan arsitektur landmark modern.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Tabel Kontak Resmi (7 cols) */}
            <div className="col-span-12 sm:col-span-7 border-2 border-black p-4 text-xs space-y-2 bg-white">
              <div className="flex items-center justify-between border-b-2 border-black pb-1.5 font-bold">
                <span className="uppercase text-[11px] tracking-wider text-black">
                  Direktori Kantor Pusat
                </span>
                <span className="font-folio-mono text-[10px] text-zinc-500">INDONESIA</span>
              </div>

              <div className="space-y-0.5 text-[11px]">
                <p className="font-bold text-black">{data.contact.headquarters.line1}</p>
                <p className="text-zinc-600">{data.contact.headquarters.line2}</p>
                <p className="text-zinc-600">{data.contact.headquarters.line3}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black text-[11px]">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 block">TELEPON:</span>
                  <span className="font-semibold text-black">{data.contact.comms.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 block">SUREL RESMI:</span>
                  <span className="font-bold text-[#ff5722]">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-black text-[11px]">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 block">PORTAL WEB:</span>
                  <span className="font-bold text-black tracking-wide">{data.contact.comms.website}</span>
                </div>
                <span className="font-folio-mono text-[10px] font-bold text-zinc-600">SLA: &lt; 24 JAM</span>
              </div>
            </div>

            {/* Kolom Kanan: Verifikasi Dokumen & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 border-2 border-black p-4 flex flex-col justify-between text-xs bg-white">
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2 font-bold">
                  <span className="uppercase text-[11px] tracking-wider text-black">
                    Verifikasi Digital
                  </span>
                  <span className="font-folio-mono text-[10px] text-zinc-500">PORTAL TENDER</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border-2 border-black p-1 bg-white">
                    <SvgQrCode size={56} color="#000000" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-zinc-700 space-y-0.5">
                    <p className="font-bold text-black uppercase">Pindai Kode QR</p>
                    <p className="leading-tight text-zinc-600">Validasi keabsahan dokumen tender, izin SBU, dan profil konsorsium di LPJK PUPR.</p>
                  </div>
                </div>
              </div>

              {/* Cabang & Stempel Kearsipan */}
              <div className="pt-2 border-t-2 border-black space-y-1">
                <div className="text-[10px]">
                  <span className="font-bold text-zinc-500 block">JARINGAN CABANG:</span>
                  <span className="font-bold text-black">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] bg-zinc-100 border border-black px-2 py-0.5 flex justify-between font-bold">
                  <span>HASH: 89AF-ACK2026</span>
                  <span>TERAKREDITASI</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t-2 border-black flex justify-between items-center text-xs font-bold shrink-0">
            <div>{data.companyName} // Monograf Selesai // Hak Cipta Dilindungi</div>
            <div className="font-folio-mono text-[10px] bg-black text-white px-2 py-0.5">
              HALAMAN 06 / 06
            </div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 3: CYBER DARK & CRIMSON 2028
  // -------------------------------------------------------------
  if (themeId === 'cyber-crimson') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // DARK EDITORIAL" regText="CYBER-CRIMSON // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT (360px) */}
          <section className="mt-2 mb-3.5 relative border border-slate-800 shrink-0 bg-slate-950">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
              <img
                src={photoUrl}
                alt="Headquarters & Strategic Assets"
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-black/40" />

              {/* Minimalist Top Left Corner Overlay */}
              <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-xs border border-slate-800 px-3 py-1 text-[10px] font-folio-mono text-white tracking-wider uppercase">
                HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-xs border border-slate-800 px-3.5 py-1.5 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">INFRASTRUKTUR STRATEGIS KELAS DUNIA</span>
                <span className="font-folio-mono text-[10px] text-[#ff2d55]">LAT: 06°13'44"S // LONG: 106°48'33"E</span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#ff2d55]/20 border border-[#ff2d55] flex items-center justify-center font-bold text-[#ff2d55] text-xs">
                ACK
              </div>
              <div>
                <h1 className="font-headline text-lg sm:text-xl font-extrabold uppercase text-white tracking-[-0.02em]">
                  {data.companyName}
                </h1>
                <p className="text-xs font-semibold text-[#ff2d55] uppercase">
                  {data.tagline}
                </p>
              </div>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-bold text-slate-100 uppercase tracking-[-0.01em] mb-2 leading-snug">
              {closingHeadline}
            </h2>

            {/* Crimson Accent Box */}
            <div className="p-3.5 bg-slate-900/90 border-l-4 border-[#ff2d55] border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider">
                  Kemitraan & Penugasan Proyek
                </span>
                <span className="font-folio-mono text-[9px] text-slate-400">SLA: &lt; 24 JAM</span>
              </div>
              <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.6]">
                {data.backCover.body ||
                  'Inovasi struktur, kepatuhan legalitas, dan komitmen keselamatan tanpa kompromi untuk pembangunan infrastruktur nasional yang tangguh dan berkelanjutan.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Kontak (7 cols) */}
            <div className="col-span-12 sm:col-span-7 bg-slate-900/70 border border-slate-800 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-slate-200">
                  Direktori Kantor Pusat
                </span>
                <span className="font-folio-mono text-[10px] text-slate-400">INDONESIA</span>
              </div>

              <div className="space-y-0.5 text-[11px] text-slate-300">
                <p className="font-semibold text-white">{data.contact.headquarters.line1}</p>
                <p className="text-slate-400">{data.contact.headquarters.line2}</p>
                <p className="text-slate-400">{data.contact.headquarters.line3}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-400 block">TELEPON:</span>
                  <span className="text-white font-medium">{data.contact.comms.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">SUREL RESMI:</span>
                  <span className="text-[#ff2d55] font-semibold">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-400 block">PORTAL RESMI:</span>
                  <span className="text-white font-medium">{data.contact.comms.website}</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-400">RESPONS CEPAT</span>
              </div>
            </div>

            {/* Kolom Kanan: QR & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 bg-slate-900/70 border border-slate-800 p-3.5 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-slate-200">
                    Verifikasi Digital
                  </span>
                  <span className="font-folio-mono text-[10px] text-[#ff2d55]">OSS / PUPR</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1 bg-white border border-slate-700">
                    <SvgQrCode size={56} color="#0b0f19" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-slate-300 space-y-0.5">
                    <p className="font-bold text-white uppercase">Validasi Tender</p>
                    <p className="text-slate-400 leading-tight">Pindai kode QR untuk mengakses arsip legalitas dan kualifikasi usaha LPJK.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-[10px]">
                  <span className="text-slate-400 font-semibold block">JARINGAN REGIONAL:</span>
                  <span className="text-white font-medium">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] text-[#ff2d55] bg-black/60 px-2 py-0.5 border border-slate-800 flex justify-between">
                  <span>HASH: 89AF-ACK2028</span>
                  <span>TERDAFTAR</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400 shrink-0">
            <div>{data.companyName} // 2028 // Hak Cipta Dilindungi</div>
            <div className="font-folio-mono text-[10px] text-[#ff2d55]">HALAMAN 06 / 06</div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 4: BOLD SCARLET CIRCLE
  // -------------------------------------------------------------
  if (themeId === 'scarlet-circle') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // SCARLET EDITORIAL" regText="SCARLET-CIRCLE // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT (360px) */}
          <section className="mt-2 mb-3.5 border-2 border-slate-900 relative shrink-0 bg-black">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
              <img
                src={photoUrl}
                alt="Headquarters & Strategic Assets"
                className="w-full h-full object-cover object-center grayscale contrast-125"
              />

              {/* Minimalist Top Left Corner Overlay */}
              <div className="absolute top-0 left-0 bg-red-600 text-white px-3.5 py-1.5 font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em] border-b-2 border-r-2 border-slate-900">
                HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-white border-t-2 border-slate-900 px-4 py-2 flex items-center justify-between text-xs font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>KANTOR PUSAT & SENTRA REKAYASA STRUKTUR</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-500 hidden sm:inline">
                  LAT: 06°13'44"S // LONG: 106°48'33"E
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full border-4 border-red-600 flex items-center justify-center font-bold text-red-600 text-xs shrink-0">
                ACK
              </div>
              <div>
                <h1 className="font-headline text-lg sm:text-xl font-extrabold uppercase text-slate-950 tracking-[-0.02em]">
                  {data.companyName}
                </h1>
                <p className="text-xs font-bold text-red-600 uppercase">
                  {data.tagline}
                </p>
              </div>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-[-0.02em] mb-2 leading-tight">
              {closingHeadline}
            </h2>

            {/* Scarlet CTA Box */}
            <div className="bg-red-50 border-2 border-red-600 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-700">
                  Konsultasi & Kemitraan Strategis
                </span>
                <span className="font-folio-mono text-[9px] bg-red-600 text-white px-2 py-0.5 font-bold">
                  SLA: &lt; 24 JAM
                </span>
              </div>
              <p className="font-editorial-body text-xs text-slate-700 leading-[1.6]">
                {data.backCover.body ||
                  'Hubungi tim kami untuk konsultasi teknis, kemitraan operasional, dan penugasan proyek konstruksi bertaraf nasional dengan jaminan mutu dan kepatuhan hukum penuh.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Kontak (7 cols) */}
            <div className="col-span-12 sm:col-span-7 border-2 border-slate-900 bg-white p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-slate-900">
                  Direktori Kantor Pusat
                </span>
                <span className="font-folio-mono text-[10px] text-red-600">INDONESIA</span>
              </div>

              <div className="space-y-0.5 text-[11px]">
                <p className="font-bold text-slate-900">{data.contact.headquarters.line1}</p>
                <p className="text-slate-600">{data.contact.headquarters.line2}</p>
                <p className="text-slate-600">{data.contact.headquarters.line3}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">TELEPON:</span>
                  <span className="font-semibold text-slate-900">{data.contact.comms.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">SUREL RESMI:</span>
                  <span className="text-red-600 font-bold">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">SITUS RESMI:</span>
                  <span className="font-semibold text-slate-900">{data.contact.comms.website}</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-500">RESMI TERCATAT</span>
              </div>
            </div>

            {/* Kolom Kanan: QR & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 border-2 border-slate-900 bg-white p-4 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-2 font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-slate-900">
                    Verifikasi Dokumen
                  </span>
                  <span className="font-folio-mono text-[10px] text-red-600">VALIDASI</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border border-slate-900 p-1 bg-white">
                    <SvgQrCode size={56} color="#0f172a" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-slate-700 space-y-0.5">
                    <p className="font-bold text-slate-900 uppercase">Pindai Kode QR</p>
                    <p className="leading-tight text-slate-600">Validasi berkas portofolio tender dan sertifikasi resmi badan usaha LPJK.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-300 space-y-1">
                <div className="text-[10px]">
                  <span className="font-bold text-slate-500 block">JARINGAN CABANG:</span>
                  <span className="font-bold text-slate-900">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] bg-red-100/60 border border-red-300 px-2 py-0.5 flex justify-between text-red-800 font-bold">
                  <span>HASH: 89AF-ACK2026</span>
                  <span>TERVERIFIKASI</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t-2 border-red-600 flex justify-between text-xs text-slate-700 font-medium shrink-0">
            <div>{data.companyName} // Bab 06 // Publikasi Resmi</div>
            <div className="font-folio-mono text-[10px] font-bold text-red-600">HALAMAN 06 / 06</div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 5: SAGE WIREFRAME MINIMALIST
  // -------------------------------------------------------------
  if (themeId === 'sage-wireframe') {
    return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // ARCHITECTURAL MONOGRAPH" regText="SAGE-WIREFRAME // CHAPTER 06" />
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
        {/* SECTION A: HERO ARCHITECTURE SHOT (360px) */}
        <section className="mt-2 mb-3.5 border border-[#d6ddd6] relative shrink-0 bg-[#eef2ee]">
          <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
            <img
              src={photoUrl}
              alt="Headquarters & Strategic Infrastructure"
              className="w-full h-full object-cover object-center grayscale contrast-115"
            />
            
            {/* Minimalist Top Left Corner Overlay */}
            <div className="absolute top-0 left-0 bg-[#1f2621] text-white px-3.5 py-1.5 font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em]">
              HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs border-t border-[#d6ddd6] px-4 py-2 flex items-center justify-between text-xs text-[#2c332e]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#627566]" />
                <span className="font-bold text-[#1f2621]">ASET INFRASTRUKTUR & SENTRA REKAYASA SIPIL</span>
              </div>
              <span className="font-folio-mono text-[10px] text-[#849688] hidden sm:inline">
                LAT: 06°13'44"S // LONG: 106°48'33"E
              </span>
            </div>
          </div>
        </section>

        {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
        <section className="my-2 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 border border-[#627566] bg-[#f4f7f4] flex items-center justify-center font-bold text-[#627566] text-xs">
              ACK
            </div>
            <div>
              <h1 className="font-headline text-lg sm:text-xl font-extrabold uppercase text-[#1f2621] tracking-[-0.02em]">
                {data.companyName}
              </h1>
              <p className="text-xs font-semibold text-[#627566] uppercase">
                {data.tagline}
              </p>
            </div>
          </div>

          <h2 className="font-headline text-sm sm:text-base font-bold text-[#1f2621] uppercase tracking-[-0.01em] mb-2 leading-snug">
            {closingHeadline}
          </h2>

          {/* Sage Accent Box */}
          <div className="border border-[#d6ddd6] bg-white p-3.5 border-l-4 border-l-[#627566]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#627566] uppercase tracking-wider">
                Kemitraan & Penugasan Proyek
              </span>
              <span className="font-folio-mono text-[9px] text-[#849688]">SLA: &lt; 24 JAM</span>
            </div>
            <p className="font-editorial-body text-xs text-[#64748b] leading-[1.6]">
              {data.backCover.body ||
                'Komitmen kami adalah menghadirkan presisi konstruksi yang berkelanjutan, aman, dan berintegritas tinggi dalam mewujudkan kemitraan jangka panjang.'}
            </p>
          </div>
        </section>

        {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
        <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
          {/* Kolom Kiri: Kontak (7 cols) */}
          <div className="col-span-12 sm:col-span-7 border border-[#d6ddd6] bg-white p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#d6ddd6] pb-1.5 font-bold">
              <span className="text-[11px] uppercase tracking-wider text-[#1f2621]">
                Direktori Kantor Pusat
              </span>
              <span className="font-folio-mono text-[10px] text-[#849688]">INDONESIA</span>
            </div>

            <div className="space-y-0.5 text-[11px]">
              <p className="font-semibold text-[#1f2621]">{data.contact.headquarters.line1}</p>
              <p className="text-[#64748b]">{data.contact.headquarters.line2}</p>
              <p className="text-[#64748b]">{data.contact.headquarters.line3}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#d6ddd6] text-[11px]">
              <div>
                <span className="text-[10px] text-[#849688] block">TELEPON:</span>
                <span className="font-semibold text-[#1f2621]">{data.contact.comms.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#849688] block">SUREL:</span>
                <span className="text-[#627566] font-bold">{data.contact.comms.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#d6ddd6] text-[11px]">
              <div>
                <span className="text-[10px] text-[#849688] block">PORTAL RESMI:</span>
                <span className="font-semibold text-[#1f2621]">{data.contact.comms.website}</span>
              </div>
              <span className="font-folio-mono text-[10px] text-[#849688]">KEMENPUPR</span>
            </div>
          </div>

          {/* Kolom Kanan: QR & Cabang (5 cols) */}
          <div className="col-span-12 sm:col-span-5 border border-[#d6ddd6] bg-white p-3.5 flex flex-col justify-between text-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#d6ddd6] pb-1.5 mb-2 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-[#1f2621]">
                  Verifikasi Digital
                </span>
                <span className="font-folio-mono text-[10px] text-[#627566]">KREDENSIAL</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="border border-[#d6ddd6] p-1 bg-white">
                  <SvgQrCode size={56} color="#1f2621" bg="#ffffff" />
                </div>
                <div className="text-[10px] text-[#64748b] space-y-0.5">
                  <p className="font-bold text-[#1f2621] uppercase">Pindai Kode QR</p>
                  <p className="leading-tight">Validasi berkas tender resmi dan lisensi badan usaha di sistem LPJK PUPR.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#d6ddd6] space-y-1">
              <div className="text-[10px]">
                <span className="text-[#849688] font-bold block">JARINGAN CABANG:</span>
                <span className="font-medium text-[#1f2621]">{branchOffices}</span>
              </div>
              <div className="font-folio-mono text-[9px] bg-[#f4f7f4] border border-[#d6ddd6] px-2 py-0.5 flex justify-between text-[#627566]">
                <span>HASH: 89AF-ACK2026</span>
                <span>TERVERIFIKASI</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-3 border-t border-[#d6ddd6] flex justify-between text-xs text-[#849688] shrink-0">
          <div>{data.companyName} // Penutup Monograf // Hak Cipta Dilindungi</div>
          <div className="font-folio-mono text-[10px] text-[#627566]">HALAMAN 06 / 06</div>
        </footer>
      </div>
    </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 6: ROYAL NAVY & TANGERINE SLANT
  // -------------------------------------------------------------
  if (themeId === 'royal-slant') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 border-2 border-[#1e3a8a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // ROYAL SLANT SPEC" regText="ROYAL-SLANT // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        {/* Diagonal Hatched Accent Pattern */}
        <div
          className="absolute top-0 right-0 w-52 h-32 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 1.5px, transparent 1.5px, transparent 8px)',
          }}
        />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT (360px) */}
          <section className="mt-2 mb-3.5 border-2 border-[#1e3a8a] relative shrink-0 bg-slate-900 shadow-md">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
              <img
                src={photoUrl}
                alt="Headquarters & Strategic Infrastructure"
                className="w-full h-full object-cover object-center contrast-110"
              />
              
              {/* Slanted Parallelogram Top Left Badge */}
              <div className="absolute top-0 left-0 bg-[#1e3a8a] text-white px-4 py-1.5 flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 bg-[#ea580c] transform -skew-x-12" />
                <span className="font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                  HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 border-t border-[#ea580c] px-4 py-2 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ea580c] transform -skew-x-12" />
                  <span className="font-bold text-white uppercase">ASET INFRASTRUKTUR & SENTRA REKAYASA NASIONAL</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-300 hidden sm:inline">
                  LAT: 06°13'44"S // LONG: 106°48'33"E
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#1e3a8a] text-white transform -skew-x-12 flex items-center justify-center font-black text-xs">
                <span className="inline-block transform skew-x-12">PT</span>
              </div>
              <div>
                <h1 className="font-headline text-lg sm:text-xl font-black uppercase text-[#1e3a8a] tracking-tight">
                  {data.companyName}
                </h1>
                <p className="text-xs font-bold text-[#ea580c] uppercase">
                  {data.tagline}
                </p>
              </div>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-2 leading-snug">
              {closingHeadline}
            </h2>

            {/* Slanted Accent Box */}
            <div className="border-2 border-[#1e3a8a] bg-white p-3.5 border-l-4 border-l-[#ea580c] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">
                  Kemitraan Strategis & Penugasan EPC
                </span>
                <span className="font-folio-mono text-[9px] text-[#ea580c] font-bold">RESPONS RESMI &lt; 24 JAM</span>
              </div>
              <p className="font-editorial-body text-xs text-slate-700 leading-[1.6]">
                {data.backCover.body ||
                  'Komitmen kami adalah menghadirkan presisi konstruksi yang berkelanjutan, aman, dan berintegritas tinggi dalam mewujudkan kemitraan jangka panjang.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Kontak (7 cols) */}
            <div className="col-span-12 sm:col-span-7 border-2 border-[#1e3a8a] bg-white p-3.5 space-y-2 text-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-[#1e3a8a]">
                  Direktori Kantor Pusat
                </span>
                <span className="font-folio-mono text-[10px] text-[#ea580c]">INDONESIA</span>
              </div>

              <div className="space-y-0.5 text-[11px]">
                <p className="font-bold text-slate-900">{data.contact.headquarters.line1}</p>
                <p className="text-slate-600">{data.contact.headquarters.line2}</p>
                <p className="text-slate-600">{data.contact.headquarters.line3}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500 block">TELEPON RESMI:</span>
                  <span className="font-bold text-[#1e3a8a]">{data.contact.comms.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SUREL TENDER:</span>
                  <span className="text-[#ea580c] font-bold">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500 block">PORTAL RESMI:</span>
                  <span className="font-bold text-[#1e3a8a]">{data.contact.comms.website}</span>
                </div>
                <span className="font-folio-mono text-[10px] text-slate-400">OSS-RBA</span>
              </div>
            </div>

            {/* Kolom Kanan: QR & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 border-2 border-slate-300 bg-white p-3.5 flex flex-col justify-between text-xs shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2 font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-[#1e3a8a]">
                    Verifikasi Digital
                  </span>
                  <span className="font-folio-mono text-[10px] text-[#ea580c]">TERDAFTAR</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border-2 border-[#1e3a8a] p-1 bg-white">
                    <SvgQrCode size={56} color="#1e3a8a" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-slate-600 space-y-0.5">
                    <p className="font-bold text-[#1e3a8a] uppercase">Pindai Kode QR</p>
                    <p className="leading-tight">Validasi berkas tender resmi dan lisensi badan usaha di sistem LPJK PUPR.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <div className="text-[10px]">
                  <span className="text-slate-500 font-bold block">JARINGAN CABANG:</span>
                  <span className="font-semibold text-slate-900">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] bg-slate-100 border border-slate-300 px-2 py-0.5 flex justify-between text-[#1e3a8a]">
                  <span>HASH: 89AF-ACK2026</span>
                  <span className="font-bold text-[#ea580c]">TERVERIFIKASI</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t border-slate-300 flex justify-between text-xs text-slate-500 shrink-0">
            <div>{data.companyName} // Penutup Monograf // Hak Cipta Dilindungi</div>
            <div className="font-folio-mono text-[10px] text-[#ea580c] font-bold">HALAMAN 06 / 06</div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 7: HEXAGON APEX & CHARCOAL
  // -------------------------------------------------------------
  if (themeId === 'hexagon-charcoal') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fbfbfb] text-[#18181b] border-2 border-[#18181b] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
        <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // HEXAGON APEX SPEC" regText="HEXAGON-CHARCOAL // CHAPTER 06" />
        <GridOverlay active={showGrid} />

        {/* Hexagon Angle Accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 bg-[#18181b] pointer-events-none z-0"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
          {/* SECTION A: HERO ARCHITECTURE SHOT */}
          <section className="mt-2 mb-3.5 border-2 border-[#18181b] relative shrink-0 bg-zinc-900 shadow-md">
            <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
              <img
                src={photoUrl}
                alt="Headquarters & Strategic Infrastructure"
                className="w-full h-full object-cover object-center grayscale contrast-125"
              />
              
              {/* Minimalist Top Left Corner Overlay */}
              <div className="absolute top-0 left-0 bg-[#18181b] text-white px-3.5 py-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
                <span className="font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                  HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-[#18181b]/95 border-t border-[#f97316] px-4 py-2 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
                  <span className="font-bold text-white uppercase">ASET INFRASTRUKTUR & SENTRA REKAYASA NASIONAL</span>
                </div>
                <span className="font-folio-mono text-[10px] text-zinc-400 hidden sm:inline">
                  LAT: 06°13'44"S // LONG: 106°48'33"E
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
          <section className="my-2 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 bg-[#18181b] text-[#f97316] flex items-center justify-center font-bold text-xs"
                style={{ clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)' }}
              >
                ACK
              </div>
              <div>
                <h1 className="font-headline text-lg sm:text-xl font-black uppercase text-[#18181b] tracking-tight">
                  {data.companyName}
                </h1>
                <p className="text-xs font-bold text-[#f97316] uppercase">
                  {data.tagline}
                </p>
              </div>
            </div>

            <h2 className="font-headline text-sm sm:text-base font-black text-[#18181b] uppercase tracking-tight mb-2 leading-snug">
              {closingHeadline}
            </h2>

            {/* Hexagon Charcoal Accent Box */}
            <div className="border-2 border-[#18181b] bg-white p-3.5 border-l-4 border-l-[#f97316] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#18181b] uppercase tracking-wider">
                  Kemitraan Strategis & Penugasan EPC
                </span>
                <span className="font-folio-mono text-[9px] text-[#f97316] font-bold">RESPONS RESMI &lt; 24 JAM</span>
              </div>
              <p className="font-editorial-body text-xs text-zinc-700 leading-[1.6]">
                {data.backCover.body ||
                  'Komitmen kami adalah menghadirkan presisi konstruksi yang berkelanjutan, aman, dan berintegritas tinggi dalam mewujudkan kemitraan jangka panjang.'}
              </p>
            </div>
          </section>

          {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
          <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
            {/* Kolom Kiri: Kontak (7 cols) */}
            <div className="col-span-12 sm:col-span-7 border-2 border-[#18181b] bg-white p-3.5 space-y-2 text-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-[#18181b]">
                  Direktori Kantor Pusat
                </span>
                <span className="font-folio-mono text-[10px] text-[#f97316]">INDONESIA</span>
              </div>

              <div className="space-y-0.5 text-[11px]">
                <p className="font-bold text-[#18181b]">{data.contact.headquarters.line1}</p>
                <p className="text-zinc-600">{data.contact.headquarters.line2}</p>
                <p className="text-zinc-600">{data.contact.headquarters.line3}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-200 text-[11px]">
                <div>
                  <span className="text-[10px] text-zinc-500 block">TELEPON RESMI:</span>
                  <span className="font-bold text-[#18181b]">{data.contact.comms.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">SUREL TENDER:</span>
                  <span className="text-[#f97316] font-bold">{data.contact.comms.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-200 text-[11px]">
                <div>
                  <span className="text-[10px] text-zinc-500 block">PORTAL RESMI:</span>
                  <span className="font-bold text-[#18181b]">{data.contact.comms.website}</span>
                </div>
                <span className="font-folio-mono text-[10px] text-zinc-400">OSS-RBA</span>
              </div>
            </div>

            {/* Kolom Kanan: QR & Cabang (5 cols) */}
            <div className="col-span-12 sm:col-span-5 border-2 border-zinc-300 bg-white p-3.5 flex flex-col justify-between text-xs shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-2 font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-[#18181b]">
                    Verifikasi Digital
                  </span>
                  <span className="font-folio-mono text-[10px] text-[#f97316]">TERDAFTAR</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border-2 border-[#18181b] p-1 bg-white">
                    <SvgQrCode size={56} color="#18181b" bg="#ffffff" />
                  </div>
                  <div className="text-[10px] text-zinc-600 space-y-0.5">
                    <p className="font-bold text-[#18181b] uppercase">Pindai Kode QR</p>
                    <p className="leading-tight">Validasi berkas tender resmi dan lisensi badan usaha di sistem LPJK PUPR.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 space-y-1">
                <div className="text-[10px]">
                  <span className="text-zinc-500 font-bold block">JARINGAN CABANG:</span>
                  <span className="font-semibold text-zinc-900">{branchOffices}</span>
                </div>
                <div className="font-folio-mono text-[9px] bg-zinc-100 border border-zinc-300 px-2 py-0.5 flex justify-between text-[#18181b]">
                  <span>HASH: 89AF-ACK2026</span>
                  <span className="font-bold text-[#f97316]">TERVERIFIKASI</span>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-3 border-t border-zinc-300 flex justify-between text-xs text-zinc-500 shrink-0">
            <div>{data.companyName} // Penutup Monograf // Hak Cipta Dilindungi</div>
            <div className="font-folio-mono text-[10px] text-[#f97316] font-bold">HALAMAN 06 / 06</div>
          </footer>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // THEME 8: COBALT DIAGONAL SLASH (Default fallback)
  // -------------------------------------------------------------
  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <CropMarks sheetId="06" bleedText="+ 210 × 297 MM // COBALT SLASH SPEC" regText="COBALT-SLASH // CHAPTER 06" />
      <GridOverlay active={showGrid} />

      {/* Dynamic Cobalt Slash Ribbon */}
      <div
        className="absolute top-0 right-0 w-64 h-24 bg-[#2563eb] opacity-10 pointer-events-none z-0"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="p-8 sm:p-10 flex flex-col justify-between relative z-10 min-h-[1123px] h-full box-border">
        {/* SECTION A: HERO ARCHITECTURE SHOT WITH COBALT SLASH */}
        <section className="mt-2 mb-3.5 border-2 border-[#0f172a] relative shrink-0 bg-[#0f172a] shadow-md">
          <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden">
            <img
              src={photoUrl}
              alt="Headquarters & Strategic Infrastructure"
              className="w-full h-full object-cover object-center contrast-110"
            />
            
            {/* Minimalist Top Left Corner Overlay */}
            <div className="absolute top-0 left-0 bg-[#0f172a] text-white px-3.5 py-1.5 flex items-center gap-2 border-r border-b border-slate-700">
              <span className="w-2 h-1.5 bg-[#2563eb]" />
              <span className="font-folio-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                HEADQUARTERS & STRATEGIC ASSETS // JAKARTA
              </span>
            </div>

            {/* Bottom Caption Overlay with Cobalt Slash */}
            <div className="absolute bottom-0 inset-x-0 bg-[#0f172a]/95 border-t border-[#2563eb] px-4 py-2 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-1.5 bg-[#2563eb]" />
                <span className="font-bold text-white uppercase">ASET INFRASTRUKTUR & SENTRA REKAYASA NASIONAL</span>
              </div>
              <span className="font-folio-mono text-[10px] text-sky-200 hidden sm:inline">
                LAT: 06°13'44"S // LONG: 106°48'33"E
              </span>
            </div>
          </div>
        </section>

        {/* SECTION B: CLOSING STATEMENT & IDENTITY */}
        <section className="my-2 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#0f172a] text-[#2563eb] border border-[#2563eb] flex items-center justify-center font-black text-xs">
              PT
            </div>
            <div>
              <h1 className="font-headline text-lg sm:text-xl font-black uppercase text-[#0f172a] tracking-tight">
                {data.companyName}
              </h1>
              <p className="text-xs font-bold text-[#2563eb] uppercase">
                {data.tagline}
              </p>
            </div>
          </div>

          <h2 className="font-headline text-sm sm:text-base font-black text-[#0f172a] uppercase tracking-tight mb-2 leading-snug">
            {closingHeadline}
          </h2>

          {/* Cobalt Accent Box */}
          <div className="border-2 border-[#0f172a] bg-white p-3.5 border-l-4 border-l-[#2563eb] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                Kemitraan Strategis & Penugasan EPC
              </span>
              <span className="font-folio-mono text-[9px] text-[#2563eb] font-bold">RESPONS RESMI &lt; 24 JAM</span>
            </div>
            <p className="font-editorial-body text-xs text-slate-700 leading-[1.6]">
              {data.backCover.body ||
                'Komitmen kami adalah menghadirkan presisi konstruksi yang berkelanjutan, aman, dan berintegritas tinggi dalam mewujudkan kemitraan jangka panjang.'}
            </p>
          </div>
        </section>

        {/* SECTION C: CORPORATE DIRECTORY & VERIFIKASI 2-KOLOM */}
        <section className="my-2.5 grid grid-cols-12 gap-3.5 shrink-0">
          {/* Kolom Kiri: Kontak (7 cols) */}
          <div className="col-span-12 sm:col-span-7 border-2 border-[#0f172a] bg-white p-3.5 space-y-2 text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-bold">
              <span className="text-[11px] uppercase tracking-wider text-[#0f172a]">
                Direktori Kantor Pusat
              </span>
              <span className="font-folio-mono text-[10px] text-[#2563eb]">INDONESIA</span>
            </div>

            <div className="space-y-0.5 text-[11px]">
              <p className="font-bold text-[#0f172a]">{data.contact.headquarters.line1}</p>
              <p className="text-slate-600">{data.contact.headquarters.line2}</p>
              <p className="text-slate-600">{data.contact.headquarters.line3}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
              <div>
                <span className="text-[10px] text-slate-500 block">TELEPON RESMI:</span>
                <span className="font-bold text-[#0f172a]">{data.contact.comms.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">SUREL TENDER:</span>
                <span className="text-[#2563eb] font-bold">{data.contact.comms.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
              <div>
                <span className="text-[10px] text-slate-500 block">PORTAL RESMI:</span>
                <span className="font-bold text-[#0f172a]">{data.contact.comms.website}</span>
              </div>
              <span className="font-folio-mono text-[10px] text-slate-400">OSS-RBA</span>
            </div>
          </div>

          {/* Kolom Kanan: QR & Cabang (5 cols) */}
          <div className="col-span-12 sm:col-span-5 border-2 border-slate-300 bg-white p-3.5 flex flex-col justify-between text-xs shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2 font-bold">
                <span className="text-[11px] uppercase tracking-wider text-[#0f172a]">
                  Verifikasi Digital
                </span>
                <span className="font-folio-mono text-[10px] text-[#2563eb]">TERDAFTAR</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="border-2 border-[#0f172a] p-1 bg-white">
                  <SvgQrCode size={56} color="#0f172a" bg="#ffffff" />
                </div>
                <div className="text-[10px] text-slate-600 space-y-0.5">
                  <p className="font-bold text-[#0f172a] uppercase">Pindai Kode QR</p>
                  <p className="leading-tight">Validasi berkas tender resmi dan lisensi badan usaha di sistem LPJK PUPR.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px]">
                <span className="text-slate-500 font-bold block">JARINGAN CABANG:</span>
                <span className="font-semibold text-slate-900">{branchOffices}</span>
              </div>
              <div className="font-folio-mono text-[9px] bg-slate-100 border border-slate-300 px-2 py-0.5 flex justify-between text-[#0f172a]">
                <span>HASH: 89AF-ACK2026</span>
                <span className="font-bold text-[#2563eb]">TERVERIFIKASI</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-3 border-t border-slate-300 flex justify-between text-xs text-slate-500 shrink-0">
          <div>{data.companyName} // Penutup Monograf // Hak Cipta Dilindungi</div>
          <div className="font-folio-mono text-[10px] text-[#2563eb] font-bold">HALAMAN 06 / 06</div>
        </footer>
      </div>
    </article>
  );
};
