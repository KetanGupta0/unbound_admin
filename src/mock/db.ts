export const students = [
    {
        id: "STU001",
        name: "Alice Thompson",
        email: "alice.t@example.com",
        password: "password123",
        status: "Active",
        joinDate: "2023-11-12",
        avatar: "AT",
        courses: [
            { id: "CRS001", title: "Intro to Python for Data Science", status: "Active", progress: 85 },
            { id: "CRS002", title: "Advanced React & Next.js Patterns", status: "Active", progress: 40 },
            { id: "CRS003", title: "UX/UI Design Fundamentals", status: "Active", progress: 100 },
            { id: "CRS004", title: "Cybersecurity Essentials", status: "Active", progress: 10 },
        ],
        certificates: [
            { id: "CERT001", title: "UX/UI Design Professional", issuedDate: "2024-02-15" }
        ]
    },
    {
        id: "STU002",
        name: "Bob Richards",
        email: "bob.r@example.com",
        password: "password123",
        status: "Banned",
        joinDate: "2023-12-05",
        avatar: "BR",
        courses: [
            { id: "CRS001", title: "Intro to Python for Data Science", status: "Banned", progress: 25 }
        ],
        certificates: []
    },
    {
        id: "STU003",
        name: "Charlie Davis",
        email: "charlie.d@example.com",
        password: "password123",
        status: "Active",
        joinDate: "2024-01-15",
        avatar: "CD",
        courses: [
            { id: "CRS002", title: "Advanced React & Next.js Patterns", status: "Active", progress: 65 },
            { id: "CRS003", title: "UX/UI Design Fundamentals", status: "Active", progress: 90 }
        ],
        certificates: []
    },
    {
        id: "STU004",
        name: "Diana Prince",
        email: "diana.p@example.com",
        password: "password123",
        status: "Active",
        joinDate: "2023-09-20",
        avatar: "DP",
        courses: [
            { id: "CRS001", title: "Intro to Python for Data Science", status: "Active", progress: 100 },
            { id: "CRS002", title: "Advanced React & Next.js Patterns", status: "Active", progress: 100 },
            { id: "CRS003", title: "UX/UI Design Fundamentals", status: "Active", progress: 100 },
            { id: "CRS004", title: "Cybersecurity Essentials", status: "Active", progress: 80 },
            { id: "CRS005", title: "Machine Learning Basics", status: "Active", progress: 50 },
            { id: "CRS007", title: "Digital Marketing", status: "Active", progress: 5 },
        ],
        certificates: [
            { id: "CERT101", title: "Python Masterclass", issuedDate: "2023-11-20" },
            { id: "CERT102", title: "Advanced React Developer", issuedDate: "2024-01-05" },
            { id: "CERT103", title: "UI Design Specialist", issuedDate: "2024-03-01" }
        ]
    },
    {
        id: "STU005",
        name: "Ethan Hunt",
        email: "ethan.h@example.com",
        password: "password123",
        status: "Active",
        joinDate: "2024-02-10",
        avatar: "EH",
        courses: [
            { id: "CRS001", title: "Intro to Python for Data Science", status: "Active", progress: 30 },
            { id: "CRS003", title: "UX/UI Design Fundamentals", status: "Active", progress: 15 },
            { id: "CRS004", title: "Cybersecurity Essentials", status: "Active", progress: 0 }
        ],
        certificates: []
    },
    {
        id: "STU006",
        name: "Fiona Gallagher",
        email: "fiona.g@example.com",
        password: "password123",
        status: "Blocked",
        joinDate: "2024-01-22",
        avatar: "FG",
        courses: [
            { id: "CRS002", title: "Advanced React & Next.js Patterns", status: "Banned", progress: 5 }
        ],
        certificates: []
    },
    {
        id: "STU007",
        name: "George Miller",
        email: "george.m@example.com",
        password: "password123",
        status: "Active",
        joinDate: "2024-03-22",
        avatar: "GM",
        courses: [],
        certificates: []
    },
];

