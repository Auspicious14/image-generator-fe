"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  authStatus: string | null;
  signUp: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  signIn: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authStatus: null,
  isLoading: false,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  forgotPassword: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        const data = await res.json();
        if (data.authenticated) {
          console.log({ data });
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
          setUser(null);
        }
      } catch (err) {
        setAuthStatus("unauthenticated");
        setUser(null);
      }
    };
    checkAuth();
  }, []);
  const handleAuthRequest = async (
    url: string,
    values: any,
    type: "signup" | "signin"
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosClient.post(url, values);
      if (response?.data?.success) {
        if (type === "signin") {
          localStorage.setItem("token", response.data?.data?.token);
          setUser(response.data?.data);
          toast.success("Success!");
        }
        router.push(type === "signup" ? "/signin" : `/chat`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = useCallback(
    async (values: any, actions: FormikHelpers<any>) => {
      await handleAuthRequest("/signup", values, "signup");
      actions.setSubmitting(false);
    },
    []
  );

  const signIn = useCallback(
    async (values: any, actions: FormikHelpers<any>) => {
      await handleAuthRequest("/login", values, "signin");
      actions.setSubmitting(false);
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      await AxiosClient.post("/forgetPassword", { email });
      toast.success("Password reset email sent");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        isLoading,
        error,
        signUp,
        signIn,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
