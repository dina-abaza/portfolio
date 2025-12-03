// *****************************************************************
// الملف: services_detailes_model.js (الكود المُعدَّل)
// *****************************************************************

export const mobileAppShapes = [
  { id: 1, title: "An attractive and user-friendly interface (UI/UX).", image: "/sdp_images/phone.png", },
  { id: 2, title: "High speed and performance.", image: "/sdp_images/limiter.png", },
  { id: 3, title: "Clean and maintainable code.", image: "/sdp_images/code.png", },
  { id: 4, title: "Continuous support and updates.", image: "/sdp_images/support.png", },
  { id: 5, title: "Publishing the app on app stores.", image: "/sdp_images/upload.png", }
];

export const ourProcess = [
  { id: 1, title: "Discovery & Research", description: "We understand your idea and the market needs.", },
  { id: 2, title: "Wireframes & Design", description: "We design a modern and seamless user experience.", },
  { id: 3, title: "Development", description: "Building the application with Flutter Native.", },
  { id: 4, title: "Testing & QA", description: "We ensure quality and the absence of bugs.", },
  { id: 5, title: "Launch & Support", description: "App deployment + monitoring and maintenance", },
];


class MainTech {
constructor(id, image, titles, icons) {
  this.id = id;
  this.image = image;
  this.titles = titles;
  this.icons = icons;
}

static data = [
  // 1. 🎨 UI/UX DESIGN (تصميم الواجهات)
  new MainTech(
    "uiux_design_methodology",
    "/sdp_images/ui-ux.png",
    [
      "Figma & FigJam for Collaboration",
      "Adobe Suite (Photoshop/Illustrator)",
      "UI Kits & Component Libraries",
      "Interactive Prototyping",
       ],
    [
      "SiFigma",    // Figma
      "SiAdobe",    // Adobe XD (كمثال)
      "SiNotion",   // Notion
      "FaBrain",    // Brainstorming (كمثال)
    ]
  ),

  // 2. 📱 FLUTTER DEVELOPMENT (تطوير فلاتر)
  new MainTech(
    "flutter_dev",
    "/flutterimg.jpg",
    [
      "Requirement Gathering",
      "App Architecture Design",
      "UI Implementation & State Management",
      "Routing & Navigation",
      "API Integration & Performance Profiling",
      "Package Management, Debugging & Logging",
      "Deployment",
    ],
    [
      "SiFlutter",  // Flutter
      "SiDart",     // Dart
      "SiGit",      // Git
      "FaBug",      // Debugging
    ]
  ),

  // 3. 🖥️ FRONT-END DEVELOPMENT (تطوير الواجهات الأمامية)
  new MainTech(
    "frontend_dev",
    "/frontimg.jpg",
    [
      "HTML5, CSS, Tailwind & Bootstrap",
      "JavaScript & TypeScript",
      "React & Next.js",
      "State Management (Zustand)",
      "Data Fetching (React Query / Axios)",
      "Validation (Zod) & Animations (Framer Motion)",
    ],
    [
      "FaReact",      // React
      "SiNextdotjs",  // Next.js
      "SiTailwindcss",// Tailwind
      "FaAtom",       // FaAtom (بديل Zustand)
    ]
  ),

  // 4. ⚙️ 🟢 BACK-END DEVELOPMENT (تم دمج Laravel و Node.js في قسم واحد)
  new MainTech(
    "backend_dev",
    "/backimg.png", // يمكنك اختيار أي صورة لتمثيل الواجهة الخلفية
    [
      // Laravel & PHP Stack
      "Laravel Framework (Routing, Controllers, Middleware)",
      "Core PHP Skills (OOP, SOLID, Clean Code)",
      "Authentication & Authorization (Sanctum / JWT)",
      "System Architecture (MVC, Repository Pattern)",
      // Node.js & Express Stack
      "Node.js & Express.js Framework",
      "Mongoose (MongoDB ODM)",
      "Next.js API Routes Implementation",
      "RESTful API Design & Development",
    ],
    [
      "FaNodeJs",      // Node.js
      "IoLogoLaravel", // Laravel
      "FaPhp",         // PHP
      "SiExpress",     // Express.js
      "SiMongoose",    // Mongoose
      "FaServer",      // System Architecture
    ]
  ),

  // 5. 🗄️ DATABASE & DATA MODELING (قواعد البيانات) - أصبح رقم 5 بعد الدمج
  new MainTech(
    "database_model",
    "/sdp_images/database.png",
    [
      "Relational: MySQL, PostgreSQL",
      "NoSQL: MongoDB",
      "Key-Value Store: Redis",
      "Migrations & Eloquent ORM",
      "Query Optimization & Database Indexing",
    ],
    [
      "SiMysql",      // MySQL
      "SiPostgresql", // PostgreSQL
      "SiMongodb",    // MongoDB
      "SiRedis",      // Redis
    ]
  ),

  // 6. 🛠️ TOOLS & DEVOPS (الأدوات والأتمتة) - أصبح رقم 6 بعد الدمج
  new MainTech(
    "dev_tools_devops",
    "/sdp_images/tools.png",
    [
      "Git & GitHub Version Control",
      "Feature & Unit Testing",
      "Deployment (Vercel, AWS)",
      "Postman (API Testing & Debugging)",
      "Writing Clean, Scalable Code",
    ],
    [
      "FaGitAlt",    // Git
      "SiPostman",   // Postman
      "FaCloud",     // Deployment
      "SiTestinglibrary",// Testing
    ]
  ),
     [
      "SiFigma",  // Figma
      "SiSketch", // Sketch (تحتاج لاستيرادها)
      "SiAdobe", // Adobe Suite
      "FaPencilRuler", // Iconography (تحتاج لاستيرادها)
      "SiNotion",
    ]
     ,

];

}

export default MainTech;