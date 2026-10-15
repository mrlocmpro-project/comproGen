import React from 'react';
import { CompanyProfileData, TogglesState, ThemeId } from '../../types/monograph';
import { CropMarks, GridOverlay } from '../common/CropMarks';

interface Spread04LegalProps {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

// 4 Akreditasi & Badge Sertifikasi Sistem Manajemen Utama
const accreditationBadges = [
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    title: 'Sistem Manajemen Mutu Konstruksi',
    regNo: 'REG-QMS-9001-2024-ID',
    auditor: 'KAN & TÜV Rheinland',
    scope: 'Presisi fabrikasi struktur & inspeksi bertingkat mutu sipil',
    tag: 'VERIFIED QMS',
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001:2015',
    title: 'Manajemen Lingkungan Hidup & AMDAL',
    regNo: 'REG-EMS-14001-2023-ID',
    auditor: 'KAN & Sucofindo International',
    scope: 'Sirkularitas material, Greenship, & reduksi jejak karbon',
    tag: 'VERIFIED EMS',
  },
  {
    id: 'iso-45001',
    code: 'ISO 45001:2018 / SMK3',
    title: 'Keselamatan & Kesehatan Kerja (K3)',
    regNo: 'REG-OHS-45001-2024-ID',
    auditor: 'Kemenaker RI & Bureau Veritas',
    scope: 'Protokol nihil kecelakaan kerja (>12.4 juta jam kerja aman)',
    tag: 'VERIFIED OHS',
  },
  {
    id: 'tier-1',
    code: 'TIER-1 CONTRACTOR',
    title: 'Kualifikasi Usaha Besar LPJK PUPR',
    regNo: 'SBU-JK-01-928472-2025',
    auditor: 'Lembaga LPJK & BP2JK PUPR RI',
    scope: 'Lisensi penuh gedung tinggi, industrial, & infrastruktur',
    tag: 'LPJK ACCREDITED',
  },
];

// Pernyataan Resmi Komitmen Tata Kelola & Integritas Statuter
const statutoryComplianceManifesto =
  'Seluruh kegiatan operasional, perizinan berusaha berbasis risiko (OSS-RBA), dan sertifikasi badan usaha PT senantiasa diaudit secara berkala untuk menjamin transparansi, tata kelola korporasi yang baik (GCG), dan kepatuhan hukum tanpa kompromi.';

