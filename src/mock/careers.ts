export interface Job {
    id: string;
    title: string;
    department: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    location: string;
    description: string;
    status: 'Active' | 'Closed' | 'Draft';
    postedDate: string;
    tags: string[];
}

export interface Application {
    id: string;
    jobId: string;
    jobTitle: string;
    candidateName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    linkedinUrl?: string;
    status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
    appliedDate: string;
    rating?: number; // 1-5 stars
}

export const jobs: Job[] = [
    {
        id: "JOB001",
        title: "Senior React Engineer",
        department: "Engineering",
        type: "Full-time",
        location: "Remote",
        description: "<p>We are looking for an experienced <strong>React Engineer</strong> to lead our frontend team.</p><ul><li>5+ years of React experience</li><li>TypeScript mastery</li><li>Next.js expertise</li></ul>",
        status: "Active",
        postedDate: "2024-03-10",
        tags: ["React", "TypeScript", "Frontend"]
    },
    {
        id: "JOB002",
        title: "UX/UI Designer",
        department: "Design",
        type: "Full-time",
        location: "New York, NY",
        description: "<p>Join our <em>award-winning</em> design team to craft beautiful user experiences.</p>",
        status: "Active",
        postedDate: "2024-03-15",
        tags: ["Figma", "Design System", "Prototyping"]
    },
    {
        id: "JOB003",
        title: "Marketing Specialist",
        department: "Marketing",
        type: "Contract",
        location: "London, UK",
        description: "<p>Help us grow our brand presence in Europe.</p>",
        status: "Closed",
        postedDate: "2024-02-01",
        tags: ["SEO", "Content Marketing"]
    }
];

export const applications: Application[] = [
    {
        id: "APP001",
        jobId: "JOB001",
        jobTitle: "Senior React Engineer",
        candidateName: "Alex Johnson",
        email: "alex.j@example.com",
        phone: "+1 555-0101",
        resumeUrl: "resume_alex.pdf",
        status: "Interview",
        appliedDate: "2024-03-12",
        rating: 4
    },
    {
        id: "APP002",
        jobId: "JOB001",
        jobTitle: "Senior React Engineer",
        candidateName: "Sarah Connor",
        email: "sarah.c@sky.net",
        phone: "+1 555-0102",
        resumeUrl: "resume_sarah.pdf",
        status: "New",
        appliedDate: "2024-03-20"
    },
    {
        id: "APP003",
        jobId: "JOB002",
        jobTitle: "UX/UI Designer",
        candidateName: "Mike Ross",
        email: "mike.ross@pearson.com",
        phone: "+1 555-0103",
        resumeUrl: "portfolio_mike.pdf",
        status: "Screening",
        appliedDate: "2024-03-18",
        rating: 3
    },
    {
        id: "APP004",
        jobId: "JOB002",
        jobTitle: "UX/UI Designer",
        candidateName: "Rachel Zane",
        email: "rachel.z@pearson.com",
        phone: "+1 555-0104",
        resumeUrl: "portfolio_rachel.pdf",
        linkedinUrl: "linkedin.com/in/rachelz",
        status: "Offer",
        appliedDate: "2024-03-16",
        rating: 5
    }
];