export const instructors = [
    {
        id: "INS001",
        name: "Dr. Sarah Jenkins",
        firstName: "Sarah",
        lastName: "Jenkins",
        email: "sarah.j@unboundbyte.com",
        mobile: "1234567890",
        bio: "Senior Data Scientist with 10+ years of experience.",
        dob: "1985-06-15",
        status: "Active",
        kycStatus: "Verified",
        courses: 5,
        joinDate: "2023-05-10",
        avatar: "SJ",
        address: {
            line1: "123 Tech Park",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            pincode: "94016"
        },
        qualifications: [
            { university: "Stanford University", degree: "Ph.D. Computer Science", year: "2012", status: "Completed" },
            { university: "MIT", degree: "M.S. Data Science", year: "2008", status: "Completed" }
        ],
        experience: [
            { role: "Senior AI Researcher", company: "Google DeepMind", duration: "2015-2023", description: "Led key reinforcement learning projects." }
        ],
        kyc: {
            status: "Verified",
            documents: [
                { type: "Aadhar Card", name: "aadhar.pdf", url: "#", status: "Verified" },
                { type: "Ph.D. Certificate", name: "phd_cert.pdf", url: "#", status: "Verified" }
            ]
        }
    },
    {
        id: "INS002",
        name: "Marc Peterson",
        firstName: "Marc",
        lastName: "Peterson",
        email: "marc.p@unboundbyte.com",
        mobile: "9876543210",
        dob: "1990-03-22",
        status: "Pending",
        kycStatus: "Pending",
        courses: 0,
        joinDate: "2024-03-15",
        avatar: "MP",
        address: {
            line1: "456 Design Ave",
            city: "Austin",
            state: "TX",
            country: "USA",
            pincode: "73301"
        },
        qualifications: [
            { university: "Rhode Island School of Design", degree: "B.F.A. Graphic Design", year: "2012", status: "Completed" }
        ],
        experience: [],
        kyc: {
            status: "Pending",
            documents: [
                { type: "Aadhar Card", name: "aadhar.pdf", url: "#", status: "Pending" }
            ]
        }
    },
    {
        id: "INS003",
        name: "Elena Rodriguez",
        firstName: "Elena",
        lastName: "Rodriguez",
        email: "elena.r@unboundbyte.com",
        mobile: "5551234567",
        dob: "1988-11-05",
        status: "Active",
        kycStatus: "Verified",
        courses: 12,
        joinDate: "2022-11-20",
        avatar: "ER",
        address: {
            line1: "789 React Ln",
            city: "New York",
            state: "NY",
            country: "USA",
            pincode: "10001"
        },
        qualifications: [],
        experience: [],
        kyc: {
            status: "Verified",
            documents: []
        }
    },
    {
        id: "INS004",
        name: "James Wilson",
        firstName: "James",
        lastName: "Wilson",
        email: "james.w@unboundbyte.com",
        mobile: "4449876543",
        dob: "1992-08-30",
        status: "Blocked",
        kycStatus: "Rejected",
        courses: 2,
        joinDate: "2023-08-05",
        avatar: "JW",
        address: {
            line1: "321 Cyber St",
            city: "London",
            state: "UK",
            country: "UK",
            pincode: "SW1A 1AA"
        },
        qualifications: [],
        experience: [],
        kyc: {
            status: "Rejected",
            documents: []
        }
    },
];

export const categories = [
    "Programming",
    "Web Development",
    "Data Science",
    "Design",
    "Marketing",
    "Business",
    "Security",
    "Infrastructure"
];

