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
      "content": [
        {
          "type": "paragraph",
          "text": {
            "id": "PLTS 100 MWp dengan sistem ground-mounted berada di Tatajabar...",
            "en": "The 100 MWp ground-mounted solar power plant in Tatajabar..."
          }
        },
        {
          "type": "image",
          "src": "/pc.png",
          "caption": {
            "id": "Tatajabar ground-mounted Solar Power Plant (100 MWp)...",
            "en": "Tatajabar ground-mounted Solar Power Plant (100 MWp)..."
          }
        }
      ]
    }

  ];
  res.status(200).json({ projects });
}
