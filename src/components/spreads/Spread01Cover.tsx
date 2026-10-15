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
