import type { NextApiRequest, NextApiResponse } from 'next';
import type { News } from '@/types/news';

interface NewsResponse {
    news: News[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<NewsResponse>
) {
    const news: News[] = [
        {
            id: 1,
            title: {
                id: "Tatajabar ground-mounted PLTS 100 MWp terbesar di Indonesia",
                en: "Tatajabar ground-mounted 100 MWp solar power plant, the largest in Indonesia"
            },
            slug: "Pembangunan PLTS Groundmounted merupakan kerja sama PLN dengan PT Aruna.",
            headerImage: "/pc.png",
            date: "2024-10-28",
            location: "Purwakarta",
            author: "Admin Aruna Hijau Power",
            content: [
                {
                    type: "paragraph",
                    text: {
                        id: "PT PLN (Persero) Group melalui anak usahanya, PLN Batam berkolaborasi bersama PT Aruna Cahaya Pratama (Aruna PV) dalam pembangunan proyek Pembangkit Listrik Tenaga Surya ground-mounted terbesar di Indonesia berkapasitas 100 Megawatt peak (MWp). Kerja sama ini merupakan wujud kolaborasi PLN bersama pihak swasta untuk mendukung pengurangan emisi karbon sekaligus meningkatkan daya saing industri.",
                        en: "PT PLN (Persero) Group, through its subsidiary PLN Batam, is collaborating with PT Aruna Cahaya Pratama (Aruna PV) in the construction of the largest ground-mounted solar power plant in Indonesia with a capacity of 100 megawatts peak (MWp). This collaboration is a manifestation of PLN's cooperation with the private sector to support carbon emission reduction while increasing industrial competitiveness"
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Dirjen Ketenagalistrikan Kementerian ESDM, Jisman P Hutajulu, menyatakan bahwa proyek ini merupakan wujud konkret sinergi antara pemerintah, BUMN, dan swasta dalam mewujudkan penyediaan energi bersih. \"Acara ini merupakan sebuah tonggak bersejarah dan merupakan bukti nyata dari sinergi antara pemerintah, BUMN dan swasta dalam penyediaan tenaga listrik melalui energi terbarukan,\" ujarnya.",
                        en: "Director General of Electricity at the Ministry of Energy and Mineral Resources, Jisman P Hutajulu, stated that this project is a concrete manifestation of the synergy between the government, state-owned enterprises, and the private sector in realizing the provision of clean energy. ‘This event is a historic milestone and clear evidence of the synergy between the government, state-owned enterprises, and the private sector in providing electricity through renewable energy,’ he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Ia mengapresiasi kolaborasi ini dan berharap proyek ini menjadi contoh bagi pengembangan energi baru terbarukan di Indonesia. \"Semua punya peran, ini adalah contoh yang baik untuk project serupa di masa depan,\" tambahnya.",
                        en: "He appreciates this collaboration and hopes that this project will serve as an example for the development of new and renewable energy in Indonesia. “Everyone has a role to play. This is a good example for similar projects in the future,” he added"
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Direktur Utama PLN, Darmawan Prasodjo, menambahkan bahwa di tengah kondisi iklim global yang memanas, dibutuhkan upaya bersama untuk menyelamatkan bumi. \"Namun, kita juga harus menjaga pertumbuhan ekonomi, menciptakan lapangan kerja, dan menyejahterakan masyarakat,\" ucapnya.",
                        en: "PLN President Director Darmawan Prasodjo added that amid global warming, joint efforts are needed to save the earth. “However, we must also maintain economic growth, create jobs, and improve the welfare of the people,” he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Menurut Darmawan, proyek ini merupakan dukungan PLN terhadap industri nasional yang kini dituntut menggunakan energi bersih agar produk dalam negeri memiliki nilai tambah di pasar global. \"PLN mendukung penuh industri Indonesia bertumbuh lewat pasokan listrik yang ramah lingkungan,\" ujarnya.",
                        en: "According to Darmawan, this project is PLN's support for the national industry, which is now required to use clean energy so that domestic products have added value in the global market. “PLN fully supports the growth of Indonesian industry through environmentally friendly electricity supply,” he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Proyek PLTS 100 MWp ini akan menggunakan sekitar 170 ribu modul panel surya dengan sistem ground-mounted (dipasang di tanah) dan tersebar di lima lokasi di atas lahan seluas lebih dari 85 hektare di Kawasan Kota Bukit Indah Industrial City.",
                        en: "This 100 MWp solar power plant project will use around 170,000 solar panel modules with a ground-mounted system spread across five locations covering an area of more than 85 hectares in the Bukit Indah Industrial City area."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Direktur Utama Aruna PV, Audwin Purwadi, mengatakan bahwa kawasan industri tersebut sedang bertumbuh dan banyak perusahaan multinasional yang membutuhkan pasokan listrik hijau sebagai syarat operasional.",
                        en: "Aruna PV President Director Audwin Purwadi said that the industrial area is growing and many multinational companies require green electricity supplies as a condition for operations"
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Audwin menjelaskan proyek ini terwujud karena dukungan dari PLN, PT Tatajabar Sejahtera (sebagai offtaker), serta PT Besland Pertiwi (pemilik lahan proyek). “PLN memberi kesempatan untuk menjalin kerja sama dalam pemanfaatan energi baru terbarukan,” ungkapnya.",
                        en: "Audwin explained that this project was realized thanks to the support of PLN, PT Tatajabar Sejahtera (as the offtaker), and PT Besland Pertiwi (the project landowner). “PLN provided the opportunity to establish cooperation in the utilization of new and renewable energy,” he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Pembangunan PLTS ini juga akan menciptakan dampak ekonomi substansial, mulai dari lapangan kerja, peluang bisnis lokal, hingga mendorong pertumbuhan ekonomi wilayah sekitar.",
                        en: "The construction of this solar power plant will also have a substantial economic impact, ranging from job creation and local business opportunities to boosting economic growth in the surrounding area."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Pembangunan PLTS dengan kapasitas 100 MWp merupakan wujud komitmen kami kepada negara untuk menjadi pelopor pemanfaatan sumber energi terbarukan dan beralih ke sumber energi yang lebih berkelanjutan,” tutup Audwin.",
                        en: "The construction of a 100 MWp solar power plant is a manifestation of our commitment to the country to become a pioneer in the utilization of renewable energy sources and to switch to more sustainable energy sources, concluded Audwin."
                    }
                },
                {
                    type: "image",
                    src: "/tjs2.jpg",
                    caption: "Peresmian PLTS oleh Kementerian ESDM bersama PLN dan Aruna Hijau Power."
                },
            ]
        },
        {
            id: 2,
            title: {
                id: "PLTS Ground-mounted terbesar di Indonesia resmi beroperasi",
                en: "The largest ground-mounted solar power plant in Indonesia officially operates"
            },
            slug: "plts-ground-mounted-terbesar-di-indonesia-resmi-beroperasi",
            headerImage: "/tjs2.jpg",
            date: "2024-08-30",
            location: "Purwakarta",
            author: "Admin Aruna Hijau Power",
            content: [
                {
                    type: "paragraph",
                    text: {
                        id: "Kementerian Energi dan Sumber Daya Mineral (ESDM) meresmikan Pembangkit Listrik Tenaga Surya (PLTS) Ground-Mounted dengan kapasitas 100 megawatt peak (MWp) yang berlokasi di Purwakarta, Jawa Barat.",
                        en: "The Ministry of Energy and Mineral Resources (ESDM) inaugurated a ground-mounted solar power plant (PLTS) with a capacity of 100 megawatts peak (MWp) located in Purwakarta, West Java."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Direktur Jenderal Ketenagalistrikan Kementerian ESDM, Jisman Hutajulu, mengatakan PLTS ground-mounted terbesar di Indonesia ini bukan hanya sekadar sebuah fasilitas pembangkit listrik, tetapi juga sebuah simbol sejarah baru dalam upaya transisi energi menuju masa depan yang lebih bersih dan berkelanjutan.`,
                        en: `The Director General of Electricity at the Ministry of Energy and Mineral Resources, Jisman Hutajulu, said that the largest ground-mounted solar power plant in Indonesia is not just a power generation facility, but also a symbol of a new era in the transition to a cleaner and more sustainable future.`
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `"Peresmian PLTS Ground-Mounted 100 MWp ini merupakan bukti nyata bahwa Indonesia memiliki potensi besar dalam pengembangan energi surya," ujar Jisman melalui keterangan resmi, dikutip Jumat (30/8).`,
                        en: "“The inauguration of this 100 MWp ground-mounted solar power plant is clear evidence that Indonesia has great potential in solar energy development,” said Jisman in an official statement quoted on Friday (30/8).`"
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Jisman menyampaikan, Indonesia memiliki potensi energi surya yang luar biasa mencapai 3.295 gigawatt (GW). Namun, hingga saat ini Indonesia baru memanfaatkannya sekitar 270 MW.`,
                        en: "Jisman said that Indonesia has tremendous solar energy potential, reaching 3,295 gigawatts (GW). However, to date, Indonesia has only utilized around 270 MW."
                    }
                },
                {
                    type: "image",
                    src: "/tjs1.jpg",
                    caption: "Peresmian PLTS Ground-Mounted Terbesar di Indonesia, berlokasi di Purawakarta, Jawa Barat, Rabu (28/8/2024)"
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Dari potensi tersebut, menurut dia, Indonesia memiliki peluang untuk menjadi pemimpin dalam transisi energi di tingkat regional dan global. "Namun untuk mewujudkannya, diperlukan optimalisasi dalam perencanaan penyediaan tenaga listrik yang lebih bersih dan tetap andal," katanya.`,
                        en: "From this potential, he believes Indonesia has the opportunity to become a leader in energy transition at the regional and global levels. “However, to achieve this, optimization is needed in planning for a cleaner and more reliable electricity supply,” he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Jisman memastikan, pemerintah terus mendorong pembangunan infrastruktur ketenagalistrikan secara berkeadilan, berkelanjutan, dan berwawasan lingkungan, serta bertujuan untuk menjamin kebutuhan listrik nasional dalam jumlah yang cukup, kualitas yang baik, dan harga yang wajar.`,
                        en: 'Jisman assured that the government continues to promote equitable, sustainable, and environmentally conscious electricity infrastructure development, with the aim of ensuring sufficient national electricity supply, good quality, and reasonable prices.'
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Sementara itu, Direktur Utama PT PLN (Persero), Darmawan Prasodjo, menyampaikan proyek PLTS Ground-Mounted 100 MWp dapat diselesaikan hanya dalam 7 bulan. Hal ini merupakan bentuk kolaborasi dari berbagai pihak untuk mengakselerasi transisi energi menuju Net Zero Emission.`,
                        en: "Meanwhile, PT PLN (Persero) President Director Darmawan Prasodjo said that the 100 MWp Ground-Mounted Solar Power Plant project could be completed in just seven months. This is a form of collaboration between various parties to accelerate the energy transition towards Net Zero Emission."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `"PLN tidak bisa sendiri dalam menghadapi tantangan-tantangan ke depan dalam memenuhi kebutuhan energi khususnya percepatan penggunaan energi hijau," ujar Darmawan.`,
                        en: '“PLN cannot face the challenges ahead in meeting energy needs, especially the acceleration of green energy use, alone,” said Darmawan.'
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `Direktur Utama PT Aruna Hijau Power, Adi Dharmanto, selaku pengembang, mengatakan dengan memanfaatkan potensi energi surya yang ada di Purwakarta ini, PLTS Ground-Mounted 100 MWp dengan 160.000 panel PV dapat menghasilkan energi sebesar 150 GWh per tahun.`,
                        en: 'The President Director of PT Aruna Hijau Power, Adi Dharmanto, as the developer, said that by utilizing the solar energy potential in Purwakarta, the 100 MWp Ground-Mounted Solar Power Plant with 160,000 PV panels can generate 150 GWh of energy per year.'
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: `"Hal ini setara dengan pengurangan emisi karbon sebesar 118.725 ton CO2," kata Adi.`,
                        en: '"This is equivalent to reducing CO2 emissions by 118.725 tons," said Adi.'
                    }
                },
                {
                    type: "image",
                    src: "/peresmian.png",
                    caption: "Peresmian PLTS Ground-Mounted Terbesar di Indonesia, berlokasi di Purawakarta, Jawa Barat, Rabu (28/8/2024)"
                },
            ]
        },
        {
            id: 3,
            title: {
                id: "Ri Punya PLTS Daratan Terbesar, Kurangi Karbon Dioksida",
                en: "Indonesia Has a Largest Ground-Mounted Solar Power Plant, Reduce Carbon Emissions"
            },
            slug: "ri-punya-plts-daratan-terbesar-kurangi-karbon-dioksida",
            headerImage: "/peresmian.jpg",
            date: "2024-08-28",
            location: "Purwakarta",
            author: "Admin Aruna Hijau Power",
            content: [
                {
                    type: "paragraph",
                    text: {
                        id: "PT PLN (Persero) Group melalui anak usahanya, PLN Batam berkolaborasi bersama PT Aruna Cahaya Pratama (Aruna PV) dalam pembangunan proyek Pembangkit Listrik Tenaga Surya ground-mounted terbesar di Indonesia berkapasitas 100 Megawatt peak (MWp). Kerja sama ini merupakan wujud kolaborasi PLN bersama pihak swasta untuk mendukung pengurangan emisi karbon sekaligus meningkatkan daya saing industri.",
                        en: "PT PLN (Persero) Group, through its subsidiary PLN Batam, is collaborating with PT Aruna Cahaya Pratama (Aruna PV) to develop the largest ground-mounted solar power plant project in Indonesia with a capacity of 100 Megawatt peak (MWp). This partnership is a form of collaboration between PLN and the private sector to support carbon emission reductions while enhancing industrial competitiveness."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Dirjen Ketenagalistrikan Kementerian ESDM, Jisman P Hutajulu, menyatakan bahwa proyek ini merupakan wujud konkret sinergi antara pemerintah, BUMN, dan swasta dalam mewujudkan penyediaan energi bersih. \"Acara ini merupakan sebuah tonggak bersejarah dan merupakan bukti nyata dari sinergi antara pemerintah, BUMN dan swasta dalam penyediaan tenaga listrik melalui energi terbarukan,\" ujarnya.",
                        en: "The Director General of Electricity at the Ministry of Energy and Mineral Resources (ESDM), Jisman P Hutajulu, stated that this project is a concrete form of synergy between the government, state-owned enterprises, and the private sector in realizing clean energy supply. \"This event is a historic milestone and real proof of synergy among the government, SOEs, and the private sector in supplying electricity through renewable energy,\" he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Ia mengapresiasi kolaborasi ini dan berharap proyek ini menjadi contoh bagi pengembangan energi baru terbarukan di Indonesia. \"Semua punya peran, ini adalah contoh yang baik untuk project serupa di masa depan,\" tambahnya.",
                        en: "He appreciated this collaboration and hopes the project will serve as a model for the development of new and renewable energy in Indonesia. \"Everyone has a role; this is a good example for similar future projects,\" he added."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Direktur Utama PLN, Darmawan Prasodjo, menambahkan bahwa di tengah kondisi iklim global yang memanas, dibutuhkan upaya bersama untuk menyelamatkan bumi. \"Namun, kita juga harus menjaga pertumbuhan ekonomi, menciptakan lapangan kerja, dan menyejahterakan masyarakat,\" ucapnya.",
                        en: "PLN President Director, Darmawan Prasodjo, added that amid the warming global climate, collective efforts are needed to save the planet. \"However, we must also maintain economic growth, create jobs, and improve community welfare,\" he said."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Menurut Darmawan, proyek ini merupakan dukungan PLN terhadap industri nasional yang kini dituntut menggunakan energi bersih agar produk dalam negeri memiliki nilai tambah di pasar global. \"PLN mendukung penuh industri Indonesia bertumbuh lewat pasokan listrik yang ramah lingkungan,\" ujarnya.",
                        en: "According to Darmawan, this project is PLN’s support for the national industry, which is now required to use clean energy so that domestic products have added value in the global market. \"PLN fully supports Indonesia’s industry to grow through environmentally friendly electricity supply,\" he stated."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Proyek PLTS 100 MWp ini akan menggunakan sekitar 170 ribu modul panel surya dengan sistem ground-mounted (dipasang di tanah) dan tersebar di lima lokasi di atas lahan seluas lebih dari 85 hektare di Kawasan Kota Bukit Indah Industrial City.",
                        en: "The 100 MWp solar power project will utilize around 170,000 solar panel modules with a ground-mounted system and will be spread across five locations on over 85 hectares of land in the Bukit Indah Industrial City area."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Direktur Utama Aruna PV, Audwin Purwadi, mengatakan bahwa kawasan industri tersebut sedang bertumbuh dan banyak perusahaan multinasional yang membutuhkan pasokan listrik hijau sebagai syarat operasional.",
                        en: "President Director of Aruna PV, Audwin Purwadi, said that the industrial area is growing and many multinational companies require green electricity supply as part of their operational requirements."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Audwin menjelaskan proyek ini terwujud karena dukungan dari PLN, PT Tatajabar Sejahtera (sebagai offtaker), serta PT Besland Pertiwi (pemilik lahan proyek). “PLN memberi kesempatan untuk menjalin kerja sama dalam pemanfaatan energi baru terbarukan,” ungkapnya.",
                        en: "Audwin explained that this project came to fruition thanks to support from PLN, PT Tatajabar Sejahtera (as the offtaker), and PT Besland Pertiwi (the project landowner). “PLN provided the opportunity to collaborate in the use of new and renewable energy,” he revealed."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "Pembangunan PLTS ini juga akan menciptakan dampak ekonomi substansial, mulai dari lapangan kerja, peluang bisnis lokal, hingga mendorong pertumbuhan ekonomi wilayah sekitar.",
                        en: "The construction of this solar power plant will also create substantial economic impacts, from job creation and local business opportunities to boosting regional economic growth."
                    }
                },
                {
                    type: "paragraph",
                    text: {
                        id: "“Pembangunan PLTS dengan kapasitas 100 MWp merupakan wujud komitmen kami kepada negara untuk menjadi pelopor pemanfaatan sumber energi terbarukan dan beralih ke sumber energi yang lebih berkelanjutan,” tutup Audwin.",
                        en: "“The construction of the 100 MWp solar power plant is our commitment to the nation to become a pioneer in the utilization of renewable energy sources and transition to more sustainable energy,” concluded Audwin."
                    }
                },
                {
                    type: "image",
                    src: "/gambar3.jpg",
                    caption: "Pembangkit Listrik Tenaga Surya (PLTS) ground-mounted terbesar di Indonesia dengan kapasitas 100 Megawatt peak (MWp) di Kawasan Industri Kota Bukit Indah (KBI), Kabupaten Purwakarta, Jawa Barat."
                },
            ]
        }
    ];

    res.status(200).json({ news });
}
