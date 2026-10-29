export type Certificate = {
  title: string;
  issuer: string;
  date: string; // mis. "Sep 2026"
  verifyUrl?: string; // link verifikasi / kredensial (Credly, dll.)
  credentialId?: string;
  // Gambar ada di public/certificates/, mis. "/certificates/nama-file.webp"
  image?: string;
};

// Urutan = urutan tampil. Pratinjau di beranda memakai 4 yang pertama.
export const certificates: Certificate[] = [
  {
    title: "Red Hat System Administration I (RH124)",
    issuer: "Red Hat",
    date: "Agu 2025",
    verifyUrl: "https://www.credly.com/badges/9e371558-7e28-4cf1-a32b-714083016d44",
    image: "/certificates/red-hat-system-administration-i-rh124.webp",
  },
  {
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    date: "Sep 2026",
    verifyUrl: "https://www.credly.com/badges/d0ed3400-2b39-4f33-b391-e970bfe43e5a",
    image: "/certificates/getting-started-with-data.webp",
  },
  {
    title: "MongoDB Node.js Developer Path for SmartBridge",
    issuer: "MongoDB",
    date: "Okt 2026",
    credentialId: "MDB0yq1663h20",
    image: "/certificates/mongodb-node-js-developer-path-for-smartbridge.webp",
  },
  {
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: "Sep 2026",
    credentialId: "ALM-COURSE_3825456",
    image: "/certificates/unleashing-the-power-of-ai-agents.webp",
  },
  {
    title: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    date: "Sep 2026",
    credentialId: "ALM-COURSE_4058910",
    image: "/certificates/classifying-data-using-ibm-granite.webp",
  },
  {
    title: "Getting Started with Data: Learning Plan",
    issuer: "IBM SkillsBuild",
    date: "Sep 2026",
    credentialId: "PLAN-14F2691E3A32",
    image: "/certificates/getting-started-with-data-earn-a-credential-credly.webp",
  },
  {
    title: "Anggota Divisi Keamanan, FTI Open House 2026",
    issuer: "FTI Open House",
    date: "2026",
    image: "/certificates/anggota-divisi-keamanan-fti-open-house-2026.webp",
  },
  {
    title: "Connecting to a MongoDB Database Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB73sw7mx9of",
    image: "/certificates/connecting-to-a-mongodb-database-smartbridge.webp",
  },
  {
    title: "Connecting to MongoDB in Node.js Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBf9973bezfp",
    image: "/certificates/connecting-to-mongodb-in-node-js-smartbridge.webp",
  },
  {
    title: "MongoDB Aggregation Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBl1f4cjsqyy",
    image: "/certificates/mongodb-aggregation-smartbridge.webp",
  },
  {
    title: "MongoDB Aggregation with Node.js Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBaab6jhqrku",
    image: "/certificates/mongodb-aggregation-with-node-js-smartbridge.webp",
  },
  {
    title: "MongoDB and the Document Model Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB6akl04el4k",
    image: "/certificates/mongodb-and-the-document-model-smartbridge.webp",
  },
  {
    title: "MongoDB Atlas Search Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB8lnqkgl8qj",
    image: "/certificates/mongodb-atlas-search-smartbridge.webp",
  },
  {
    title: "MongoDB Basics For Students",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBsu2oeer3x5",
    image: "/certificates/mongodb-basics-for-students.webp",
  },
  {
    title: "MongoDB CRUD Operations",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBjgqrkqlkxc",
    image: "/certificates/mongodb-crud-operations.webp",
  },
  {
    title: "MongoDB CRUD Operations in Node.js Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDBkadwiotsp1",
    image: "/certificates/mongodb-crud-operations-in-node-js-smartbridge.webp",
  },
  {
    title: "MongoDB Data Modeling Intro Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB57nxt9pcep",
    image: "/certificates/mongodb-data-modeling-intro-smartbridge.webp",
  },
  {
    title: "MongoDB Indexing Design Fundamentals",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB84plei454g",
    image: "/certificates/mongodb-indexing-design-fundamentals.webp",
  },
  {
    title: "MongoDB Transactions Smartbridge",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MDB6bhifmqiwu",
    image: "/certificates/mongodb-transactions-smartbridge.webp",
  },
];
