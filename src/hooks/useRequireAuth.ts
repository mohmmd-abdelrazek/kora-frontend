import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../services/queries";;

export const useRequireAuth = (redirectUrl = "/login") => {
  const { data, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [data?.isAuthenticated, isLoading, redirectUrl, router]);

  return { data, isLoading };
};
