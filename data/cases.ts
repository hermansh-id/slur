export type CaseType = 'corruption' | 'terrorism' | 'human_trafficking' | 'drug_trafficking' | 'environmental' | 'fraud';

export interface Case {
  id: string;
  name: string;
  type: CaseType;
  institution: string;
  impactScore: number; // 1-100 scale to rank importance
  date: string;
  status: 'Ongoing' | 'Closed';
  keyFigures: string[];
  description: string;
  background: string;
  investigation: string;
  legalProceedings: string;
  keyFiguresDetails: {
    name: string;
    role: string;
    description: string;
  }[];
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
  relatedNews: {
    title: string;
    source: string;
    date: string;
    url: string;
  }[];
}

export const cases: Case[] = [
  // Corruption cases will be kept in corruption-cases.ts
  
  // Terrorism Cases
  {
    id: "bali-bombing-2002",
    name: "Bali Bombing 2002",
    type: "terrorism",
    institution: "Jemaah Islamiyah",
    impactScore: 95,
    date: "2002-10-12",
    status: "Closed",
    keyFigures: ["Imam Samudra", "Amrozi", "Ali Imron"],
    description: "The 2002 Bali bombings were a series of terrorist attacks that took place on October 12, 2002, in the tourist district of Kuta on the Indonesian island of Bali.",
    background: "The attacks were the deadliest act of terrorism in Indonesia's history, killing 202 people from 21 countries, including 88 Australians and 38 Indonesians. A further 209 people were injured.",
    investigation: "The investigation involved cooperation between Indonesian police, Australian Federal Police, and international agencies. It led to the identification and arrest of members of Jemaah Islamiyah, a violent Islamist group.",
    legalProceedings: "Several perpetrators were convicted and sentenced to death, including Imam Samudra, Amrozi, and Mukhlas, who were executed in November 2008.",
    keyFiguresDetails: [
      {
        name: "Imam Samudra",
        role: "Field Coordinator",
        description: "Planned and coordinated the attacks. He was executed by firing squad in 2008."
      },
      {
        name: "Amrozi",
        role: "Bomb Materials Supplier",
        description: "Purchased the chemicals and van used in the bombing. He was executed by firing squad in 2008."
      },
      {
        name: "Ali Imron",
        role: "Bomb Maker",
        description: "Helped assemble the bombs. He expressed remorse and received a life sentence instead of the death penalty."
      }
    ],
    timeline: [
      {
        date: "October 12, 2002",
        title: "Bombings Occur",
        description: "Three bombs were detonated: a backpack bomb in Paddy's Pub, a car bomb outside the Sari Club, and a small device near the U.S. consulate."
      },
      {
        date: "November 2002",
        title: "First Arrests",
        description: "Amrozi was arrested in East Java, leading to further arrests of key figures."
      },
      {
        date: "November 2008",
        title: "Executions",
        description: "Three main perpetrators (Imam Samudra, Amrozi, and Mukhlas) were executed by firing squad."
      }
    ],
    relatedNews: [
      {
        title: "Bali bombing: The aftermath 20 years on",
        source: "ABC News",
        date: "October 12, 2022",
        url: "#"
      },
      {
        title: "Bali bombing survivors still fighting for compensation 20 years later",
        source: "The Guardian",
        date: "October 10, 2022",
        url: "#"
      }
    ]
  },
  
  // Human Trafficking Case
  {
    id: "migrant-worker-trafficking-2019",
    name: "Migrant Worker Trafficking Ring",
    type: "human_trafficking",
    institution: "Cross-border Criminal Network",
    impactScore: 78,
    date: "2019-03-15",
    status: "Ongoing",
    keyFigures: ["Hasan Wijaya", "Maria Lestari"],
    description: "A major human trafficking operation that sent Indonesian workers to Malaysia and the Middle East under false pretenses, subjecting them to forced labor and debt bondage.",
    background: "The network operated across multiple provinces, targeting economically vulnerable individuals with promises of high-paying jobs abroad. Victims were charged excessive fees and had their documents confiscated upon arrival.",
    investigation: "The investigation began after several workers escaped and reported their conditions to Indonesian embassies. It revealed a sophisticated network involving recruitment agencies, document forgers, and corrupt officials.",
    legalProceedings: "Several arrests have been made, with two kingpins currently on trial. The case has prompted reforms in Indonesia's migrant worker protection laws.",
    keyFiguresDetails: [
      {
        name: "Hasan Wijaya",
        role: "Network Leader",
        description: "Operated multiple fraudulent recruitment agencies across Indonesia. Currently on trial facing up to 15 years imprisonment."
      },
      {
        name: "Maria Lestari",
        role: "Document Forger",
        description: "Provided falsified documents and work permits for thousands of victims. Cooperating with authorities for a reduced sentence."
      }
    ],
    timeline: [
      {
        date: "March 2019",
        title: "Investigation Launched",
        description: "After reports from multiple victims, police began investigating the trafficking network."
      },
      {
        date: "June 2019",
        title: "First Arrests",
        description: "Police conducted raids in Jakarta, Surabaya, and Medan, arresting 12 suspects."
      },
      {
        date: "January 2023",
        title: "Trial Begins",
        description: "The trial of the two main suspects began in Jakarta District Court."
      }
    ],
    relatedNews: [
      {
        title: "Indonesia Cracks Down on Human Trafficking Networks",
        source: "Jakarta Post",
        date: "July 10, 2022",
        url: "#"
      },
      {
        title: "Victims of Trafficking Ring Share Their Stories",
        source: "Kompas",
        date: "February 5, 2023",
        url: "#"
      }
    ]
  },
  
  // Drug Trafficking Case
  {
    id: "golden-triangle-network-2021",
    name: "Golden Triangle Drug Network",
    type: "drug_trafficking",
    institution: "International Drug Syndicate",
    impactScore: 88,
    date: "2021-07-22",
    status: "Ongoing",
    keyFigures: ["Freddy Budiman", "Andi Sulaiman"],
    description: "A major drug trafficking operation smuggling methamphetamine and heroin from the Golden Triangle region into Indonesia through various ports.",
    background: "The network established sophisticated smuggling routes through Malaysia and the Philippines, using fishing vessels and cargo ships to transport narcotics worth billions of rupiah.",
    investigation: "Joint operations between BNN (National Narcotics Agency), Customs, and international partners led to the seizure of over 1 ton of methamphetamine and 500kg of heroin.",
    legalProceedings: "Several mid-level operatives have been arrested and sentenced. The alleged kingpin remains at large with an Interpol Red Notice issued.",
    keyFiguresDetails: [
      {
        name: "Freddy Budiman",
        role: "Alleged Kingpin",
        description: "Suspected of controlling the Indonesian distribution network from abroad. Currently wanted by Interpol."
      },
      {
        name: "Andi Sulaiman",
        role: "Local Distribution Head",
        description: "Managed distribution across Java and Sumatra. Sentenced to life imprisonment in 2022."
      }
    ],
    timeline: [
      {
        date: "July 2021",
        title: "Major Seizure",
        description: "Authorities seized 1 ton of methamphetamine at Tanjung Priok Port in Jakarta."
      },
      {
        date: "September 2021",
        title: "Network Exposed",
        description: "Investigation revealed the extent of the network's operations across Southeast Asia."
      },
      {
        date: "March 2023",
        title: "International Cooperation",
        description: "Joint operation with Malaysian and Thai authorities led to additional arrests."
      }
    ],
    relatedNews: [
      {
        title: "Indonesia's Largest Drug Bust: Behind the Investigation",
        source: "Tempo",
        date: "August 15, 2022",
        url: "#"
      },
      {
        title: "Golden Triangle Drugs Continue to Flood Indonesian Market",
        source: "Jakarta Post",
        date: "April 3, 2023",
        url: "#"
      }
    ]
  },
  
  // Environmental Crime Case
  {
    id: "kalimantan-illegal-logging-2020",
    name: "Kalimantan Illegal Logging Operation",
    type: "environmental",
    institution: "Timber Companies & Local Officials",
    impactScore: 82,
    date: "2020-05-10",
    status: "Ongoing",
    keyFigures: ["Bambang Sutrisno", "Robert Tantular"],
    description: "A massive illegal logging operation in protected forests in Kalimantan, involving corporate entities and corrupt local officials.",
    background: "The operation cleared over 50,000 hectares of protected forest over several years, causing severe environmental damage and displacing indigenous communities.",
    investigation: "Satellite imagery analysis and whistleblower reports led to an investigation by the Ministry of Environment and Forestry, revealing a network of corrupt permits and laundered timber.",
    legalProceedings: "Several company executives and local officials have been charged. The case has highlighted weaknesses in forest protection enforcement.",
    keyFiguresDetails: [
      {
        name: "Bambang Sutrisno",
        role: "Timber Company CEO",
        description: "Allegedly orchestrated the illegal logging operation through shell companies. Currently on trial."
      },
      {
        name: "Robert Tantular",
        role: "Former Local Official",
        description: "Accused of issuing illegal permits in exchange for bribes. Sentenced to 8 years in prison."
      }
    ],
    timeline: [
      {
        date: "May 2020",
        title: "Investigation Launched",
        description: "Ministry of Environment and Forestry began investigating after NGO reports of massive deforestation."
      },
      {
        date: "November 2020",
        title: "Corporate Raids",
        description: "Authorities raided offices of suspected companies in Jakarta and Pontianak."
      },
      {
        date: "February 2023",
        title: "Trial Begins",
        description: "The trial of key suspects began in Jakarta Anti-Corruption Court."
      }
    ],
    relatedNews: [
      {
        title: "The Devastating Impact of Illegal Logging in Kalimantan",
        source: "National Geographic Indonesia",
        date: "June 20, 2022",
        url: "#"
      },
      {
        title: "Indigenous Communities Fight Back Against Illegal Logging",
        source: "Mongabay Indonesia",
        date: "March 15, 2023",
        url: "#"
      }
    ]
  },
  
  // Fraud Case
  {
    id: "investment-ponzi-scheme-2022",
    name: "Crypto Investment Ponzi Scheme",
    type: "fraud",
    institution: "Binomo Investment Group",
    impactScore: 75,
    date: "2022-01-15",
    status: "Ongoing",
    keyFigures: ["Doni Salmanan", "Indra Kenz"],
    description: "A sophisticated Ponzi scheme that defrauded over 10,000 Indonesians through fake cryptocurrency and forex investment platforms.",
    background: "The scheme promised returns of up to 80% monthly through algorithmic trading, attracting investors across Indonesia. The operation collected an estimated Rp 4.5 trillion before collapsing.",
    investigation: "The investigation began after multiple investor complaints. Digital forensics revealed that no actual trading occurred, with new investor funds used to pay earlier investors.",
    legalProceedings: "The main suspects have been arrested and charged with fraud and money laundering. Authorities are working to recover assets for victims.",
    keyFiguresDetails: [
      {
        name: "Doni Salmanan",
        role: "Founder & CEO",
        description: "Created and promoted the fraudulent investment platform. Currently in detention awaiting trial."
      },
      {
        name: "Indra Kenz",
        role: "Marketing Director",
        description: "Led an aggressive social media campaign targeting young investors. Charged with fraud and money laundering."
      }
    ],
    timeline: [
      {
        date: "January 2022",
        title: "Scheme Collapses",
        description: "Investors were unable to withdraw funds, leading to widespread complaints."
      },
      {
        date: "March 2022",
        title: "Arrests Made",
        description: "Police arrested the two main suspects after raids in Jakarta and Bali."
      },
      {
        date: "June 2023",
        title: "Asset Recovery",
        description: "Authorities seized properties, luxury vehicles, and cryptocurrency wallets associated with the scheme."
      }
    ],
    relatedNews: [
      {
        title: "Indonesia's Biggest Investment Scam: How Thousands Were Duped",
        source: "CNBC Indonesia",
        date: "April 5, 2022",
        url: "#"
      },
      {
        title: "Crypto Scam Victims Form Coalition to Recover Funds",
        source: "Detik Finance",
        date: "May 12, 2023",
        url: "#"
      }
    ]
  }
]; 