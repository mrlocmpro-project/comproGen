import React from 'react';
import { CompanyProfileData, ThemeId } from '../../types/monograph';
import { CoverTechNavy } from './cover/CoverTechNavy';
import { CoverSwissTangerine } from './cover/CoverSwissTangerine';
import { CoverCyberCrimson } from './cover/CoverCyberCrimson';
import { CoverScarletCircle } from './cover/CoverScarletCircle';
import { CoverSageWireframe } from './cover/CoverSageWireframe';
import { CoverRoyalSlant } from './cover/CoverRoyalSlant';
import { CoverHexagonCharcoal } from './cover/CoverHexagonCharcoal';
import { CoverCobaltSlash } from './cover/CoverCobaltSlash';
import { EyeOff } from 'lucide-react';

interface Spread01CoverProps {
  data: CompanyProfileData;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

export const Spread01Cover: React.FC<Spread01CoverProps> = ({
  data,
  showGrid,
  themeId = 'tech-navy',
}) => {
  const isEnabled = data.pageVisibility?.cover ?? data.showCover ?? true;

  if (!isEnabled) {
    return (
      <article className="sheet-disabled-placeholder w-full max-w-[794px] min-h-[400px] bg-white border border-dashed border-zinc-300 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center shadow-xs no-print print:hidden">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3 border border-amber-200">
          <EyeOff className="w-6 h-6" />
        </div>
        <h3 className="font-headline text-base font-bold text-zinc-900 uppercase tracking-[-0.02em]">
          HALAMAN 01 // HALAMAN SAMPUL (COVER) DINONAKTIFKAN
        </h3>
        <p className="font-editorial-body text-xs text-zinc-600 mt-2 max-w-md leading-relaxed">
          Halaman sampul disembunyikan dari preview gabungan dan otomatis diabaikan saat ekspor cetak PDF (@media print). Aktifkan kembali melalui toggle di Tab Cover Panel Editor.
        </p>
      </article>
    );
  }
  switch (themeId) {
    case 'tech-navy':
      return <CoverTechNavy data={data} showGrid={showGrid} />;
    case 'swiss-tangerine':
      return <CoverSwissTangerine data={data} showGrid={showGrid} />;
    case 'cyber-crimson':
      return <CoverCyberCrimson data={data} showGrid={showGrid} />;
    case 'scarlet-circle':
      return <CoverScarletCircle data={data} showGrid={showGrid} />;
    case 'sage-wireframe':
      return <CoverSageWireframe data={data} showGrid={showGrid} />;
    case 'royal-slant':
      return <CoverRoyalSlant data={data} showGrid={showGrid} />;
    case 'hexagon-charcoal':
      return <CoverHexagonCharcoal data={data} showGrid={showGrid} />;
    case 'cobalt-slash':
      return <CoverCobaltSlash data={data} showGrid={showGrid} />;
    default:
      return <CoverTechNavy data={data} showGrid={showGrid} />;
  }
};
