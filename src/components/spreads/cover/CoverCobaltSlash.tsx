import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

export const CoverCobaltSlash: React.FC<Props> = ({ data, showGrid }) => {
  // Parse fiscal years (e.g. "2026 / 2027", "2026 - 2027", "2026")
  const rawFiscal = (data.fiscalYear || '2026 / 2027').trim();
  const parsedYears = rawFiscal
    .split(/[\/\-–—\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const startYear = parsedYears[0] || '2026';
  const endYear = parsedYears.length > 1 ? parsedYears[1] : '';

  const fineTune = data.coverYearFineTune || {
    yOffset: 0,
    xOffset: 0,
    fontSize: 28,
    verticalAlign: 'top',
    showBadge: true,
  };
  const vAlign = fineTune.verticalAlign || 'top';
  const alignSelf =
    vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      {/* GEOMETRIC ACCENT: Cobalt Diagonal Slash Ribbon Background Flairs */}
      <div
        className="absolute top-0 right-0 w-80 h-32 bg-[#2563eb] opacity-15 pointer-events-none z-0"
        style={{
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />
      <div
        className="absolute -top-12 right-24 w-12 h-64 bg-[#2563eb] transform -rotate-45 opacity-25 pointer-events-none z-0"
      />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE SECTION: Locked 2-Column CSS Grid */}
        <section className="mt-2 mb-4">
          <div
            className="w-full grid grid-cols-[68%_1fr] items-start justify-between gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 68%) minmax(0, 32%)',
              gap: '24px',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* Left Column (Lebar 68%): Modern Corporate Executive Title */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-1.5 w-8 bg-[#2563eb]" />
                <span className="font-folio-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#2563eb]">
                  EXECUTIVE DOSSIER // {startYear}
                </span>
              </div>
              <h1 className="font-headline text-5xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-[#0f172a]">
                CORPORATE <br />
                <span className="text-[#2563eb]">MONOGRAPH</span>
              </h1>
            </div>

            {/* Right Column (Lebar 32%): Single-Line Year & Slanted Parallelogram Year Box with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible pr-2"
              style={{
                alignSelf,
                transform: `translate(${fineTune.xOffset || 0}px, ${fineTune.yOffset || 0}px)`,
              }}
            >
              {/* Slanted Parallelogram Year Container */}
              <div className="transform -skew-x-12 bg-[#0f172a] text-white px-4 py-1.5 shadow-md border-r-4 border-[#2563eb] whitespace-nowrap overflow-visible">
                <div
                  className="transform skew-x-12 font-headline font-black tracking-[-0.02em] whitespace-nowrap text-white overflow-visible"
                  style={{
                    fontSize: `${fineTune.fontSize || 28}px`,
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                  }}
                >
                  {endYear ? `/ ${startYear} – ${endYear}` : `/ ${startYear}`}
                </div>
              </div>

              {/* Accreditation Badge below */}
              {fineTune.showBadge !== false && (
                <div className="mt-2 flex justify-end self-end overflow-visible">
                  <span className="inline-block bg-[#2563eb] text-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sub-headline & Company Identification with Cobalt Border */}
          <div className="mt-4 pt-3.5 border-t-2 border-[#0f172a] max-w-xl">
            <h2 className="font-headline text-2xl font-black uppercase tracking-[-0.02em] text-[#0f172a]">
              {data.companyName}
            </h2>
            <p className="text-sm font-bold text-[#2563eb] mt-1">
              {data.tagline}
            </p>
            <p className="font-editorial-body text-xs text-slate-600 mt-2 leading-[1.6]">
              {data.coverDescription ||
                'Rekayasa teknik konstruksi, kepatuhan legalitas terverifikasi, dan manajemen portofolio infrastruktur berskala nasional.'}
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: DYNAMIC DIAGONAL SLASH RIBBON PHOTO */}
        <section className="relative my-2">
          <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden border-2 border-[#0f172a] bg-[#0f172a] shadow-xl">
            <img
              src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
              alt={data.portfolio.flagship.title || 'COBALT ARCHITECTURE HERO'}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                  target.src = DEFAULT_SKYSCRAPER_IMG;
                }
              }}
              className="w-full h-full object-cover contrast-115 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent pointer-events-none" />

            {/* DYNAMIC SLASH RIBBON 1 (Deep Indigo Angled Slash across Photo) */}
            <div
              className="absolute -top-6 -left-12 w-64 h-full bg-[#0f172a]/85 backdrop-blur-xs transform -rotate-12 pointer-events-none z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
              }}
            />

            {/* DYNAMIC SLASH RIBBON 2 (Electric Cobalt Slash cutting through) */}
            <div
              className="absolute bottom-0 right-0 w-80 h-28 bg-[#2563eb] transform -skew-x-20 z-15 flex items-center justify-center opacity-95 shadow-lg"
              style={{
                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
              }}
            >
              <div className="transform skew-x-20 text-right px-6 text-white">
                <span className="font-folio-mono text-[10px] tracking-widest text-sky-200 block uppercase">
                  FLAGSHIP ASSET
                </span>
                <span className="font-headline text-base font-black tracking-tight block uppercase">
                  {data.portfolio.flagship.title || 'MENARA CAKRAWALA'}
                </span>
                <span className="font-folio-mono text-[10px] text-sky-100 block">
                  // {data.portfolio.flagship.period || '2023 – 2026'}
                </span>
              </div>
            </div>

            {/* Top-Left Badge */}
            <div className="absolute top-3 left-3 bg-[#0f172a] text-white px-3 py-1 text-[10px] font-folio-mono uppercase tracking-wider z-20 border border-slate-700">
              <span className="text-[#2563eb] font-bold mr-1.5">//</span> DIAGONAL SLASH EDITION
            </div>
          </div>
        </section>

        {/* BOTTOM METRIC MATRIX (3 High-Precision Corporate Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          {/* Card 1: Electric Cobalt Bold Block */}
          <div className="bg-[#2563eb] text-white p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 transform rotate-45 -mr-6 -mt-6" />
            <div className="text-[11px] font-bold text-sky-100 uppercase tracking-wider">
              {data.stats[0]?.label || 'Nilai Kontrak Terkelola'}
            </div>
            <div className="font-headline text-3xl font-black mt-2 tracking-tight text-white">
              {data.stats[0]?.value || '14.8 T'}
            </div>
            <p className="font-editorial-body text-xs text-sky-100 mt-2 leading-[1.5]">
              {data.stats[0]?.desc || 'Portofolio kontrak konstruksi dan rekayasa strategis.'}
            </p>
          </div>

          {/* Card 2: Deep Indigo Sharp Card */}
          <div className="bg-[#0f172a] text-white p-5 shadow-sm border-t-2 border-[#2563eb] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#2563eb]" />
                {data.stats[1]?.label || 'Proyek Selesai'}
              </div>
              <div className="font-headline text-3xl font-black mt-2 tracking-tight text-white">
                {data.stats[1]?.value || '180+'}
              </div>
              <p className="font-editorial-body text-xs text-slate-300 mt-2 leading-[1.5]">
                Infrastruktur sipil, gedung tinggi, dan kawasan industri modern.
              </p>
            </div>
          </div>

          {/* Card 3: Slate White Card with Blue Accent */}
          <div className="bg-white text-slate-900 p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#2563eb]" />
                Kualitas & Keselamatan
              </div>
              <div className="font-headline text-3xl font-black mt-2 tracking-tight text-[#2563eb]">
                100%
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 uppercase">
                Zero Lost-Time Injury (LTI)
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
              Sertifikasi ISO 9001 / 14001 / 45001 Terintegrasi
            </div>
          </div>
        </section>

        {/* MINIMALIST COVER FOOTER */}
        <footer className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs font-folio-mono text-slate-600">
          <span className="font-bold text-[#0f172a]">{data.companyName}</span>
          <div className="flex items-center gap-3">
            <span>{data.contact.comms.website}</span>
            <span className="text-slate-300">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
