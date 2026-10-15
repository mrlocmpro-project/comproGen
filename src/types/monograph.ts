export interface StatItem {
  id: string;
  label: string;
  value: string;
  subvalue: string;
  desc: string;
}

export interface TeamMemberTier1 {
  id: string;
  code: string;
  name: string;
  title: string;
  tags: string[];
  bio: string;
  exp: string;
  empId: string;
  photoUrl: string;
}

export interface TeamMemberTier2 {
  id: string;
  name: string;
  title: string;
  division: string;
  tags: string[];
  bio: string;
  exp: string;
  photoUrl: string;
}

export interface LicenseItem {
  id: string;
  no: string;
  name: string;
  subtitle: string;
  regNo: string;
  details: string;
  issuer: string;
  status: string;
}

export interface CertificationCard {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  desc: string;
  issuer: string;
  certNo: string;
  isGold?: boolean;
}

export interface SectoralProject {
  id: string;
  code: string;
  sectorTag: string;
  city: string;
  title: string;
  description: string;
  value: string;
  client: string;
  specs: string;
  year: string;
  photoUrl: string;
}

export interface EpcContractRow {
  id: string;
  no: string;
  name: string;
  location: string;
  client: string;
  sector: string;
  year: string;
  scale: string;
  scope: string;
  value: string;
  status: string;
  isProgress?: boolean;
}

export interface StrategicPillar {
  no: string;
  category: string;
  title: string;
  description: string;
  tag: string;
}

export interface CoreValue {
  no: string;
  title: string;
  description: string;
}

export type YearVerticalAlign = 'top' | 'middle' | 'bottom';

export interface CoverYearFineTune {
  yOffset: number;
  xOffset: number;
  fontSize: number;
  verticalAlign: YearVerticalAlign;
  showBadge: boolean;
}

export interface PageVisibility {
  cover: boolean;
  about: boolean;
  team: boolean;
  legal: boolean;
  portfolio: boolean;
  backCover: boolean;
}

export interface CompanyProfileData {
  companyName: string;
  legalEntity: string;
  tagline: string;
  monogram: string;
  docId: string;
  fiscalYear: string;
  ticker: string;
  nib: string;
  sbu: string;
  isoSummary: string;
  classification: string;
  manifestoLead: string;
  manifestoBody: string;
  coverDocumentType?: string;
  coverDescription?: string;
  coverPhotoUrl?: string;
  coverYearFineTune?: CoverYearFineTune;
  pageVisibility?: PageVisibility;
  stats: StatItem[];
  contact: {
    headquarters: {
      title: string;
      line1: string;
      line2: string;
      line3: string;
      postal: string;
    };
    comms: {
      title: string;
      phone: string;
      fax: string;
      email: string;
      website: string;
    };
    legalVerify: {
      title: string;
      desc: string;
      legalCode: string;
      hash: string;
    };
    workshop: {
      location: string;
      scope: string;
    };
    regional: string;
  };
  director: {
    name: string;
    title: string;
    regNo: string;
    badge: string;
    quote: string;
    paragraph1: string;
    paragraph2: string;
    photoUrl: string;
    signatureUrl?: string;
  };
  visionMission: {
    visionHeading: string;
    visionStatement: string;
    targetEmissions: string;
    targetBim: string;
    pillars: StrategicPillar[];
    qhseTitle: string;
    safeHours: string;
    safeHoursTag: string;
    coreValues: CoreValue[];
    qhsePolicyText?: string;
    foundedYear?: string;
    expertCount?: string;
  };
  team: {
    tier1: TeamMemberTier1[];
    tier2: TeamMemberTier2[];
    engineersCount: string;
    bimSpecialists: string;
    k3Accreditation: string;
    onTimeRate: string;
    civilRatio: number;
    archRatio: number;
  };
  legal: {
    statutoryStatement: string;
    paragraph1: string;
    paragraph2: string;
    licenses: LicenseItem[];
    certifications: CertificationCard[];
    signatory: {
      name: string;
      title: string;
      regNo: string;
      city: string;
    };
  };
  portfolio: {
    flagship: {
      code: string;
      title: string;
      client: string;
      value: string;
      role: string;
      floorArea: string;
      height: string;
      scope: string;
      period: string;
      greenCert: string;
      description: string;
      bastStatus: string;
      photoUrl: string;
      latLong: string;
      tolerance: string;
    };
    sectoralProjects: SectoralProject[];
    epcRegister: EpcContractRow[];
    signatory: {
      name: string;
      title: string;
      cert: string;
    };
  };
  backCover: {
    headlinePrefix: string;
    headlineHighlight: string;
    closingHeadline?: string;
    closingSubheadline?: string;
    body: string;
    tenderEmail: string;
    tenderPhone: string;
    corsecEmail: string;
    engineeringEmail: string;
    responseSla: string;
    digitalHash: string;
    photoUrl?: string;
    branches?: string;
  };
}

export interface TogglesState {
  showCover?: boolean;
  showAbout?: boolean;
  showDirectorMessage: boolean;
  showVisionMission: boolean;
  showHSEPolicy: boolean;
  showTeam: boolean;
  showLegal: boolean;
  showProjects: boolean;
  showBackCover?: boolean;
}

export type SpreadId = '01' | '02' | '03' | '04' | '05' | '06' | 'all';

export type ThemeId =
  | 'tech-navy'
  | 'swiss-tangerine'
  | 'cyber-crimson'
  | 'scarlet-circle'
  | 'sage-wireframe'
  | 'royal-slant'
  | 'hexagon-charcoal'
  | 'cobalt-slash';

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  accentColor: string;
  bgPreview: string;
}
