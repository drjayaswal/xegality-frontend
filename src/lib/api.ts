// "use client";

// import {
//   ApiResponse,
//   InternshipApplication,
//   InternshipData,
//   InternshipFilters,
// } from "@/types/shared.types";
// import { toast } from "sonner";

// const API_BASE_URL = "http://localhost:4000/api";

// class ApiClient {
//   private async makeRequest<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     const url = `${API_BASE_URL}${endpoint}`;

//     const defaultOptions: RequestInit = {
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers,
//       },
//       credentials: "include",
//       ...options,
//     };

//     try {
//       console.log(`🚀 API Request: ${options.method || "GET"} ${url}`, {
//         body: options.body ? JSON.parse(options.body as string) : undefined,
//         headers: defaultOptions.headers,
//       });

//       const response = await fetch(url, defaultOptions);
//       const data = await response.json();

//       console.log(`📥 API Response: ${options.method || "GET"} ${url}`, {
//         status: response.status,
//         data,
//         headers: Object.fromEntries(response.headers.entries()),
//       });

//       // Store cookies if they exist in the response
//       // this.handleCookies(response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return data;
//     } catch (error) {
//       console.error(`❌ API Error: ${options.method || "GET"} ${url}`, error);
//       throw error;
//     }
//   }

//   private handleCookies(response: Response) {
//     const setCookieHeader = response.headers.get("set-cookie");
//     if (setCookieHeader) {
//       console.log("🍪 Incoming cookies:", setCookieHeader);
//       // Cookies are automatically handled by the browser when credentials: 'include' is set
//       // But we can also manually store them if needed
//       const cookies = setCookieHeader.split(",");
//       cookies.forEach((cookie) => {
//         const [nameValue] = cookie.split(";");
//         const [name, value] = nameValue.split("=");
//         if (name && value) {
//           console.log(`🍪 Storing cookie: ${name.trim()} = ${value.trim()}`);
//         }
//       });
//     }
//   }

//   // Auth methods
//   async generateOTP(payload: { phone?: number; email?: string }) {
//     return this.makeRequest<any>("/auth/generate-otp", {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//   }

//   async verifyUser(payload: {
//     phone?: number;
//     email?: string;
//     otp: number;
//     name: string;
//     role: string;
//     password?: string;
//   }) {
//     return this.makeRequest<{
//       access_token: string;
//       refresh_token: string;
//       user: any;
//     }>("/auth/verify-signup-otp", {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//   }

//   async login(payload: { phone?: number; email?: string; password: string }) {
//     return this.makeRequest<{
//       access_token: string;
//       refresh_token: string;
//         id: string;
//         name: string;
//         role: string;
//         phone: number;
//         email: string;
//     }>("/auth/login", {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//   }

//   async googleLogin(role: string) {
//     return this.makeRequest<{ link: string }>(
//       `/auth/google-login?role=${role}`,
//       {
//         method: "GET",
//       }
//     );
//   }

//   async refreshTokens() {
//     return this.makeRequest<{
//       refresh_token: string;
//     }>("/auth/refresh-tokens", {
//       method: "POST",
//       credentials: "include",
//     });
//   }

//   async logout() {
//     return this.makeRequest<any>("/auth/logout", {
//       method: "GET",
//     });
//   }

//   // Internship methods
//   async fetchInternships(filters?: InternshipFilters) {
//     const queryParams = new URLSearchParams();

