export const portfolioData = {
  personal: {
    name: "Saad Mohamed Hassan",
    title: "Full-Stack Web Developer",
    subtitle: "React.js & Node.js",
    email: "saadmhafez222002@gmail.com",
    phone: "01018310038",
    location: "Badr City, Cairo, Egypt",
    linkedin: "www.linkedin.com/in/saad-mohamed-hassan",
    github: "https://github.com/Saam22",
    website: "https://protofolio-saad.vercel.app",
  },

  profile: `Full-Stack Web Developer focused on building responsive, dynamic web applications with React.js, Node.js, and Django. Recent Computer Science graduate (Faculty of Computer and Information Science, Ain Shams University) with a strong foundation in data structures, algorithms, and OOP. Hands-on experience through internships at ITI, Algoriza, and Mentality, plus professional experience at the Egyptian Armed Forces. Always learning and open to new opportunities.`,

  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "Faculty of Computer and Information Science, Ain Shams University",
      department: "Computer Science Department",
      period: "2019 – 2024",
      location: "Cairo, Egypt"
    }
  ],

  experience: [
    {
      title: "Full-Stack Software Engineer",
      company: "Egyptian Armed Forces",
      period: "09/2025 – 09/2026",
      description: "",
      bullets: [
        "Built and maintained 3+ full-stack systems used daily by 200+ personnel.",
        "Automated manual data workflows, cutting reporting time by ~40%.",
        "Migrated legacy systems to React.js and Node.js, improving load speed by ~35%.",
        "Received a Certificate of Appreciation for outstanding performance and technical excellence."
      ]
    },
    {
      title: "Frontend Development Intern",
      company: "Mentality",
      period: "08/2024 – 11/2024",
      description: "Built 5+ reusable React component libraries, cutting design revision cycles by ~30%."
    },
    {
      title: "BackEnd Development Training (ASP.NET)",
      company: "Algoriza",
      period: "10/2023 – 12/2023",
      description: "Completed 60+ hours of ASP.NET training, building 3 data-driven applications."
    },
    {
      title: "React.js Development Intern",
      company: "ITI",
      period: "08/2022 – 09/2022",
      description: "Front end Summer training in Faculty of Computer and Information System"
    },
    {
      title: "Member",
      company: "ACM Problem Solving",
      period: "2019 – 2020"
    }
  ],

  skills: {
    programmingLanguages: ["C++", "Java", "Python", "R", "C#", "SQL", "Dart", "JavaScript"],
    frontend: {
      languages: ["HTML5", "CSS3", "JavaScript"],
      libraries: ["React JS", "Bootstrap", "Tailwind CSS"],
      tools: ["Git & GitHub", "Figma", "Webpack", "Vite"]
    },
    backend: {
      dotnet: ["C#", "ASP.NET", "Entity Framework Core", "LINQ", "SQL Server", "REST API"],
      nodejs: ["Node.js", "Express.js", "MongoDB", "REST API", "JWT Authentication"],
      django: ["Django", "Django REST Framework", "PostgreSQL", "Python"]
    },
    tools: ["Git & GitHub", "Postman", "Selenium", "Figma", "Webpack", "Vite", "Agile/Scrum-based teamwork"],
    softSkills: [
      "Analytical Thinking",
      "Problem-Solving",
      "Team Collaboration",
      "Time Management",
      "Adaptability",
      "Attention to Detail",
      "Communication"
    ],
    other: [
      "Object Oriented Programming",
      "Data Structures & Algorithms",
      "Software Quality Assurance",
      "Design Patterns",
      "Testing (Selenium, Postman)",
      "Presentation Skills"
    ]
  },

  projects: [
    {
      id: 1,
      title: "SkyFly",
      subtitle: "Flight Booking Platform",
      description: "Comprehensive web platform for searching, comparing, and booking flight tickets across multiple airlines. Features an intuitive search interface with smart filters, detailed flight information, interactive seat map, and multi-step booking.",
      technologies: ["ReactJS","Vite", "HTML", "CSS", "JavaScript"],
      type: "Frontend",
      image: "/images/screen.png",
      live: "https://skyfly-six.vercel.app/",
      github: "https://github.com/Saam22/skyfly",
      features: ["Flight search & compare", "Multi-step booking", "Interactive seat map", "Price filtering"],
      featured: true
    },
    {
      id: 2,
      title: "Furniture E-commerce",
      subtitle: "Online Furniture Store",
      description: "Dynamic online platform for browsing and purchasing furniture products with modern UI and smooth animations.",
      technologies: ["React 19","Vite 8", "Three.js", "HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
      type: "FullStack",
      image: "/images/home.png",
      live: "https://furniture-e-commerce-website-seven.vercel.app/",
      github: "https://github.com/Saam22/Furniture-E-commerce-Website",
      features: ["Product catalog", "Shopping cart", "3D product viewer", "Responsive design"],
      featured: false
    },
    {
      id: 3,
      title: "PULSE",
      subtitle: "News & Media Portal",
      description: "Designed and developed PULSE news website to deliver diverse content (political, sports, social) through a modern, user-friendly interface with smart content organization and fast navigation.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      type: "Frontend",
      image: "/images/photo-1529107386315-e1a2ed48a620.jpg",
      live: "https://pulse-peach-kappa.vercel.app/",
      github: "https://github.com/Saam22/PULSE",
      features: ["Content categorization", "Smart search", "Responsive layout", "Fast navigation"],
      featured: false
    },
    {
      id: 4,
      title: "Nile & Clay",
      subtitle: "Restaurant Brand Website",
      description: "Professional website for Nile & Clay restaurant that reflects its premium brand identity with responsive layout, dual theme support, and interactive menu system with dynamic filtering.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      type: "Frontend",
      image: "/images/Screenshot 2026-05-03 112254.png",
      live: "https://nile-clay.vercel.app/",
      github: "https://github.com/Saam22/Nile_Clay",
      features: ["Dual theme (light/dark)", "Interactive menu", "Dynamic filtering", "Responsive design"],
      featured: false
    },
    {
      id: 5,
      title: "Harmony Flow",
      subtitle: "Music Player App",
      description: "A fully interactive, feature-rich web-based music player with playlist management, playback controls, audio visualizer, shuffle/repeat modes, speed control, and beautiful responsive design.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      type: "Frontend",
      image: "/images/Screenshot 2026-05-03 130115.png",
      live: "https://music-player-one-gules.vercel.app/",
      github: "https://github.com/Saam22/Music_Player",
      features: ["Audio visualizer", "Playlist management", "Shuffle/repeat modes", "Speed control"],
      featured: false
    },
    {
      id: 6,
      title: "FootballIQ",
      subtitle: "Football Trivia Game",
      description: "Feature-rich football trivia game with 50+ questions, 3 difficulty levels, lifelines, daily challenges, streak bonuses, and persistent stats via localStorage.",
      technologies: ["HTML", "CSS", "JavaScript"],
      type: "Frontend",
      image: "/images/Screenshot 2026-05-26 202128.png",
      live: "https://football-quiz-six.vercel.app/",
      github: "https://github.com/Saam22/FootballQuiz",
      features: ["50+ questions", "3 difficulty levels", "Lifelines & bonuses", "Persistent stats"],
      featured: false
    },
    {
      id: 7,
      title: "DayFlow",
      subtitle: "Task Management App",
      description: "A full-featured task management app with custom categories (Work, Personal, Health, Urgent), priority levels, inline editing, drag & drop reorder, and real-time search.",
      technologies: ["HTML", "CSS", "JavaScript"],
      type: "Frontend",
      image: "/images/Screenshot 2026-05-27 183322.png",
      live: "https://day-flow-task-manager.vercel.app/",
      github: "https://github.com/Saam22/DayFlow-Task-Manager",
      features: ["Drag & drop reorder", "Custom categories", "Real-time search", "LocalStorage persistence"],
      featured: false
    },
    {
      id: 8,
      title: "LearnForge",
      subtitle: "E-Learning Platform",
      description: "A responsive e-learning platform UI showcasing a free courses catalog with dynamic filtering by category, live search, course enrollment tracking, modal previews, and animated statistics counters.",
      technologies: ["HTML", "CSS", "JavaScript"],
      type: "Frontend",
      image: "/images/Screenshot 2026-05-27 183219.png",
      live: "https://learn-forge-beta.vercel.app/",
      github: "https://github.com/Saam22/LearnForge",
      features: ["Course catalog", "Category filtering", "Enrollment tracking", "Animated counters"],
      featured: false
    },
    {
      id: 9,
      title: "Breast Cancer Detection",
      subtitle: "Graduation Project",
      description: "Full-stack ML web app integrating CNN, SVM, and Decision Tree models via a Flask REST API, achieving 94%+ accuracy, connected to a React.js frontend.",
      technologies: ["ReactJS", "Python", "Flask", "Machine Learning", "CNN", "SVM"],
      type: "FullStack",
      image: "",
      features: ["94%+ accuracy", "CNN, SVM & Decision Tree models", "Flask REST API", "React.js frontend"],
      featured: false
    },
    {
      id: 10,
      title: "Mobile Phone Shop",
      subtitle: "Management System",
      description: "Full-stack system (Node.js, Express, MongoDB, React) with ~22 modules processing 500+ daily transactions, cutting inventory tracking errors by ~60%.",
      technologies: ["Node.js", "Express.js", "MongoDB", "React", "JavaScript"],
      type: "FullStack",
      image: "",
      features: ["~22 modules", "500+ daily transactions", "Inventory tracking", "-60% errors"],
      featured: false
    },
    {
      id: 11,
      title: "Gym Management System",
      subtitle: "Desktop Application",
      description: "Java desktop app with OOP and modular DAO design, automating gym operations for 200+ members.",
      technologies: ["Java", "OOP", "DAO"],
      type: "Backend",
      image: "",
      features: ["200+ members", "Modular DAO design", "Membership management", "Automated operations"],
      featured: false
    },
    {
      id: 12,
      title: "Al-Dukkan",
      subtitle: "Grocery Delivery Platform",
      description: "Modern, responsive grocery delivery web app with category browsing, search, filters, cart, checkout, saved addresses, order history, and live-style order tracking on an interactive Leaflet map. Frontend-only implementation with mocked product data and authentication.",
      technologies: ["React 19", "Vite 8", "React Router 7", "Tailwind CSS 4", "Framer Motion", "Leaflet"],
      type: "Frontend",
      image: "/images/home copy.png",
      live: "https://al-dukan-grocery-delivery-saam22s-projects.vercel.app/",
      github: "https://github.com/Saam22/Al-Dukan---Grocery-Delivery",
      features: ["Category browsing & featured products", "Filters, sorting & pagination", "Cart with localStorage persistence", "Checkout & saved addresses", "Order tracking with Leaflet map", "Mock login & registration"],
      featured: false
    }
  ],

  certificates: [
    {
      title: "Advanced Front-End Web Development using React JS",
      issuer: "ITI",
      date: "2022"
    },
    {
      title: "ASP.NET Development",
      issuer: "Algoriza",
      date: "2023"
    },
    {
      title: "JavaScript Ultimate Guide",
      issuer: "Udemy",
      date: "2023"
    },
    {
      title: "CSS3 Ultimate Guide",
      issuer: "Udemy",
      date: "2023"
    },
    {
      title: "C# Course",
      issuer: "Essam Abdelnaby",
      date: "2023"
    },
    {
      title: "Design And Implement Efficient Database Solutions",
      issuer: "Manara Tech",
      date: "2026"
    },
    {
      title: "React Hooks Crash Course",
      issuer: "GreatStack",
      date: "2026"
    },
    {
      title: "Full Stack Grocery Delivery (PERN Stack)",
      issuer: "GreatStack",
      date: "2026"
    },
  ],

  courses: [
    "JavaScript Ultimate Guide - Udemy",
    "CSS3 Ultimate Guide - Udemy",
    "The Web Front End Learning - Udemy",
    "Learn HTML & CSS - Mahara Tech",
    "Database Fundamentals - Mahara Tech",
    "C# Course - Essam Abdelnaby",
    "Design And Implement Efficient Database Solutions - Manara Tech",
    "Full Stack Grocery Delivery (PERN Stack) - GreatStack"
  ]
};
