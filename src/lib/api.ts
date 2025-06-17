"use client";

import { toast } from "sonner";

const API_BASE_URL = "http://localhost:4000/api";

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  code?: number;
}

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
      this.handleCookies(response);

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
    }>("/auth/verify-user", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async login(payload: { phone?: number; email?: string; password: string }) {
    return this.makeRequest<{
      access_token: string;
      refresh_token: string;
      user: any;
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
      access_token: string;
      refresh_token: string;
    }>("/auth/refresh-tokens", {
      method: "POST",
    });
  }

  async logout() {
    return this.makeRequest<any>("/auth/logout", {
      method: "GET",
    });
  }
}

export const apiClient = new ApiClient();

// Helper functions
export const isEmail = (input: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

export const isPhone = (input: string): boolean =>
  /^\+?[0-9]{10,15}$/.test(input);

export const formatPhoneNumber = (phone: string): number =>
  Number(phone.replace(/\D/g, ""));

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 4000,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 5000,
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};
