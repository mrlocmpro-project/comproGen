import { CompanyProfileData } from '../types/monograph';
import { defaultCompanyData } from './defaultData';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  tag: string;
  data: CompanyProfileData;
}

export const presetTemplates: PresetTemplate[] = [
  {
    id: 'heavy-industry-ack',
    name: '05. Heavy Civil & Infrastructure (Default)',
    description: 'PT Arya Cipta Konstruksi Tbk - Monograph Vol. V, high-rise, megastructure & portofolio 14.8T IDR',
    tag: 'HEAVY CIVIL',
    data: defaultCompanyData,
  },
  {
    id: 'robotics-aerospace',
    name: '02. Advanced Mechatronics & Heavy Robotics',
    description: 'PT Mekatronika Presisi Nusantara Tbk - Autonomous industrial gantry, aerospace fabrication & defense robotics',
    tag: 'HIGH-TECH',
    data: {
      ...defaultCompanyData,
      companyName: 'PT MEKATRONIKA PRESISI NUSANTARA TBK',
      tagline: 'SISTEM MEKATRONIKA PRESISI, ROBOTIKA INDUSTRI & REKAYASA DIRGANTARA',
      monogram: 'MPN',
      docId: 'MPN-ROB-2026-V02',
      ticker: 'MPNX.JK',
      manifestoLead: 'ROBOTIKA & OTOMASI TINGKAT LANJUT',
      manifestoBody:
        'Pionir manufaktur mekatronika sub-mikron, rekayasa struktur ruang angkasa, dan integrasi kecerdasan kinematik multi-sumbu di Asia Pasifik.',
      director: {
        ...defaultCompanyData.director,
        name: 'Prof. Dr. Aris Danasmoro, Ph.D.',
        title: 'Direktur Utama / Chief Mechatronics Architect',
        regNo: 'REG. IEEE-ID NO. 883-04-BND',
        quote: '"Otomasi presisi bukan sekadar efisiensi elektromekanik, melainkan akselerator kedaulatan industri modern."',
        paragraph1:
          'Transformasi otomasi industri di Asia Tenggara membutuhkan ketepatan kinematika mikro dengan toleransi deviasi kurang dari 0.5 mikron.',
        paragraph2:
          'Kami menghadirkan platform kontrol terpadu yang memadukan komputasi neural real-time dengan paduan logam komposit kedirgantaraan bersertifikasi AS9100D.',
      },
      visionMission: {
        ...defaultCompanyData.visionMission,
        visionHeading: 'VISI MEKATRONIKA 2035',
        visionStatement:
          'Menjadi produsen sistem robotika berat dan manufaktur aditif komponen dirgantara paling presisi di belahan bumi selatan.',
        targetEmissions: 'STANDAR SUHU RUANG BERSIH: ISO CLASS 4',
        targetBim: 'REPRESENTASI DIGITAL TWIN: 100% TELEMETRI IOT',
      },
    },
  },
  {
    id: 'green-structural-timber',
    name: '03. Sustainable Mass Timber & Bio-Architecture',
    description: 'PT Nusantara Eko Konsorsium Tbk - Zero-embodied-carbon megastructures, mass timber & living facades',
    tag: 'NET-ZERO BIO',
    data: {
      ...defaultCompanyData,
      companyName: 'PT NUSANTARA EKO STRUKTURAL TBK',
      tagline: 'KONTRAKTOR UTAMA ARSITEKTUR REGENERATIF & REKAYASA STRUKTUR MASS TIMBER',
      monogram: 'NES',
      docId: 'NES-ECO-2026-CH01',
      ticker: 'NESG.JK',
      manifestoLead: 'STRUKTUR REGENERATIF & NET-ZERO',
      manifestoBody:
        'Mengubah paradigma konstruksi konvensional melalui rekayasa kayu laminasi silang (CLT), beton penangkap karbon, dan fasad kinetik fotovoltaik terintegrasi.',
      director: {
        ...defaultCompanyData.director,
        name: 'Dr. Soraya Hadiningrat, M.Arch., IAI',
        title: 'Direktur Utama / Principal Ecological Engineer',
        quote: '"Arsitektur sejati tidak menaklukkan alam, melainkan berevolusi menjadi paru-paru aktif peradaban manusia."',
        paragraph1:
          'Setiap meter kubik kayu rekayasa bersertifikasi FSC yang kami dirikan mengunci 1 ton emisi karbon atmosfer secara permanen selama siklus bangunan.',
      },
    },
  },
];
