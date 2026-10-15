import React from 'react';
import { CompanyProfileData, TogglesState, ThemeId } from '../../types/monograph';
import { getPageInfo } from '../../utils/pagination';
import { AboutTechNavy } from './about/AboutTechNavy';
import { AboutSwissTangerine } from './about/AboutSwissTangerine';
import { AboutCyberCrimson } from './about/AboutCyberCrimson';
import { AboutScarletCircle } from './about/AboutScarletCircle';
import { AboutSageWireframe } from './about/AboutSageWireframe';
import { AboutRoyalSlant } from './about/AboutRoyalSlant';
import { AboutHexagonCharcoal } from './about/AboutHexagonCharcoal';
import { AboutCobaltSlash } from './about/AboutCobaltSlash';
import { EyeOff } from 'lucide-react';

interface Spread02AboutVisionProps {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

export const Spread02AboutVision: React.FC<Spread02AboutVisionProps> = ({
  data,
  toggles,
  showGrid,
  themeId = 'tech-navy',
}) => {
  const isEnabled = data.pageVisibility?.about !== false;
  const pageInfo = getPageInfo('about', data.pageVisibility);

  if (!isEnabled) {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[400px] bg-white border border-dashed border-zinc-300 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center shadow-xs no-print print:hidden">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3 border border-amber-200">
          <EyeOff className="w-6 h-6" />
        </div>
        <h3 className="font-headline text-base font-bold text-zinc-900 uppercase tracking-[-0.02em]">
          HALAMAN 02 // TENTANG &amp; VISI DINONAKTIFKAN
        </h3>
        <p className="font-editorial-body text-xs text-zinc-600 mt-2 max-w-md leading-relaxed">
          Halaman ini disembunyikan dari preview gabungan dan otomatis diabaikan saat ekspor cetak PDF (@media print). Aktifkan kembali melalui toggle di Panel Editor Kiri.
        </p>
      </article>
    );
  }

  switch (themeId) {
    case 'tech-navy':
      return <AboutTechNavy data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'swiss-tangerine':
      return <AboutSwissTangerine data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'cyber-crimson':
      return <AboutCyberCrimson data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'scarlet-circle':
      return <AboutScarletCircle data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'sage-wireframe':
      return <AboutSageWireframe data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'royal-slant':
      return <AboutRoyalSlant data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'hexagon-charcoal':
      return <AboutHexagonCharcoal data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    case 'cobalt-slash':
      return <AboutCobaltSlash data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
    default:
      return <AboutTechNavy data={data} toggles={toggles} showGrid={showGrid} pageInfo={pageInfo} />;
  }
};

