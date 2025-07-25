import type { NextApiRequest, NextApiResponse } from 'next';
import type { Projects } from '@/types/project';

interface ProjectResponse {
  projects: Projects[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectResponse>
) {
  const projects: Projects[] = [
    {
      "id": 1,
      "title": {
        "id": "Tatajabar ground-mounted PLTS 100 MWp terbesar di Indonesia",
        "en": "Tatajabar ground-mounted 100 MWp solar power plant, the largest in Indonesia"
      },
      "slug": "Pembangunan PLTS Groundmounted merupakan kerja sama PLN dengan PT Aruna",
      "headerImage": "/pc.png",
      "date": "2024-08-28",
      "location": "Purwakarta",
      "author": "Admin Aruna Hijau Power",
      content: [
                {
                    type: "paragraph",
                    text: {
                        id: `PLTS 100 MWp dengan sistem ground-mounted, yaitu terpasang di tanah, yang tersebar di 5 (lima) lokasi, telah dipasang sejumlah 159.978 keping modul panel surya, 24 unit trafo dan 240 unit inverter. Seluruh peralatan komponen pembangkit dalam proyek ini menggunakan teknologi terkini (mutakhir) khususnya modul panel surya berkapasitas 630 Wp bifacial yang dapat meningkatkan efisiensi kapasitasnya. Ini merupakan modul bifacial berkapasitas terbesar yang pertama diaplikasikan di Indonesia.`,
                        en: `The 100 MWp solar power plant with a ground-mounted system, i.e., installed on the ground, spread across 5 (five) locations, has been equipped with 159,978 solar panel modules, 24 transformers, and 240 inverters. All equipment and components in this project utilize state-of-the-art technology, particularly the 630 Wp bifacial solar panels, which enhance efficiency. This marks the first application of the largest-capacity bifacial modules in Indonesia.`
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Pembangunan proyek ini diselesaikan lebih cepat dari jadwal yang ditentukan, dengan total durasi  6,7 bulan sejak dimulainya land clearing pada tanggal 1 Februari 2024 sampai dengan tanggal operasi komersial (COD = Commercial Operation Date) pada tanggal 22 Agustus 2024, yang menandakan proyek ini sudah resmi beroperasi secara komersial.",
                        en: "The construction of this project was completed ahead of schedule, with a total duration of 6.7 months from the start of land clearing on February 1, 2024, to the commercial operation date (COD) on August 22, 2024, which marks the official start of commercial operations for this project"
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Tahapan kegiatan konstruksinya antara lain terdiri dari pemasangan screw pile, mounting, PV modul, Inverter, trafo, sampai dengan kabel jaringan interkoneksi yang mengintegrasikan 5 sektor PLTS untuk kemudian dihubungkan interkoneksi dengan jaringan transmisi kawasan TJS. PLTS ini telah lulus uji komisioning yang dilakukan sejak tanggal 2 s/d 14 Agustus 2024 yang dilanjutkan dengan uji keandalan (reliability run) selama 7 hari. Groundbreaking proyek ini dilakukan bertepatan dengan peringatan Hari Listrik Nasional pada tanggal 27 Oktober 2023 dan peresmiannya pada 28 Agustus 2024, oleh Dirjen Ketenagalistrikan dan Direktur Utama PLN, PLN Batam, dan Aruna.",
                        en: "The construction activities include the installation of screw piles, mounting, PV modules, inverters, transformers, and interconnection cables that integrate five PLTS sectors, which are then connected to the TJS transmission network. This solar power plant has passed the commissioning tests conducted from August 2 to 14, 2024, followed by a 7-day reliability run. The groundbreaking ceremony for this project was held in conjunction with National Electricity Day on October 27, 2023, and its official inauguration on August 28, 2024, by the Director General of Electricity, the CEO of PLN, PLN Batam, and Aruna."
                    }
                },
                {
                    type: "image",
                    src: "/tjs2.jpg",
                    caption: {
                      id: "Proyek PLTS 100 MWp di Kawasan Kota Bukit Indah Industrial City",
                      en: "Solar Power Plant Project 100 MWp in Bukit Indah Industrial City"
                    }
                },
            ]
    }

  ];
  res.status(200).json({ projects });
}