export const Spread04Legal: React.FC<Spread04LegalProps> = ({
  data,
  toggles,
  showGrid,
  themeId = 'tech-navy',
}) => {
  if (!toggles.showLegal) {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white border border-zinc-200 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center">
        <p className="font-headline text-base font-bold text-[#1c1917] tracking-[-0.02em]">
          BAB 04 // BAGIAN LEGALITAS DINONAKTIFKAN
        </p>
        <p className="font-editorial-body text-xs mt-2 leading-[1.6]">
          Gunakan Smart Toggle di Left Editor Panel untuk mengaktifkan kembali lembar legalitas.
        </p>
      </article>
    );
  }

  // ==========================================
  // THEME 1: TECH NAVY
  // ==========================================
  if (themeId === 'tech-navy') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // EDITORIAL DOSSIER" regText="TECH-NAVY // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-800 pb-2.5 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="mb-4 border-b border-slate-800 pb-3 shrink-0">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
            Bab 04 // Landasan Hukum & Kualifikasi Resmi
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em]">
            Legalitas Korporasi & Kepatuhan Statuter
          </h1>
        </section>

        {/* Main Vertical Content Flow - Zero Awkward Whitespace */}
        <div className="flex-1 flex flex-col justify-between gap-3.5">
          {/* A. Register Perizinan Berusaha Table */}
          <div className="border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                Register Perizinan Berusaha & Sertifikat Standar
              </span>
              <span className="text-[11px] text-emerald-400 font-folio-mono font-medium">Klasifikasi Risiko: Tinggi</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-2 px-2.5">Klasifikasi Dokumen</th>
                    <th className="py-2 px-2.5">Nomor Registrasi</th>
                    <th className="py-2 px-2.5">Penerbit</th>
                    <th className="py-2 px-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2 px-2.5 font-semibold text-white">{lic.name}</td>
                      <td className="py-2 px-2.5 font-medium text-slate-200">{lic.regNo}</td>
                      <td className="py-2 px-2.5 text-slate-400">{lic.issuer}</td>
                      <td className="py-2 px-2.5 text-right">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Grid Akreditasi & Badge Sertifikasi Sistem Manajemen (4 Kotak) */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 inline-block"></span>
                Akreditasi & Badge Sertifikasi Sistem Manajemen
              </span>
              <span className="font-folio-mono text-[9px] text-emerald-400 uppercase tracking-widest font-semibold">
                AUDIT BERKALA TANPA TEMUAN MAYOR
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-slate-900/80 border border-slate-800 p-2.5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/70 font-folio-mono text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {badge.tag}
                      </span>
                    </div>
                    <h4 className="font-headline text-[11px] font-bold text-white uppercase tracking-[-0.01em] leading-tight mb-1">
                      {badge.code}
                    </h4>
                    <p className="font-editorial-body text-[10px] text-slate-300 leading-[1.4] mb-1">
                      {badge.title}
                    </p>
                    <p className="font-editorial-body text-[9.5px] text-[#94a3b8] leading-[1.35]">
                      {badge.scope}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 mt-2 font-folio-mono text-[8.5px] text-slate-400 space-y-0.5">
                    <div className="truncate"><span className="text-slate-500">REG:</span> {badge.regNo}</div>
                    <div className="truncate text-emerald-300/80"><span className="text-slate-500">AUDIT:</span> {badge.auditor}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Blok Pernyataan Komitmen Tata Kelola & Integritas Statuter (Manifesto) */}
          <section className="bg-emerald-950/20 border border-emerald-900/40 border-l-4 border-l-emerald-400 p-3.5 relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Komitmen Tata Kelola & Integritas Statuter (Statutory Compliance Manifesto)
              </span>
              <span className="font-folio-mono text-[9px] text-slate-400 uppercase tracking-widest">
                DOC.REF // GCG-STATUTORY
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-slate-200 leading-[1.6] italic font-medium">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase">Komite Audit & Kepatuhan Statuter</span>
                <span>//</span>
                <span>Dewan Direksi & Komisaris</span>
              </div>
              <div className="font-folio-mono text-emerald-400 text-[9px] font-semibold">
                TERVERIFIKASI SISTEM KEPATUHAN TERPADU
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            <div className="p-3 bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-0.5">
                Akreditasi Jasa Konstruksi
              </span>
              <h4 className="font-headline text-xs font-bold text-white uppercase mb-1">
                Lembaga Pengembangan Jasa Konstruksi (LPJK)
              </h4>
              <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">
                Memiliki Sertifikat Badan Usaha (SBU) Kualifikasi Besar (B1) dengan subklasifikasi Bangunan Gedung Komersial dan Industri Berat.
              </p>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-0.5">
                Sistem Manajemen Mutu
              </span>
              <h4 className="font-headline text-xs font-bold text-white uppercase mb-1">
                ISO 9001:2015 // ISO 14001 // ISO 45001
              </h4>
              <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">
                Tersertifikasi oleh badan akreditasi internasional terdaftar KAN dengan audit berkala tanpa temuan mayor (Zero Major Non-Conformity).
              </p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-emerald-400">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 2: SWISS EDITORIAL & TANGERINE
  // ==========================================
  if (themeId === 'swiss-tangerine') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // SWISS STRICT GRID" regText="SWISS-TANGERINE // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-zinc-200 pb-2.5 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0">
          <span className="font-bold text-black">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="border-b-2 border-black pb-3 mb-4 shrink-0">
          <span className="text-xs font-bold text-[#ff5722] uppercase tracking-wider block mb-1">
            Kepatuhan & Integritas Hukum
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-[-0.02em] leading-tight">
            Legalitas Korporasi & Izin Usaha<span className="text-[#ff5722]">.</span>
          </h1>
        </section>

        {/* Main Vertical Content Flow */}
        <div className="flex-1 flex flex-col justify-between gap-3.5">
          {/* A. Swiss Table */}
          <div className="border-2 border-black bg-white">
            <div className="bg-black text-white px-3 py-1.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>Tabel Perizinan Berusaha & Sertifikat Resmi</span>
              <span className="text-[#ff5722]">Akreditasi Penuh</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y-2 divide-black">
                <thead className="bg-zinc-100 font-bold uppercase text-black text-[11px]">
                  <tr>
                    <th className="py-2 px-3">Nama Izin / Dokumen</th>
                    <th className="py-2 px-3">Nomor Registrasi</th>
                    <th className="py-2 px-3">Instansi</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-zinc-50">
                      <td className="py-2 px-3 font-bold text-black">{lic.name}</td>
                      <td className="py-2 px-3 font-semibold text-zinc-800">{lic.regNo}</td>
                      <td className="py-2 px-3 text-zinc-600">{lic.issuer}</td>
                      <td className="py-2 px-3 text-right">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Grid Akreditasi & Badge Sertifikasi (4 Kotak) */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#ff5722] inline-block"></span>
                Akreditasi & Badge Sertifikasi Sistem Manajemen
              </span>
              <span className="font-folio-mono text-[9px] text-black uppercase tracking-widest font-bold">
                AUDIT BERKALA TERVERIFIKASI
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="border-2 border-black bg-white p-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="bg-[#ff5722] text-white font-folio-mono text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {badge.tag}
                      </span>
                    </div>
                    <h4 className="font-headline text-[11px] font-black text-black uppercase tracking-[-0.01em] leading-tight mb-1">
                      {badge.code}
                    </h4>
                    <p className="font-editorial-body text-[10px] text-zinc-900 font-semibold leading-[1.35] mb-1">
                      {badge.title}
                    </p>
                    <p className="font-editorial-body text-[9.5px] text-[#64748b] leading-[1.35]">
                      {badge.scope}
                    </p>
                  </div>
                  <div className="pt-2 border-t-2 border-black mt-2 font-folio-mono text-[8.5px] text-zinc-800 space-y-0.5 font-bold">
                    <div className="truncate"><span className="text-zinc-500 font-medium">REG:</span> {badge.regNo}</div>
                    <div className="truncate text-black"><span className="text-zinc-500 font-medium">AUDIT:</span> {badge.auditor}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Statutory Compliance Manifesto */}
          <section className="bg-zinc-50 border-2 border-black border-l-[6px] border-l-[#ff5722] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-headline text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Komitmen Tata Kelola & Integritas Statuter (Statutory Compliance Manifesto)
              </span>
              <span className="font-folio-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                GCG INTEGRITY
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-black leading-[1.6] font-semibold italic">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t-2 border-black flex flex-wrap items-center justify-between text-[10px] text-zinc-800">
              <div className="flex items-center gap-2 font-bold uppercase">
                <span>Dewan Direksi & Komisaris</span>
                <span className="text-[#ff5722]">●</span>
                <span>Komite Audit GCG</span>
              </div>
              <div className="font-folio-mono text-black text-[9px] font-bold uppercase">
                OSS-RBA TERVERIFIKASI RESMI
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-2 border-black p-3 bg-zinc-50 shrink-0">
            <div>
              <h4 className="font-headline text-xs font-black uppercase text-black mb-1">
                Standarisasi LPJK & Sertifikat Badan Usaha (SBU)
              </h4>
              <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">
                Kualifikasi Utama Konstruksi B1 dengan rekam jejak penyelesaian proyek bangunan gedung tingkat tinggi nasional.
              </p>
            </div>
            <div>
              <h4 className="font-headline text-xs font-black uppercase text-black mb-1">
                Sistem Manajemen Terintegrasi
              </h4>
              <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">
                Implementasi ISO 9001, ISO 14001, dan ISO 45001 yang terintegrasi penuh dalam seluruh siklus rekayasa lapangan.
              </p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-black">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 3: CYBER DARK & CRIMSON
  // ==========================================
  if (themeId === 'cyber-crimson') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // DARK EDITORIAL" regText="CYBER-CRIMSON // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        <div className="font-headline absolute top-4 right-8 text-[100px] font-extrabold text-[#ff2d55]/10 leading-none select-none pointer-events-none z-0">
          04
        </div>

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-slate-800 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 relative z-10 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="mb-4 relative z-10 border-b border-slate-800 pb-3 shrink-0">
          <span className="text-xs text-[#ff2d55] uppercase font-bold tracking-wider block mb-1">
            Bab 04 // Kepatuhan Hukum & Dokumen Resmi
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em] leading-tight">
            Legalitas Korporasi & Sertifikasi Standar
          </h1>
        </section>

        {/* Main Vertical Content Flow */}
        <div className="flex-1 flex flex-col justify-between gap-3.5 relative z-10">
          {/* A. Dark Table */}
          <div className="border border-slate-800 bg-slate-900/60 p-3.5">
            <div className="flex justify-between items-center pb-2 mb-2.5 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ff2d55] inline-block"></span>
                Register Izin Berusaha & Sertifikasi Standar
              </span>
              <span className="text-xs text-[#ff2d55] font-folio-mono font-semibold">Tersertifikasi Penuh</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-2 px-2.5">Jenis Dokumen</th>
                    <th className="py-2 px-2.5">Nomor Registrasi</th>
                    <th className="py-2 px-2.5">Penerbit</th>
                    <th className="py-2 px-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-slate-800/40">
                      <td className="py-2 px-2.5 font-semibold text-white">{lic.name}</td>
                      <td className="py-2 px-2.5 font-medium text-slate-200">{lic.regNo}</td>
                      <td className="py-2 px-2.5 text-slate-400">{lic.issuer}</td>
                      <td className="py-2 px-2.5 text-right">
                        <span className="text-[#ff2d55] border border-[#ff2d55]/40 bg-[#ff2d55]/10 px-2 py-0.5 text-[10px] font-bold">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Grid Akreditasi & Badge Sertifikasi (4 Kotak) */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#ff2d55] inline-block"></span>
                Akreditasi & Badge Sertifikasi Sistem Manajemen
              </span>
              <span className="font-folio-mono text-[9px] text-[#ff2d55] uppercase tracking-widest font-semibold">
                AUDIT BERKALA TERAKREDITASI
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-slate-900/80 border border-slate-800 p-2.5 flex flex-col justify-between hover:border-[#ff2d55]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="bg-[#ff2d55]/15 text-[#ff2d55] border border-[#ff2d55]/40 font-folio-mono text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 text-[#ff2d55]" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {badge.tag}
                      </span>
                    </div>
                    <h4 className="font-headline text-[11px] font-bold text-white uppercase tracking-[-0.01em] leading-tight mb-1">
                      {badge.code}
                    </h4>
                    <p className="font-editorial-body text-[10px] text-slate-300 leading-[1.35] mb-1">
                      {badge.title}
                    </p>
                    <p className="font-editorial-body text-[9.5px] text-[#94a3b8] leading-[1.35]">
                      {badge.scope}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 mt-2 font-folio-mono text-[8.5px] text-slate-400 space-y-0.5">
                    <div className="truncate"><span className="text-slate-500">REG:</span> {badge.regNo}</div>
                    <div className="truncate text-slate-300"><span className="text-slate-500">AUDIT:</span> {badge.auditor}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Statutory Compliance Manifesto */}
          <section className="bg-slate-900/80 border border-slate-800 border-l-4 border-l-[#ff2d55] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#ff2d55] flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#ff2d55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Komitmen Tata Kelola & Integritas Statuter (Statutory Compliance Manifesto)
              </span>
              <span className="font-folio-mono text-[9px] text-slate-400 uppercase tracking-widest">
                DOC.REF // GCG-CRIMSON
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-slate-200 leading-[1.6] italic font-medium">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase">Dewan Direksi & Komisaris</span>
                <span>//</span>
                <span>Komite Audit Independen</span>
              </div>
              <div className="font-folio-mono text-[#ff2d55] text-[9px] font-semibold">
                AUDIT BERKALA TERAKREDITASI
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            <div className="p-3 bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-[#ff2d55] font-bold uppercase block mb-0.5">Standarisasi Industri</span>
              <h4 className="font-headline text-xs font-bold text-white uppercase mb-1">Sertifikat Badan Usaha B1</h4>
              <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">Klasifikasi utama bangunan gedung komersial dan prasarana transportasi terdaftar LPJK.</p>
            </div>
            <div className="p-3 bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-[#ff2d55] font-bold uppercase block mb-0.5">Audit Statuter</span>
              <h4 className="font-headline text-xs font-bold text-white uppercase mb-1">ISO Terintegrasi KAN</h4>
              <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">Penerapan manajemen kepatuhan statuter dengan audit tahunan tanpa temuan mayor.</p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ff2d55]">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 4: BOLD SCARLET CIRCLE
  // ==========================================
  if (themeId === 'scarlet-circle') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // SCARLET EDITORIAL" regText="SCARLET-CIRCLE // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-200 pb-2.5 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0">
          <span className="font-bold text-slate-900">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="border-b-2 border-red-600 pb-3 mb-4 shrink-0">
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-slate-950 tracking-[-0.02em] leading-tight">
            Legalitas Resmi & Standar Mutu Industri
          </h1>
        </section>

        {/* Main Vertical Content Flow */}
        <div className="flex-1 flex flex-col justify-between gap-3.5">
          {/* A. Scarlet Table */}
          <div className="bg-white border-2 border-slate-900 shadow-xs">
            <div className="bg-red-600 text-white px-3 py-1.5 font-bold text-xs uppercase flex justify-between">
              <span>Daftar Izin & Lisensi Berusaha Resmi</span>
              <span>Terverifikasi LPJK</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 font-bold uppercase text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2 px-3">Nama Izin</th>
                    <th className="py-2 px-3">Nomor Induk</th>
                    <th className="py-2 px-3">Instansi</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-900">{lic.name}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{lic.regNo}</td>
                      <td className="py-2 px-3 text-slate-600">{lic.issuer}</td>
                      <td className="py-2 px-3 text-right">
                        <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Grid Akreditasi & Badge Sertifikasi (4 Kotak) */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-600 inline-block"></span>
                Akreditasi & Badge Sertifikasi Sistem Manajemen
              </span>
              <span className="font-folio-mono text-[9px] text-red-600 uppercase tracking-widest font-bold">
                AUDIT BERKALA TERAKREDITASI
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="border-2 border-slate-900 bg-white p-2.5 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="bg-red-600 text-white font-folio-mono text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {badge.tag}
                      </span>
                    </div>
                    <h4 className="font-headline text-[11px] font-bold text-slate-950 uppercase tracking-[-0.01em] leading-tight mb-1">
                      {badge.code}
                    </h4>
                    <p className="font-editorial-body text-[10px] text-slate-800 font-semibold leading-[1.35] mb-1">
                      {badge.title}
                    </p>
                    <p className="font-editorial-body text-[9.5px] text-[#64748b] leading-[1.35]">
                      {badge.scope}
                    </p>
                  </div>
                  <div className="pt-2 border-t-2 border-slate-900 mt-2 font-folio-mono text-[8.5px] text-slate-700 space-y-0.5">
                    <div className="truncate"><span className="text-slate-500 font-medium">REG:</span> {badge.regNo}</div>
                    <div className="truncate text-red-700 font-semibold"><span className="text-slate-500 font-medium">AUDIT:</span> {badge.auditor}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Statutory Compliance Manifesto */}
          <section className="bg-red-50/70 border-2 border-slate-900 border-l-[6px] border-l-red-600 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-red-700 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Komitmen Tata Kelola & Integritas Statuter (Statutory Compliance Manifesto)
              </span>
              <span className="font-folio-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                STATUTORY COMPLIANCE
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-slate-900 leading-[1.6] font-semibold italic">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t-2 border-slate-900 flex flex-wrap items-center justify-between text-[10px] text-slate-700">
              <div className="flex items-center gap-2 font-bold uppercase">
                <span>Dewan Direksi & Komisaris</span>
                <span className="text-red-600">●</span>
                <span>Komite Audit Internal GCG</span>
              </div>
              <div className="font-folio-mono text-red-700 text-[9px] font-bold uppercase">
                TERVERIFIKASI OSS-RBA & PUPR
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-2 border-slate-900 bg-white p-3 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase block mb-0.5">Kualifikasi Utama</span>
              <h4 className="font-headline text-xs font-bold text-slate-900 uppercase mb-1">Sertifikasi Badan Usaha B1</h4>
              <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">Pemberian lisensi operasional penuh untuk pelaksanaan konstruksi berskala besar di Indonesia.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase block mb-0.5">Manajemen Mutu</span>
              <h4 className="font-headline text-xs font-bold text-slate-900 uppercase mb-1">ISO 9001 / 14001 / 45001</h4>
              <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">Pengendalian kualitas, keselamatan kerja K3, dan kepatuhan lingkungan yang diaudit berkala.</p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-red-600">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 5: SAGE WIREFRAME MINIMALIST
  // ==========================================
  if (themeId === 'sage-wireframe') {
    return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // ARCHITECTURAL MONOGRAPH" regText="SAGE-WIREFRAME // CHAPTER 04" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-[#d6ddd6] mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-[#849688] shrink-0">
        <span className="font-bold text-[#1f2621]">{data.companyName}</span>
        <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
      </header>

      {/* 2. Chapter Title */}
      <section className="mb-4 pb-3 border-b border-[#d6ddd6] shrink-0">
        <span className="text-xs font-bold text-[#627566] uppercase tracking-wider block mb-1">
          Bab 04 // Register Perizinan & Kepatuhan Statuter
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-[#1f2621] tracking-[-0.02em] leading-tight">
          Legalitas Korporasi & Akreditasi Resmi
        </h1>
      </section>

      {/* Main Vertical Content Flow */}
      <div className="flex-1 flex flex-col justify-between gap-3.5">
        {/* A. Sage Table */}
        <div className="bg-white border border-[#d6ddd6] shadow-xs">
          <div className="px-3.5 py-1.5 border-b border-[#d6ddd6] flex justify-between items-center text-xs text-[#627566] font-bold uppercase">
            <span>Tabel Kepatuhan Hukum & Izin Berusaha</span>
            <span>Terverifikasi OSS-RBA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-[#d6ddd6]">
              <thead className="bg-[#fcfbf8] font-bold uppercase text-[#627566] text-[11px]">
                <tr>
                  <th className="py-2 px-3">Nama Dokumen</th>
                  <th className="py-2 px-3">Nomor Registrasi</th>
                  <th className="py-2 px-3">Penerbit</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data.legal.licenses.map((lic) => (
                  <tr key={lic.id} className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-bold text-[#1f2621]">{lic.name}</td>
                    <td className="py-2 px-3 font-medium text-[#2c332e]">{lic.regNo}</td>
                    <td className="py-2 px-3 text-[#64748b]">{lic.issuer}</td>
                    <td className="py-2 px-3 text-right">
                      <span className="bg-[#627566] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                        {lic.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* B. Grid Akreditasi & Badge Sertifikasi (4 Kotak) */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#1f2621] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#627566] inline-block"></span>
              Akreditasi & Badge Sertifikasi Sistem Manajemen
            </span>
            <span className="font-folio-mono text-[9px] text-[#627566] uppercase tracking-widest font-semibold">
              AUDIT BERKALA TERSTANDARISASI
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {accreditationBadges.map((badge) => (
              <div
                key={badge.id}
                className="border border-[#d6ddd6] bg-white p-2.5 flex flex-col justify-between shadow-xs hover:border-[#627566]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="bg-[#627566] text-white font-folio-mono text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {badge.tag}
                    </span>
                  </div>
                  <h4 className="font-headline text-[11px] font-bold text-[#1f2621] uppercase tracking-[-0.01em] leading-tight mb-1">
                    {badge.code}
                  </h4>
                  <p className="font-editorial-body text-[10px] text-[#2c332e] leading-[1.35] mb-1">
                    {badge.title}
                  </p>
                  <p className="font-editorial-body text-[9.5px] text-[#64748b] leading-[1.35]">
                    {badge.scope}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#d6ddd6] mt-2 font-folio-mono text-[8.5px] text-[#64748b] space-y-0.5">
                  <div className="truncate"><span className="text-stone-400">REG:</span> {badge.regNo}</div>
                  <div className="truncate text-[#627566] font-medium"><span className="text-stone-400">AUDIT:</span> {badge.auditor}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C. Statutory Compliance Manifesto */}
        <section className="bg-[#f4f7f4] border border-[#d6ddd6] border-l-4 border-l-[#627566] p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-[#627566] flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#627566]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Komitmen Tata Kelola & Integritas Statuter (Statutory Compliance Manifesto)
            </span>
            <span className="font-folio-mono text-[9px] text-[#849688] uppercase tracking-widest">
              DOC.REF // GCG-SAGE
            </span>
          </div>
          <p className="font-editorial-body text-xs sm:text-[12.5px] text-[#2c332e] leading-[1.6] italic font-medium">
            &ldquo;{statutoryComplianceManifesto}&rdquo;
          </p>
          <div className="mt-2.5 pt-2 border-t border-[#d6ddd6] flex flex-wrap items-center justify-between text-[10px] text-[#64748b]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1f2621] uppercase">Komite Audit & Kepatuhan Statuter</span>
              <span>//</span>
              <span>Dewan Direksi & Komisaris</span>
            </div>
            <div className="font-folio-mono text-[#627566] text-[9px] font-semibold">
              OSS-RBA & LPJK PUPR RI
            </div>
          </div>
        </section>

        {/* D. Audit Details 2-Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-[#d6ddd6] bg-white p-3 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-[#627566] uppercase block mb-0.5">Kualifikasi Statuter</span>
            <h4 className="font-headline text-xs font-bold text-[#1f2621] uppercase mb-1">Sertifikat Badan Usaha B1</h4>
            <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">Pemberian lisensi operasional penuh untuk pelaksanaan konstruksi berskala besar di Indonesia.</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#627566] uppercase block mb-0.5">Standar Manajemen</span>
            <h4 className="font-headline text-xs font-bold text-[#1f2621] uppercase mb-1">ISO 9001 / 14001 / 45001</h4>
            <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">Pengendalian kualitas, keselamatan kerja K3, dan kepatuhan lingkungan yang diaudit berkala.</p>
          </div>
        </div>
      </div>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-3.5 pt-3 border-t border-[#d6ddd6] flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-[#849688] shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#1f2621]">04 / 06</span>
      </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 6: ROYAL NAVY & TANGERINE SLANT
  // ==========================================
  if (themeId === 'royal-slant') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 border-2 border-[#1e3a8a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // ROYAL SLANT SPEC" regText="ROYAL-SLANT // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        {/* Diagonal Hatched Accent Pattern */}
        <div
          className="absolute top-0 right-0 w-48 h-28 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 1.5px, transparent 1.5px, transparent 8px)',
          }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-slate-300 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
          <span className="font-bold text-[#1e3a8a]">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="mb-4 pb-3 border-b-2 border-[#1e3a8a] shrink-0 relative z-10">
          <div className="transform -skew-x-12 bg-[#ea580c] text-white inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="inline-block transform skew-x-12">BAB 04 // REGISTER PERIZINAN & AUDIT</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#1e3a8a] tracking-[-0.02em] leading-tight">
            Legalitas Korporasi <span className="text-[#ea580c]">&</span> Kepatuhan Statuter
          </h1>
        </section>

        {/* Main Vertical Content Flow */}
        <div className="flex-1 flex flex-col justify-between gap-3.5 relative z-10">
          {/* A. Royal Slant Table */}
          <div className="bg-white border-2 border-[#1e3a8a] shadow-sm">
            <div className="px-4 py-2 bg-[#1e3a8a] text-white flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#ea580c] transform -skew-x-12" />
                <span>Register Perizinan Berusaha Berbasis Risiko (OSS-RBA)</span>
              </div>
              <span className="text-orange-200 text-[10px] font-folio-mono">TERVERIFIKASI AKTIF</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-100 font-bold uppercase text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Nama Dokumen</th>
                    <th className="py-2.5 px-3">Nomor Registrasi</th>
                    <th className="py-2.5 px-3">Penerbit</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-[#1e3a8a] uppercase">{lic.name}</div>
                        <div className="text-[10px] text-slate-500">{lic.subtitle}</div>
                      </td>
                      <td className="py-2.5 px-3 font-folio-mono text-[#ea580c] font-semibold">{lic.regNo}</td>
                      <td className="py-2.5 px-3 text-slate-700">{lic.issuer}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-block transform -skew-x-12 bg-[#ea580c] text-white px-2 py-0.5 text-[9px] font-extrabold uppercase">
                          <span className="inline-block transform skew-x-12">{lic.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. 4 Akreditasi Badges */}
          <section className="bg-white border-2 border-[#1e3a8a] p-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2.5">
              <span className="text-xs font-black text-[#1e3a8a] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#ea580c] transform -skew-x-12 inline-block"></span>
                Sertifikasi Sistem Manajemen Terakreditasi KAN & Internasional
              </span>
              <span className="text-[10px] text-slate-500 font-folio-mono">AUDIT BERKALA 2026</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge) => (
                <div key={badge.id} className="border border-slate-200 p-2.5 bg-slate-50 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-bold font-folio-mono text-[#1e3a8a]">{badge.code}</span>
                      <span className="text-[8px] font-extrabold px-1 py-0.2 bg-[#ea580c] text-white transform -skew-x-12">
                        <span className="inline-block transform skew-x-12">{badge.tag}</span>
                      </span>
                    </div>
                    <div className="text-[11px] font-bold uppercase text-slate-900 leading-tight mb-1">{badge.title}</div>
                    <div className="text-[9.5px] text-slate-600 leading-snug line-clamp-2">{badge.scope}</div>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-200 text-[9px] text-[#1e3a8a] font-folio-mono flex justify-between">
                    <span>{badge.regNo}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Manifest Pernyataan Kepatuhan */}
          <section className="border-2 border-[#1e3a8a] bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 bg-[#ea580c] transform -skew-x-12" />
              <span className="font-headline text-xs font-black uppercase tracking-wider text-[#1e3a8a]">
                Pernyataan Resmi Tata Kelola & Integritas Statuter
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-slate-800 leading-[1.6] italic font-medium border-l-2 border-[#ea580c] pl-3">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1e3a8a] uppercase">Komite Audit & Kepatuhan Statuter</span>
                <span>//</span>
                <span>Dewan Direksi & Komisaris</span>
              </div>
              <div className="font-folio-mono text-[#ea580c] text-[9px] font-bold">
                OSS-RBA & LPJK PUPR RI
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-2 border-slate-300 bg-white p-3 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-[#ea580c] uppercase block mb-0.5">Kualifikasi Statuter</span>
              <h4 className="font-headline text-xs font-bold text-[#1e3a8a] uppercase mb-1">Sertifikat Badan Usaha B1</h4>
              <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5]">Pemberian lisensi operasional penuh untuk pelaksanaan konstruksi berskala besar di Indonesia.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#ea580c] uppercase block mb-0.5">Standar Manajemen Mutu</span>
              <h4 className="font-headline text-xs font-bold text-[#1e3a8a] uppercase mb-1">ISO 9001 / 14001 / 45001</h4>
              <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5]">Pengendalian kualitas, keselamatan kerja K3, dan kepatuhan lingkungan yang diaudit berkala.</p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ea580c]">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 7: HEXAGON APEX & CHARCOAL
  // ==========================================
  if (themeId === 'hexagon-charcoal') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fbfbfb] text-[#18181b] border-2 border-[#18181b] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // HEXAGON APEX SPEC" regText="HEXAGON-CHARCOAL // CHAPTER 04" />
        <GridOverlay active={showGrid} />

        {/* Hexagon Angle Accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 bg-[#18181b] pointer-events-none z-0"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-zinc-300 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0 relative z-10">
          <span className="font-bold text-[#18181b]">{data.companyName}</span>
          <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
        </header>

        {/* 2. Chapter Title */}
        <section className="mb-4 pb-3 border-b-2 border-[#18181b] shrink-0 relative z-10">
          <div className="flex items-center gap-1.5 bg-[#18181b] text-white inline-flex px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
            <span>BAB 04 // REGISTER PERIZINAN & AUDIT</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#18181b] tracking-[-0.02em] leading-tight">
            Legalitas Korporasi <span className="text-[#f97316]">&</span> Sertifikasi Statuter
          </h1>
        </section>

        {/* Main Vertical Content Flow */}
        <div className="flex-1 flex flex-col justify-between gap-3.5 relative z-10">
          {/* A. Hexagon Table */}
          <div className="bg-white border-2 border-[#18181b] shadow-sm">
            <div className="px-4 py-2 bg-[#18181b] text-white flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f97316] rotate-45" />
                <span>Register Perizinan Berusaha Berbasis Risiko (OSS-RBA)</span>
              </div>
              <span className="text-[#f97316] text-[10px] font-folio-mono">STATUS: AUDITED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-zinc-200">
                <thead className="bg-zinc-100 font-bold uppercase text-zinc-700 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Nama Dokumen</th>
                    <th className="py-2.5 px-3">Nomor Registrasi</th>
                    <th className="py-2.5 px-3">Penerbit</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-[11px]">
                  {data.legal.licenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-zinc-50">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-[#18181b] uppercase">{lic.name}</div>
                        <div className="text-[10px] text-zinc-500">{lic.subtitle}</div>
                      </td>
                      <td className="py-2.5 px-3 font-folio-mono text-[#f97316] font-semibold">{lic.regNo}</td>
                      <td className="py-2.5 px-3 text-zinc-700">{lic.issuer}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-block bg-[#18181b] text-[#f97316] border border-[#f97316] px-2 py-0.5 text-[9px] font-bold uppercase">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. 4 Akreditasi Badges with Hexagon Indicators */}
          <section className="bg-white border-2 border-[#18181b] p-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-2.5">
              <span className="text-xs font-black text-[#18181b] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#f97316] rotate-45 inline-block"></span>
                Sertifikasi Sistem Manajemen Terakreditasi
              </span>
              <span className="text-[10px] text-zinc-500 font-folio-mono">STANDAR MUTU PUPR</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {accreditationBadges.map((badge, idx) => (
                <div key={badge.id} className="border border-zinc-200 p-2.5 bg-zinc-50 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div
                        className="w-5 h-5 bg-[#18181b] text-[#f97316] flex items-center justify-center font-mono text-[8px] font-bold"
                        style={{
                          clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                        }}
                      >
                        0{idx + 1}
                      </div>
                      <span className="text-[8px] font-bold px-1 py-0.2 bg-[#f97316] text-white">
                        {badge.tag}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold uppercase text-zinc-900 leading-tight mb-1">{badge.title}</div>
                    <div className="text-[9.5px] text-zinc-600 leading-snug line-clamp-2">{badge.scope}</div>
                  </div>
                  <div className="mt-2 pt-1 border-t border-zinc-200 text-[9px] text-[#f97316] font-mono font-bold flex justify-between">
                    <span>{badge.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. Manifest Pernyataan Kepatuhan */}
          <section className="border-2 border-[#18181b] bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#f97316] rotate-45" />
              <span className="font-headline text-xs font-black uppercase tracking-wider text-[#18181b]">
                Pernyataan Resmi Tata Kelola & Integritas Statuter
              </span>
            </div>
            <p className="font-editorial-body text-xs sm:text-[12.5px] text-zinc-800 leading-[1.6] italic font-medium border-l-2 border-[#f97316] pl-3">
              &ldquo;{statutoryComplianceManifesto}&rdquo;
            </p>
            <div className="mt-2.5 pt-2 border-t border-zinc-200 flex flex-wrap items-center justify-between text-[10px] text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#18181b] uppercase">Komite Audit & Kepatuhan Statuter</span>
                <span>//</span>
                <span>Dewan Direksi & Komisaris</span>
              </div>
              <div className="font-folio-mono text-[#f97316] text-[9px] font-bold">
                OSS-RBA & LPJK PUPR RI
              </div>
            </div>
          </section>

          {/* D. Audit Details 2-Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-2 border-zinc-300 bg-white p-3 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-[#f97316] uppercase block mb-0.5">Kualifikasi Statuter</span>
              <h4 className="font-headline text-xs font-bold text-[#18181b] uppercase mb-1">Sertifikat Badan Usaha B1</h4>
              <p className="font-editorial-body text-[11px] text-zinc-600 leading-[1.5]">Pemberian lisensi operasional penuh untuk pelaksanaan konstruksi berskala besar di Indonesia.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#f97316] uppercase block mb-0.5">Standar Manajemen Mutu</span>
              <h4 className="font-headline text-xs font-bold text-[#18181b] uppercase mb-1">ISO 9001 / 14001 / 45001</h4>
              <p className="font-editorial-body text-[11px] text-zinc-600 leading-[1.5]">Pengendalian kualitas, keselamatan kerja K3, dan kepatuhan lingkungan yang diaudit berkala.</p>
            </div>
          </div>
        </div>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-3.5 pt-3 border-t border-zinc-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#f97316]">04 / 06</span>
        </footer>
      </article>
    );
  }

  // ==========================================
  // THEME 8: COBALT DIAGONAL SLASH (Default fallback)
  // ==========================================
  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId="04" bleedText="+ 210 × 297 MM // COBALT SLASH SPEC" regText="COBALT-SLASH // CHAPTER 04" />
      <GridOverlay active={showGrid} />

      {/* Dynamic Cobalt Slash Ribbon */}
      <div
        className="absolute top-0 right-0 w-64 h-24 bg-[#2563eb] opacity-10 pointer-events-none z-0"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-slate-300 mb-4 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
        <span className="font-bold text-[#0f172a]">{data.companyName}</span>
        <span>BAB 04 // LEGALITAS & SERTIFIKASI</span>
      </header>

      {/* 2. Chapter Title */}
      <section className="mb-4 pb-3 border-b-2 border-[#0f172a] shrink-0 relative z-10">
        <div className="transform -skew-x-12 bg-[#0f172a] text-white inline-block px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5 border-l-2 border-[#2563eb]">
          <span className="inline-block transform skew-x-12">BAB 04 // MATRIKS KEPATUHAN & AUDIT</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#0f172a] tracking-[-0.02em] leading-tight">
          Legalitas Korporasi <span className="text-[#2563eb]">&</span> Kepatuhan Statuter
        </h1>
      </section>

      {/* Main Vertical Content Flow */}
      <div className="flex-1 flex flex-col justify-between gap-3.5 relative z-10">
        {/* A. Cobalt Table */}
        <div className="bg-white border-2 border-[#0f172a] shadow-sm">
          <div className="px-4 py-2 bg-[#0f172a] text-white flex justify-between items-center text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-1.5 bg-[#2563eb]" />
              <span>Register Perizinan Berusaha Berbasis Risiko (OSS-RBA)</span>
            </div>
            <span className="text-sky-300 text-[10px] font-folio-mono">VERIFIED BY BKPM</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-100 font-bold uppercase text-slate-700 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Nama Dokumen</th>
                  <th className="py-2.5 px-3">Nomor Registrasi</th>
                  <th className="py-2.5 px-3">Penerbit</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {data.legal.licenses.map((lic) => (
                  <tr key={lic.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-[#0f172a] uppercase">{lic.name}</div>
                      <div className="text-[10px] text-slate-500">{lic.subtitle}</div>
                    </td>
                    <td className="py-2.5 px-3 font-folio-mono text-[#2563eb] font-semibold">{lic.regNo}</td>
                    <td className="py-2.5 px-3 text-slate-700">{lic.issuer}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="inline-block bg-[#2563eb] text-white px-2 py-0.5 text-[9px] font-bold uppercase">
                        {lic.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* B. 4 Akreditasi Badges with Cobalt Headers */}
        <section className="bg-white border-2 border-[#0f172a] p-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2.5">
            <span className="text-xs font-black text-[#0f172a] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#2563eb] inline-block"></span>
              Sertifikasi Sistem Manajemen Terintegrasi
            </span>
            <span className="text-[10px] text-slate-500 font-folio-mono">AUDIT SIKLUS 2026</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {accreditationBadges.map((badge) => (
              <div key={badge.id} className="border border-slate-200 p-2.5 bg-slate-50 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-1 bg-[#2563eb]" />
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-bold font-folio-mono text-[#0f172a]">{badge.code}</span>
                    <span className="text-[8px] font-bold px-1 py-0.2 bg-[#2563eb] text-white">
                      {badge.tag}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold uppercase text-slate-900 leading-tight mb-1">{badge.title}</div>
                  <div className="text-[9.5px] text-slate-600 leading-snug line-clamp-2">{badge.scope}</div>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 text-[9px] text-[#2563eb] font-folio-mono font-semibold flex justify-between">
                  <span>{badge.regNo}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C. Manifest Pernyataan Kepatuhan */}
        <section className="border-2 border-[#0f172a] bg-white p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-1.5 bg-[#2563eb]" />
            <span className="font-headline text-xs font-black uppercase tracking-wider text-[#0f172a]">
              Pernyataan Resmi Tata Kelola & Integritas Statuter
            </span>
          </div>
          <p className="font-editorial-body text-xs sm:text-[12.5px] text-slate-800 leading-[1.6] italic font-medium border-l-2 border-[#2563eb] pl-3">
            &ldquo;{statutoryComplianceManifesto}&rdquo;
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0f172a] uppercase">Komite Audit & Kepatuhan Statuter</span>
              <span>//</span>
              <span>Dewan Direksi & Komisaris</span>
            </div>
            <div className="font-folio-mono text-[#2563eb] text-[9px] font-bold">
              OSS-RBA & LPJK PUPR RI
            </div>
          </div>
        </section>

        {/* D. Audit Details 2-Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-2 border-slate-300 bg-white p-3 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-[#2563eb] uppercase block mb-0.5">Kualifikasi Statuter</span>
            <h4 className="font-headline text-xs font-bold text-[#0f172a] uppercase mb-1">Sertifikat Badan Usaha B1</h4>
            <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5]">Pemberian lisensi operasional penuh untuk pelaksanaan konstruksi berskala besar di Indonesia.</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#2563eb] uppercase block mb-0.5">Standar Manajemen Mutu</span>
            <h4 className="font-headline text-xs font-bold text-[#0f172a] uppercase mb-1">ISO 9001 / 14001 / 45001</h4>
            <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5]">Pengendalian kualitas, keselamatan kerja K3, dan kepatuhan lingkungan yang diaudit berkala.</p>
          </div>
        </div>
      </div>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-3.5 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#2563eb]">04 / 06</span>
      </footer>
    </article>
  );
};
