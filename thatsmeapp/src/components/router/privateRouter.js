import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AuthWrapper({ children }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/loginadmin");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}

export default function PrivateRoute({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
