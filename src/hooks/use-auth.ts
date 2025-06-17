import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(redirectTo = "/auth/login") {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.get("access_token");
    
    if (!token) {
      router.push(redirectTo);
    } else {
      setLoading(false);
    }
  }, [redirectTo, router]);

  return { loading };
}