//     if (filters) {
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== "") {
//           queryParams.append(key, value.toString());
//         }
//       });
//     }

//     const endpoint = `/app/get-internships${
//       queryParams.toString() ? `?${queryParams.toString()}` : ""
//     }`;

//     return this.makeRequest<InternshipData[]>(endpoint, {
//       method: "GET",
//     });
//   }

//   async getInternshipById(internshipId: string) {
//     return this.makeRequest<InternshipData>(
//       `/app/internships/${internshipId}`,
//       {
//         method: "GET",
//       }
//     );
//   }

//   async createInternship(
//     payload: Omit<
//       InternshipData,
//       "id" | "posted_date" | "applicants_till_now" | "views" | "rating"
//     >
//   ) {
//     return this.makeRequest<InternshipData>("/app/internships", {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//   }

//   async updateInternship(
//     internshipId: string,
//     payload: Partial<InternshipData>
//   ) {
//     return this.makeRequest<InternshipData>(
//       `/app/internships/${internshipId}`,
//       {
//         method: "PUT",
//         body: JSON.stringify(payload),
//       }
//     );
//   }

//   // async deleteExpiredInternships() {
//   //   return this.makeRequest<{}>(`/app/delete-expired-internships`, {
//   //     method: "GET",
//   //   });
//   // }

//   // Internship application methods
//   async applyToInternship(payload: InternshipApplication) {
//     return this.makeRequest<{ application_id: string; message: string }>(
//       "/app/internship-applications",
//       {
//         method: "POST",
//         body: JSON.stringify(payload),
//       }
//     );
//   }

//   async getMyApplications() {
//     return this.makeRequest<any[]>("/app/my-applications", {
//       method: "GET",
//     });
//   }

//   async getApplicationById(applicationId: string) {
//     return this.makeRequest<any>(`/app/applications/${applicationId}`, {
//       method: "GET",
//     });
//   }

//   async withdrawApplication(applicationId: string) {
//     return this.makeRequest<{ message: string }>(
//       `/app/applications/${applicationId}/withdraw`,
//       {
//         method: "POST",
//       }
//     );
//   }

//   // Internship interaction methods
//   async markInternshipAsInterested(internshipId: string) {
//     return this.makeRequest<{ message: string }>(
//       `/app/internships/${internshipId}/interested`,
//       {
//         method: "POST",
//       }
//     );
//   }

//   async removeInternshipInterest(internshipId: string) {
//     return this.makeRequest<{ message: string }>(
//       `/app/internships/${internshipId}/interested`,
//       {
//         method: "DELETE",
//       }
//     );
//   }

//   async getInterestedInternships() {
//     return this.makeRequest<InternshipData[]>("/app/interested-internships", {
//       method: "GET",
//     });
//   }

//   async incrementInternshipViews(internshipId: string) {
//     return this.makeRequest<{ message: string }>(
//       `/app/internships/${internshipId}/view`,
//       {
//         method: "POST",
//       }
//     );
//   }

//   // Employer-specific methods (for lawyers posting internships)
//   async getMyPostedInternships() {
//     return this.makeRequest<InternshipData[]>("/app/my-internships", {
//       method: "GET",
//     });
//   }

//   async getInternshipApplications(internshipId: string) {
//     return this.makeRequest<any[]>(
//       `/app/internships/${internshipId}/applications`,
//       {
//         method: "GET",
//       }
//     );
//   }

//   async updateApplicationStatus(
//     applicationId: string,
//     status: "pending" | "accepted" | "rejected"
//   ) {
//     return this.makeRequest<{ message: string }>(
//       `/app/applications/${applicationId}/status`,
//       {
//         method: "PUT",
//         body: JSON.stringify({ status }),
//       }
//     );
//   }

//   // Analytics methods
//   async getInternshipAnalytics(internshipId: string) {
//     return this.makeRequest<{
//       views: number;
//       applications: number;
//       interested_count: number;
//       conversion_rate: number;
//     }>(`/app/internships/${internshipId}/analytics`, {
//       method: "GET",
//     });
//   }

//   async getDashboardStats() {
//     return this.makeRequest<{
//       total_internships: number;
//       total_applications: number;
//       pending_applications: number;
//       accepted_applications: number;
//       rejected_applications: number;
//     }>("/app/dashboard-stats", {
//       method: "GET",
//     });
//   }

//   // Search and filter helper methods
//   async getInternshipFilters() {
//     return this.makeRequest<{
//       departments: string[];
//       locations: string[];
//       compensation_types: string[];
//       position_types: string[];
//     }>("/app/internship-filters", {
//       method: "GET",
//     });
//   }

//   async searchInternships(query: string) {
//     return this.makeRequest<any[]>(`/app/search-internships`, {
//       method: "POST",
//       body: JSON.stringify({ query }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

// export const apiClient = new ApiClient();

"use client";

import type {
  ApiResponse,
  InternshipApplication,
  InternshipData,
  InternshipFilters,
} from "@/types/shared.types";

const API_BASE_URL = "http://localhost:4000/api";

class ApiClient {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    try {
      console.log(`🚀 API Request: ${options.method || "GET"} ${url}`, {
        body: options.body ? JSON.parse(options.body as string) : undefined,
        headers: defaultOptions.headers,
      });

      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      console.log(`📥 API Response: ${options.method || "GET"} ${url}`, {
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries()),
      });

      // Store cookies if they exist in the response
      // this.handleCookies(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ API Error: ${options.method || "GET"} ${url}`, error);
      throw error;
    }
  }

  private handleCookies(response: Response) {
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      console.log("🍪 Incoming cookies:", setCookieHeader);
      // Cookies are automatically handled by the browser when credentials: 'include' is set
      // But we can also manually store them if needed
      const cookies = setCookieHeader.split(",");
      cookies.forEach((cookie) => {
        const [nameValue] = cookie.split(";");
        const [name, value] = nameValue.split("=");
        if (name && value) {
          console.log(`🍪 Storing cookie: ${name.trim()} = ${value.trim()}`);
        }
      });
    }
  }

  // Auth methods
  async generateOTP(payload: { phone?: number; email?: string }) {
    return this.makeRequest<any>("/auth/generate-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async verifyUser(payload: {
    phone?: number;
    email?: string;
    otp: number;
    name: string;
    role: string;
    password?: string;
  }) {
    return this.makeRequest<{
      access_token: string;
      refresh_token: string;
      user: any;
    }>("/auth/verify-signup-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async login(payload: { phone?: number; email?: string; password: string }) {
    return this.makeRequest<{
      access_token: string;
      refresh_token: string;
      id: string;
      name: string;
      role: string;
      phone: number;
      email: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async googleLogin(role: string) {
    return this.makeRequest<{ link: string }>(
      `/auth/google-login?role=${role}`,
      {
        method: "GET",
      }
    );
  }

  async refreshTokens() {
    return this.makeRequest<{
      refresh_token: string;
    }>("/auth/refresh-tokens", {
      method: "POST",
      credentials: "include",
    });
  }

  async logout() {
    return this.makeRequest<any>("/auth/logout", {
      method: "GET",
    });
  }

  // Internship methods
  async fetchInternships(filters?: InternshipFilters) {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/app/get-internships${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    return this.makeRequest<InternshipData[]>(endpoint, {
      method: "GET",
    });
  }

  async getInternshipById(internshipId: string) {
    return this.makeRequest<InternshipData>(
      `/app/internships/${internshipId}`,
      {
        method: "GET",
      }
    );
  }

  async createInternship(
    payload: Omit<
      InternshipData,
      "id" | "posted_date" | "applicants_till_now" | "views" | "rating"
    >
  ) {
    return this.makeRequest<InternshipData>("/app/internships", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async updateInternship(
    internshipId: string,
    payload: Partial<InternshipData>
  ) {
    return this.makeRequest<InternshipData>(
      `/app/internships/${internshipId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  }

  // async deleteExpiredInternships() {
  //   return this.makeRequest<{}>(`/app/delete-expired-internships`, {
  //     method: "GET",
  //   });
  // }

  // Internship application method
  async applyInternship(payload: {
    internship_id: string;
    id: string;
    name: string;
    email: string;
    resume: string;
    city: string;
    college: string;
  }) {
    return this.makeRequest<{ message: string }>("/apply-internship", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Internship application methods
  async applyToInternship(payload: InternshipApplication) {
    return this.makeRequest<{ application_id: string; message: string }>(
      "/app/internship-applications",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  async getMyApplications() {
    return this.makeRequest<any[]>("/app/my-applications", {
      method: "GET",
    });
  }

  async getApplicationById(applicationId: string) {
    return this.makeRequest<any>(`/app/applications/${applicationId}`, {
      method: "GET",
    });
  }

  async withdrawApplication(applicationId: string) {
    return this.makeRequest<{ message: string }>(
      `/app/applications/${applicationId}/withdraw`,
      {
        method: "POST",
      }
    );
  }

  // Internship interaction methods
  async markInternshipAsInterested(internshipId: string) {
    return this.makeRequest<{ message: string }>(
      `/app/internships/${internshipId}/interested`,
      {
        method: "POST",
      }
    );
  }

  async removeInternshipInterest(internshipId: string) {
    return this.makeRequest<{ message: string }>(
      `/app/internships/${internshipId}/interested`,
      {
        method: "DELETE",
      }
    );
  }

  async getInterestedInternships() {
    return this.makeRequest<InternshipData[]>("/app/interested-internships", {
      method: "GET",
    });
  }

  async incrementInternshipViews(internshipId: string) {
    return this.makeRequest<{ message: string }>(
      `/app/internships/${internshipId}/view`,
      {
        method: "POST",
      }
    );
  }

  // Employer-specific methods (for lawyers posting internships)
  async getMyPostedInternships() {
    return this.makeRequest<InternshipData[]>("/app/my-internships", {
      method: "GET",
    });
  }

  async getInternshipApplications(internshipId: string) {
    return this.makeRequest<any[]>(
      `/app/internships/${internshipId}/applications`,
      {
        method: "GET",
      }
    );
  }

  async updateApplicationStatus(
    applicationId: string,
    status: "pending" | "accepted" | "rejected"
  ) {
    return this.makeRequest<{ message: string }>(
      `/app/applications/${applicationId}/status`,
      {
        method: "PUT",
        body: JSON.stringify({ status }),
      }
    );
  }

  // Analytics methods
  async getInternshipAnalytics(internshipId: string) {
    return this.makeRequest<{
      views: number;
      applications: number;
      interested_count: number;
      conversion_rate: number;
    }>(`/app/internships/${internshipId}/analytics`, {
      method: "GET",
    });
  }

  async getDashboardStats() {
    return this.makeRequest<{
      total_internships: number;
      total_applications: number;
      pending_applications: number;
      accepted_applications: number;
      rejected_applications: number;
    }>("/app/dashboard-stats", {
      method: "GET",
    });
  }

  // Search and filter helper methods
  async getInternshipFilters() {
    return this.makeRequest<{
      departments: string[];
      locations: string[];
      compensation_types: string[];
      position_types: string[];
    }>("/app/internship-filters", {
      method: "GET",
    });
  }

  async searchInternships(query: string) {
    return this.makeRequest<any[]>(`/app/search-internships`, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const apiClient = new ApiClient();
