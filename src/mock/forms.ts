export type FieldType = 'text' | 'textarea' | 'number' | 'email' | 'date' | 'select' | 'checkbox' | 'radio' | 'file';

export interface Field {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select, radio, checkbox
    helperText?: string;
}

export interface Section {
    id: string;
    title: string;
    description?: string;
    fields: Field[];
}

export interface Form {
    id: string;
    title: string;
    description?: string;
    type: 'Registration' | 'Survey' | 'Application' | 'Feedback' | 'Other';
    status: 'Active' | 'Draft' | 'Closed';
    responses: number;
    createdAt: string;
    updatedAt: string;
    availability?: {
        start?: string;
        end?: string;
    };
    sections: Section[];
}

export const forms: Form[] = [
    {
        id: "FRM001",
        title: "Student Registration 2024",
        description: "Standard registration form for new batch intake.",
        type: "Registration",
        status: "Active",
        responses: 124,
        createdAt: "2024-01-15",
        updatedAt: "2024-03-20",
        sections: [
            {
                id: "SEC001",
                title: "Personal Information",
                fields: [
                    { id: "FLD001", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
                    { id: "FLD002", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
                    { id: "FLD003", label: "Date of Birth", type: "date", required: true }
                ]
            },
            {
                id: "SEC002",
                title: "Academic Background",
                fields: [
                    { id: "FLD004", label: "Highest Qualification", type: "select", required: true, options: ["High School", "Bachelor's", "Master's", "PhD"] },
                    { id: "FLD005", label: "University/College", type: "text", required: false }
                ]
            }
        ]
    },
    {
        id: "FRM002",
        title: "Course Feedback Survey",
        description: "Post-completion feedback collection.",
        type: "Feedback",
        status: "Active",
        responses: 45,
        createdAt: "2024-03-10",
        updatedAt: "2024-03-10",
        sections: [
            {
                id: "SEC101",
                title: "Course Experience",
                fields: [
                    { id: "FLD101", label: "How would you rate the course content?", type: "radio", required: true, options: ["Excellent", "Good", "Average", "Poor"] },
                    { id: "FLD102", label: "What did you like most?", type: "textarea", required: false }
                ]
            }
        ]
    },
    {
        id: "FRM003",
        title: "Instructor Application",
        description: "Application form for potential instructors.",
        type: "Application",
        status: "Draft",
        responses: 0,
        createdAt: "2024-03-22",
        updatedAt: "2024-03-22",
        sections: []
    }
];
