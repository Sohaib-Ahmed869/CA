const certificates = [
  // Community Services
  {
    industry: "Community Services",
    qualification:
      "CHC30121 Certificate III in Early Childhood Education and Care",
    price: "$1,500",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC50121 Diploma of Early Childhood Education and Care",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC30221 Certificate III in School Based Education Support",
    price: "$2,250",
    type: "educube",
  },
  {
    industry: "Community Services",
    qualification: "CHC40221 Certificate IV in School Based Education Support",
    price: "$2,250",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC33021 Certificate III in Individual Support",
    price: "$1,500",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC43015 Certificate IV in Ageing Support",
    price: "$1,800",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC43121 Certificate IV in Disability Support",
    price: "$1,800",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC42021 Certificate IV in Community Services",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Community Services",
    qualification: "CHC52021 Diploma of Community Services",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC43315 Certificate IV in Mental Health",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC50321 Diploma of Child, Youth and Family Intervention",
    price: "Not Listed",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC50421 Diploma of Youth Work",
    price: "$2,200",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC51015 Diploma of Counselling",
    price: "$2,300",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC53315 Diploma of Mental Health",
    price: "$2,200",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC62015 Advanced Diploma of Community Sector Management",
    price: "$2,300",
    type: "aes",
  },
  {
    industry: "Community Services",
    qualification: "CHC53215 Diploma of Alcohol and other Drugs",
    price: "$2,700",
    type: "educube",
  },
  {
    industry: "Community Services",
    qualification: "CHC41015 Certificate IV in Celebrancy",
    price: "Not Listed",
    type: "aes",
  },

  // Business
  {
    industry: "Business",
    qualification: "BSB30120 Certificate III in Business",
    price: "$2,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification:
      "BSB40320 Certificate IV in Entrepreneurship and New Business",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Business",
    qualification: "BSB51319 Diploma of Work Health and Safety",
    price: "$2,500",
    type: "aes",
  },
  {
    industry: "Business",
    qualification: "BSB41419 Certificate IV in Work Health and Safety",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB40520 Certificate IV in Leadership and Management",
    price: "$2,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB50120 Diploma of Business",
    price: "$2,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB60120 Advanced Diploma of Business",
    price: "$2,100",
    type: "aes",
  },
  {
    industry: "Business",
    qualification: "BSB50420 Diploma of Leadership and Management",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Business",
    qualification: "BSB60420 Advanced Diploma of Leadership and Management",
    price: "$2,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB80120 Graduate Diploma of Management (Learning)",
    price: "$2,200",
    type: "aes",
  },
  {
    industry: "Business",
    qualification: "BSB60520 Advanced Diploma of Marketing and Communication",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB80320 Graduate Diploma of Strategic Leadership",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB80220 Graduate Diploma of Portfolio Management",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB60619 Advanced Diploma of Work Health and Safety",
    price: "$2,700",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB50320 Diploma of Human Resource Management",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "TLI30321 Certificate III in Supply Chain Operations",
    price: "$4,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "BSB50920 Diploma of Quality Auditing",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Business",
    qualification: "TLI40324 Certificate IV in Supply Chain Operations",
    price: "Not Listed",
    type: "educube",
  },

  // Beauty Therapy & Hairdressing
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "HLT52021 Diploma of Remedial Massage",
    price: "$2,500",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB20121 Certificate II in Retail Cosmetics",
    price: "$2,700",
    type: "default",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB30121 Certificate III in Beauty Services",
    price: "$2,300",
    type: "default",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB40121 Certificate IV in Beauty Therapy",
    price: "$1,800",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB50121 Diploma of Beauty Therapy",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB30416 Certificate III in Hairdressing",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB30516 Certificate III in Barbering",
    price: "$2,000",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB40216 Certificate IV in Hairdressing",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB50216 Diploma of Salon Management",
    price: "$2,700",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "HLT42021 Certificate IV in Massage Therapy",
    price: "$3,000",
    type: "default",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB30321 Certificate III in Nail Technology",
    price: "$2,499",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB50216 Diploma of Salon Management",
    price: "$2,700",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification:
      "SHB60118 Advanced Diploma of Intense Pulsed Light and Laser for Hair Reduction",
    price: "$3,000",
    type: "aes",
  },
  {
    industry: "Beauty Therapy & Hairdressing",
    qualification: "SHB30221 Certificate III in Makeup",
    price: "$2,500",
    type: "educube",
  },

  // Finance & Accounting
  {
    industry: "Finance & Accounting",
    qualification: "FNS40222 Certificate IV in Accounting and Bookkeeping",
    type: "aes",
    price: "$2,100",
  },
  {
    industry: "Finance & Accounting",
    qualification: "FNS50222 Diploma of Accounting",
    type: "educube",
    price: "$2,500",
  },
  {
    industry: "Finance & Accounting",
    qualification:
      "FNS50322 Diploma of Finance and Mortgage Broking Management",
    type: "aes",
    price: "Not Listed",
  },
  {
    industry: "Finance & Accounting",
    qualification: "FNS30122 Certificate III in Financial Services",
    price: "$3,300",
    type: "default",
  },
  {
    industry: "Finance & Accounting",
    qualification: "FNS51822 Diploma of Financial Services",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Finance & Accounting",
    qualification: "FNS40821 Certificate IV in Finance and Mortgage Broking",
    price: "Not Listed",
    type: "educube",
  },

  // Information & Communications Technology
  {
    industry: "Information & Communications Technology",
    qualification: "ICT30519 Certificate III in Telecommunications Technology",
    price: "$3,500",
    type: "default",
  },
  {
    industry: "Information & Communications Technology",
    qualification: "ICT50220 Diploma of Information Technology",
    price: "$2,500",
    type: "educube",
  },

  // Training & Education
  {
    industry: "Training & Education",
    qualification: "TAE40122 Certificate IV in Training and Assessment",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Training & Education",
    qualification: "TAE50122 Diploma of Vocational Education and Training",
    price: "$3,500",
    type: "educube",
  },

  // Building & Construction
  {
    industry: "Building & Construction",
    qualification: "CPC31320 Certificate III in Wall and Floor Tiling",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC31220 Certificate III in Wall and Ceiling Lining",
    type: "educube",
    price: "$2,800",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC33020 Certificate III in Bricklaying/Blocklaying",
    type: "educube",
    price: "$2,500",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30220 Certificate III in Carpentry",
    price: "$2,500",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30320 Certificate III in Concreting",
    type: "educube",
    price: "$2,500",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC31420 Certificate III in Construction Waterproofing",
    type: "educube",
    price: "$2,500",
  },
  {
    industry: "Building & Construction",
    qualification:
      "RII30820 Certificate III in Civil Construction Plant Operations",
    price: "$3,000",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC32420 Certificate III in Plumbing",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC32620 Certificate III in Roof Plumbing",
    price: "$2,700",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC31020 Certificate III in Solid Plastering",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification:
      "CPC32320 Certificate III in Stonemasonry (Monumental/Installation)",
    price: "$3,400",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC31920 Certificate III in Joinery",
    type: "educube",
    price: "$3,500",
  },
  {
    industry: "Building & Construction",
    qualification:
      "CPC40120 Certificate IV in Building and Construction (Building)",
    price: "$2,500",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC40920 Certificate IV in Plumbing and Services",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC50220 Diploma of Building and Construction (Building)",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPP80221 Graduate Diploma of Building Design",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Building & Construction",
    qualification: "AHC30921 Certificate III in Landscape Construction",
    price: "$3,800",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30420 Certificate III in Demolition",
    price: "$4,300",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "BSB50820 Diploma of Project Management",
    price: "$3,000",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30920 Certificate III in Scaffolding",
    price: "$2,700",
    type: "default",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC32720 Certificate III in Gas Fitting",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Building & Construction",
    qualification: "MEM40119 Certificate IV in Engineering",
    price: "$4,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "BSB50820 Diploma of Project Management",
    price: "$3,000",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification: "BSB60220 Advanced Diploma of Conveyancing",
    type: "aes",
    price: "$3,000",
  },
  {
    industry: "Building & Construction",
    qualification: "CPP30119 Certificate III in Urban Pest Management",
    type: "aes",
    price: "$3,000",
  },
  {
    industry: "Building & Construction",
    qualification: "CPP40421 Certificate IV in Cleaning",
    type: "aes",
    price: "$2,000",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC10120 Certificate I in Construction",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30620 Certificate III in Painting and Decorating",
    price: "$2,500",
    type: "educube",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC41020 Certificate IV in Demolition",
    type: "educube",
    price: "$2,800",
  },
  {
    industry: "Building & Construction",
    qualification: "MSF30422 Certificate III in Glass and Glazing",
    type: "educube",
    price: "$2,700",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30120 Certificate III in Shopfitting",
    type: "educube",
    price: "Not Listed",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC30820 Certificate III in Roof Tiling",
    type: "educube",
    price: "$4,300",
  },
  {
    industry: "Building & Construction",
    qualification:
      "MSF31113 Certificate III in Cabinet Making and Timber Technology",
    price: "Not Listed",
    type: "default",
  },
  {
    industry: "Building & Construction",
    qualification: "MEM30219 Certificate III in Engineering",
    price: "$3,300",
    type: "aes",
  },
  {
    industry: "Building & Construction",
    qualification:
      "UEE32220 Certificate III in Air Conditioning and Refrigeration",
    type: "educube",
    price: "Not Listed",
  },
  {
    industry: "Building & Construction",
    qualification: "UEE30820 Certificate III in Electrotechnology Electrician",
    type: "educube",
    price: "$15,000",
  },
  {
    industry: "Building & Construction",
    qualification: "AUR31220 Certificate III in Mobile Plant Technology",
    type: "educube",
    price: "$4,200",
  },
  {
    industry: "Building & Construction",
    qualification: "AHC30722 Certificate III in Horticulture",
    type: "educube",
    price: "$4,000",
  },
  {
    industry: "Building & Construction",
    qualification: "AHC40422 Certificate IV in Horticulture",
    type: "educube",
    price: "$4,000",
  },
  {
    industry: "Building & Construction",
    qualification: "CPC60121 Advanced Diploma of Building Surveying",
    type: "educube",
    price: "$20,000",
  },

  // Additional industries like Automotive, Real Estate, Security Management, Fitness & Allied Health, Electrical, Travel and Tourism

  // Automotive
  {
    industry: "Automotive",
    qualification:
      "AUR30320 Certificate III in Automotive Electrical Technology",
    price: "$3,500",
    type: "aes",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR30620 Certificate III in Light Vehicle Mechanical Technology",
    type: "aes",
    price: "$3,000",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR31120 Certificate III in Heavy Commercial Vehicle Mechanical Technology",
    type: "aes",
    price: "$4,000",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR32120 Certificate III in Automotive Body Repair Technology",
    type: "aes",
    price: "Not Listed",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR32420 Certificate III in Automotive Refinishing Technology",
    type: "aes",
    price: "$4,000",
  },
  {
    industry: "Automotive",
    qualification: "AUR40216 Certificate IV in Automotive Mechanical Diagnosis",
    price: "$4,000",
    type: "educube",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR40620 Certificate IV in Automotive Electrical Technology",
    price: "$3,700",
    type: "default",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR40720 Certificate IV in Automotive Body Repair Technology",
    type: "aes",
    price: "Not Listed",
  },
  {
    industry: "Automotive",
    qualification:
      "AUR40820 Certificate IV in Automotive Mechanical Overhauling",
    price: "$4,000",
    type: "educube",
  },
  {
    industry: "Automotive",
    qualification: "AUR40116 Certificate IV in Automotive Management",
    price: "$4,000",
    type: "educube",
  },

  // Real Estate
  {
    industry: "Real Estate",
    qualification: "CPP51122 Diploma of Property (Agency Management)",
    type: "aes",
    price: "$2,500",
  },
  {
    industry: "Real Estate",
    qualification: "CPP40521 Certificate IV in Strata Community Management",
    price: "$3,800",
    type: "educube",
  },

  // Security Management
  {
    industry: "Security Management",
    qualification: "CPP50619 Diploma of Security Risk Management",
    type: "aes",
    price: "Not Listed",
  },
  {
    industry: "Security Management",
    type: "aes",
    qualification: "CPP41519 Certificate IV in Security Risk Analysis",
    price: "Not Listed",
  },

  // Fitness & Allied Health
  {
    industry: "Fitness & Allied Health",
    qualification: "SIS30321 Certificate III in Fitness",
    type: "aes",
    price: "$1,500",
  },
  {
    industry: "Fitness & Allied Health",
    type: "aes",
    qualification: "SIS40221 Certificate IV in Fitness",
    price: "$1,500",
  },
  {
    industry: "Fitness & Allied Health",
    qualification: "SIS30521 Certificate III in Sport Coaching",
    price: "$2,700",
    type: "educube",
  },
  {
    industry: "Fitness & Allied Health",
    qualification: "HLT33115 Certificate III in Health Services Assistance",
    price: "$3,000",
    type: "educube",
  },
  {
    industry: "Fitness & Allied Health",
    qualification: "HLT43021 Certificate IV in Allied Health Assistance",
    type: "aes",
    price: "$2,500",
  },
  {
    industry: "Fitness & Allied Health",
    qualification: "CHC43415 Certificate IV in Leisure and Health",
    price: "$2,700",
    type: "educube",
  },

  // Electrical
  {
    industry: "Electrical",
    qualification: "UEE30820 Certificate III in Electrotechnology Electrician",
    price: "$15,000",
    type: "educube",
  },

  // Travel and Tourism
  {
    industry: "Travel and Tourism",
    qualification: "SIT50122 Diploma of Travel and Tourism",
    type: "aes",
    price: "$3,000",
  },
];

export default certificates;
