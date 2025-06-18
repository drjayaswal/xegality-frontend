interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  code?: number;
}

interface InternshipData {
  id: string;
  title: string;
  firm_name: string;
  location: string;
  department: string;
  position_type: string;
  duration: string;
  compensation_type: string;
  salary_amount?: string;
  start_date: string;
  application_deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  is_remote: boolean;
  accepts_international: boolean;
  provides_housing: boolean;
  employer_id: string;
  employer_email: string;
  posted_date: string;
  applicants_till_now?: number;
  views?: number;
  rating?: number;
}

interface InternshipFilters {
  search?: string;
  location?: string;
  department?: string;
  compensation_type?: string;
  is_remote?: boolean;
  sort_by?: "newest" | "deadline" | "salary" | "rating" | "applicants";
  page?: number;
  limit?: number;
}

interface InternshipApplication {
  internship_id: string;
  cover_letter?: string;
  resume_url?: string;
  additional_documents?: string[];
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  code?: number;
}

export type {
  ApiResponse,
  InternshipApplication,
  InternshipData,
  InternshipFilters,
};
