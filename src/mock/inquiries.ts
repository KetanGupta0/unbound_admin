export interface Inquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'New' | 'Contacted' | 'Spam';
    date: string;
}

export const inquiries: Inquiry[] = [
    {
        id: "INQ001",
        name: "John Smith",
        email: "john.smith@gmail.com",
        subject: "Question about Corporate Training",
        message: "Hi, do you offer bulk discounts for corporate teams? We have about 50 engineers we want to upskill in React.",
        status: "New",
        date: "2024-03-24 10:30 AM"
    },
    {
        id: "INQ002",
        name: "Emily White",
        email: "emily.w@yahoo.com",
        subject: "Login Issue",
        message: "I cannot access my dashboard. It keeps saying 'Invalid Token'. Can you help?",
        status: "Contacted",
        date: "2024-03-23 04:15 PM"
    },
    {
        id: "INQ003",
        name: "Prince of Nigeria",
        email: "prince@royal.ng",
        subject: "Business Opportunity",
        message: "I have a proposition for you...",
        status: "Spam",
        date: "2024-03-22 09:00 AM"
    },
    {
        id: "INQ004",
        name: "Sarah Lee",
        email: "sarah.lee@university.edu",
        subject: "Partnership Inquiry",
        message: "Our university is interested in partnering with your platform for our CS curriculum.",
        status: "New",
        date: "2024-03-24 11:45 AM"
    }
];