export const courses = [
    {
        id: "CRS001",
        title: "Intro to Python for Data Science",
        category: "Programming",
        level: "Beginner",
        language: "English",
        price: 49.99,
        status: "Published",
        enrollments: 1205,
        instructor: "Dr. Sarah Jenkins",
        visibility: "Public",
        lastUpdated: "2024-03-10",
        rating: 4.8,
        description: "<h2>Unlock the Power of Data</h2><p>Python is the leading language for data science. In this course, you will learn the fundamentals...</p>",
        shortDescription: "Master Python fundamentals for data analysis and machine learning.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: [
            {
                title: "Section 1: Python Basics",
                lessons: [
                    { title: "Variables & Data Types", duration: "10:00", type: "Video" },
                    { title: "Control Flow", duration: "15:00", type: "Video" }
                ]
            }
        ]
    },
    {
        id: "CRS002",
        title: "Advanced React & Next.js Patterns",
        category: "Web Development",
        level: "Advanced",
        language: "English",
        price: 89.99,
        status: "Published",
        enrollments: 145,
        instructor: "Elena Rodriguez",
        visibility: "Public",
        lastUpdated: "2024-03-18",
        rating: 4.9,
        description: "<h2>Master Modern Web Development</h2><p>Deep dive into RSC, Server Actions, and advanced caching strategies.</p>",
        shortDescription: "Build production-ready apps with Next.js 14 and React.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
    {
        id: "CRS003",
        title: "UX/UI Design Fundamentals",
        category: "Design",
        level: "Beginner",
        language: "English",
        price: 39.99,
        status: "Published",
        enrollments: 850,
        instructor: "Marc Peterson",
        visibility: "Public",
        lastUpdated: "2024-02-25",
        rating: 4.7,
        description: "<p>Design interfaces that users love.</p>",
        shortDescription: "Learn the principles of user-centric design.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
    {
        id: "CRS004",
        title: "Cybersecurity Essentials",
        category: "Security",
        level: "Intermediate",
        language: "English",
        price: 129.99,
        status: "Internal",
        enrollments: 450,
        instructor: "James Wilson",
        visibility: "Hidden",
        lastUpdated: "2023-12-15",
        rating: 4.6,
        description: "<p>Protect systems from modern threats.</p>",
        shortDescription: "Comprehensive guide to network security.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
    {
        id: "CRS005",
        title: "Machine Learning Basics",
        category: "Programming",
        level: "Intermediate",
        language: "English",
        price: 69.99,
        status: "Published",
        enrollments: 320,
        instructor: "Dr. Sarah Jenkins",
        visibility: "Public",
        lastUpdated: "2024-03-05",
        rating: 4.8,
        description: "<p>Introduction to ML algorithms.</p>",
        shortDescription: "Start your journey into AI.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
    {
        id: "CRS006",
        title: "Cloud Computing",
        category: "Infrastructure",
        level: "Beginner",
        language: "Spanish",
        price: 99.99,
        status: "Draft",
        enrollments: 0,
        instructor: "Elena Rodriguez",
        visibility: "Private",
        lastUpdated: "2024-03-20",
        rating: 0,
        description: "<p>Learn AWS/Azure fundamentals.</p>",
        shortDescription: "Cloud infrastructure for beginners.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
    {
        id: "CRS007",
        title: "Digital Marketing",
        category: "Marketing",
        level: "Beginner",
        language: "English",
        price: 29.99,
        status: "Published",
        enrollments: 560,
        instructor: "James Wilson",
        visibility: "Public",
        lastUpdated: "2024-01-10",
        rating: 4.5,
        description: "<p>SEO, SEM, and Social Media strategies.</p>",
        shortDescription: "Grow your brand online.",
        thumbnail: "",
        gallery: [],
        syllabus: "",
        curriculum: []
    },
];

export const batches = [
    { id: "BAT001", name: "Python Morning Batch A", course: "Intro to Python for Data Science", instructor: "Dr. Sarah Jenkins", students: 45, schedule: "Mon, Wed, Fri - 9:00 AM", status: "Active" },
    { id: "BAT002", name: "React Weekend Intense", course: "Advanced React & Next.js Patterns", instructor: "Elena Rodriguez", students: 30, schedule: "Sat, Sun - 2:00 PM", status: "Starting Soon" },
    { id: "BAT003", name: "UX Design Evening", course: "UX/UI Design Fundamentals", instructor: "Marc Peterson", students: 25, schedule: "Tue, Thu - 7:00 PM", status: "Active" },
    { id: "BAT004", name: "Python FastTrack", course: "Intro to Python for Data Science", instructor: "Dr. Sarah Jenkins", students: 50, schedule: "Daily - 6:00 PM", status: "Completed" },
];

export const chatGroups = [
    { id: "GRP001", batchId: "BAT001", name: "Python Morning Batch A", course: "Intro to Python for Data Science", instructor: "Dr. Sarah Jenkins", activeStudents: 42, lastMessage: "Can someone help with the homework?", timestamp: "10:45 AM" },
    { id: "GRP002", batchId: "BAT002", name: "React Weekend Intense", course: "Advanced React & Next.js Patterns", instructor: "Elena Rodriguez", activeStudents: 28, lastMessage: "The link for the meeting is updated.", timestamp: "Yesterday" },
    { id: "GRP003", batchId: "BAT003", name: "UX Design Evening", course: "UX/UI Design Fundamentals", instructor: "Marc Peterson", activeStudents: 24, lastMessage: "Great session today!", timestamp: "2 days ago" },
    { id: "GRP004", batchId: "BAT004", name: "Python FastTrack", course: "Intro to Python for Data Science", instructor: "Dr. Sarah Jenkins", activeStudents: 48, lastMessage: "Final project submission link is live.", timestamp: "3 days ago" },
];

export const groupMessages = {
    "GRP001": [
        { id: "MSG001", sender: "Alice Thompson", role: "Student", content: "Is the assignment due tonight?", timestamp: "10:30 AM" },
        { id: "MSG002", sender: "Dr. Sarah Jenkins", role: "Instructor", content: "Yes, by midnight. Please check the portal.", timestamp: "10:32 AM" },
        { id: "MSG003", sender: "Bob Richards", role: "Student", content: "I'm having trouble with the second problem.", timestamp: "10:35 AM" },
        { id: "MSG004", sender: "Alice Thompson", role: "Student", content: "Can someone help with the homework?", timestamp: "10:45 AM" },
    ],
    "GRP002": [
        { id: "MSG101", sender: "Elena Rodriguez", role: "Instructor", content: "The link for the meeting is updated.", timestamp: "Yesterday" },
        { id: "MSG102", sender: "Charlie Davis", role: "Student", content: "Got it, thanks!", timestamp: "Yesterday" },
    ],
    "GRP003": [
        { id: "MSG201", sender: "Marc Peterson", role: "Instructor", content: "Great session today!", timestamp: "2 days ago" },
    ],
    "GRP004": [
        { id: "MSG301", sender: "Dr. Sarah Jenkins", role: "Instructor", content: "Final project submission link is live.", timestamp: "3 days ago" },
    ]
};

export const materials = [
    {
        id: "MAT001",
        title: "Complete Python Data Science Guide",
        uploadedBy: "Dr. Sarah Jenkins",
        role: "Instructor",
        course: "Intro to Python for Data Science",
        type: "PDF",
        size: "12MB",
        date: "2024-03-21",
        status: "Pending"
    },
    {
        id: "MAT002",
        title: "Advanced React Hooks Cheatsheet",
        uploadedBy: "Elena Rodriguez",
        role: "Instructor",
        course: "Advanced React & Next.js Patterns",
        type: "PDF",
        size: "2.5MB",
        date: "2024-03-20",
        status: "Pending"
    },
    {
        id: "MAT003",
        title: "UX Research Methodology Video",
        uploadedBy: "Marc Peterson",
        role: "Instructor",
        course: "UX/UI Design Fundamentals",
        type: "Video",
        size: "1.2GB",
        date: "2024-03-19",
        status: "Pending"
    },
    {
        id: "MAT004",
        title: "Course Syllabus 2024",
        uploadedBy: "Super Admin",
        role: "Admin",
        course: "Intro to Python for Data Science",
        type: "PDF",
        size: "500KB",
        date: "2024-01-15",
        status: "Published"
    },
    {
        id: "MAT005",
        title: "External Resources List",
        uploadedBy: "Elena Rodriguez",
        role: "Instructor",
        course: "Advanced React & Next.js Patterns",
        type: "Link",
        size: "-",
        date: "2024-03-18",
        status: "Published"
    }
];


export const dashboardStats = [
    { label: "Total Students", value: "12,450", trend: { value: 12, isUp: true }, color: "bg-indigo-500", icon: "Users" },
    { label: "Total Instructors", value: "420", trend: { value: 5, isUp: true }, color: "bg-emerald-500", icon: "UserSquare2" },
    { label: "Active Courses", value: "84", trend: { value: 2, isUp: false }, color: "bg-amber-500", icon: "BookOpen" },
    { label: "Running Batches", value: "156", trend: { value: 8, isUp: true }, color: "bg-purple-500", icon: "Layers" },
    { label: "Revenue Summary", value: "$45,280", trend: { value: 15, isUp: true }, color: "bg-rose-500", icon: "CreditCard" },
];

export const pendingApprovals = [
    { id: "1", type: "Study Material", name: "Python Basics PDF", instructor: "Dr. Sarah Jenkins", course: "Intro to Python for Data Science", date: "2024-03-20" },
    { id: "2", type: "KYC Onboarding", name: "James Wilson", instructor: "N/A", course: "N/A", date: "2024-03-19" },
    { id: "3", type: "Refund Request", name: "Order # TXN10247", instructor: "Marcus Doe (Student)", course: "Advanced React & Next.js Patterns", date: "2024-03-21" },
];

export const disciplineRequests = [
    {
        id: "DIS001",
        student: "Bob Richards",
        studentId: "STU002",
        course: "Intro to Python for Data Science",
        instructor: "Dr. Sarah Jenkins",
        reason: "Repeated spamming in group chat and disrespectful behavior toward peers.",
        evidence: "Chat logs from March 15-18",
        status: "Pending",
        submittedDate: "2024-03-20"
    },
    {
        id: "DIS002",
        student: "Fiona Gallagher",
        studentId: "STU006",
        course: "Advanced React & Next.js Patterns",
        instructor: "Elena Rodriguez",
        reason: "Sharing course materials on external public platforms.",
        evidence: "Screenshot of Telegram group",
        status: "Approved",
        submittedDate: "2024-03-18"
    },
];

export const auditLogs = [
    { id: "LOG001", action: "User Blocked", actor: "Super Admin", target: "Bob Richards (STU002)", reason: "Spam behavior in Python Group", timestamp: "2024-03-22 14:30:15" },
    { id: "LOG002", action: "Course Published", actor: "Super Admin", target: "Advanced React & Next.js Patterns", reason: "Content review completed", timestamp: "2024-03-22 12:15:00" },
    { id: "LOG003", action: "Refund Approved", actor: "Super Admin", target: "TXN10247 (Marcus Doe)", reason: "Accidental double purchase", timestamp: "2024-03-21 16:45:22" },
    { id: "LOG004", action: "Instructor Verified", actor: "Super Admin", target: "Dr. Sarah Jenkins", reason: "KYC Documents Approved", timestamp: "2024-03-21 09:20:10" },
    { id: "LOG005", action: "Settings Updated", actor: "Admin Account", target: "Website Branding", reason: "Logo update for holiday season", timestamp: "2024-03-20 18:10:05" },
];

export const transactions = [
    { id: "TXN10245", user: "Alice Thompson", type: "Payment", amount: 49.99, course: "Intro to Python for Data Science", date: "2024-03-22", status: "Success" },
    { id: "TXN10246", user: "Charlie Davis", type: "Payment", amount: 89.99, course: "Advanced React & Next.js Patterns", date: "2024-03-21", status: "Success" },
    { id: "TXN10247", user: "Marcus Doe", type: "Refund", amount: -89.99, course: "Advanced React & Next.js Patterns", date: "2024-03-20", status: "Processed" },
    { id: "TXN10248", user: "Diana Prince", type: "Payment", amount: 39.99, course: "UX/UI Design Fundamentals", date: "2024-03-19", status: "Success" },
    { id: "TXN10249", user: "Ethan Hunt", type: "Payment", amount: 129.99, course: "Cybersecurity Essentials", date: "2024-03-18", status: "Failed" },
];

export const adminProfile = {
    name: "Super Admin",
    role: "Full System Access",
    email: "admin@unboundbyte.com",
    avatar: "SA",
    lastLogin: "Today, 10:45 AM",
    location: "Mumbai, IN"
};

export const availableStudents = [
    { id: "STU_WAIT_001", name: "Michael Chang", email: "michael.c@example.com", dateRegistered: "2024-03-20", preferredCourse: "Intro to Python for Data Science" },
    { id: "STU_WAIT_002", name: "Emma Wilson", email: "emma.w@example.com", dateRegistered: "2024-03-21", preferredCourse: "UX/UI Design Fundamentals" },
    { id: "STU_WAIT_003", name: "Liam O'Connor", email: "liam.o@example.com", dateRegistered: "2024-03-22", preferredCourse: "Advanced React & Next.js Patterns" },
    { id: "STU_WAIT_004", name: "Sophia Patel", email: "sophia.p@example.com", dateRegistered: "2024-03-22", preferredCourse: "Intro to Python for Data Science" },
    { id: "STU_WAIT_005", name: "Noah Williams", email: "noah.w@example.com", dateRegistered: "2024-03-23", preferredCourse: "Web Development Bootcamp" },
    { id: "STU_WAIT_006", name: "Olivia Brown", email: "olivia.b@example.com", dateRegistered: "2024-03-23", preferredCourse: "UX/UI Design Fundamentals" },
    { id: "STU_WAIT_007", name: "James Miller", email: "james.m@example.com", dateRegistered: "2024-03-24", preferredCourse: "Intro to Python for Data Science" },
];
