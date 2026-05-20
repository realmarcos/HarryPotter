import { auth } from "@/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface Session {
  id: string;
  userName: string;
  email: string;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>; // Função de Login
  signOut: () => Promise<void>; //Função de Logout
  signUp: (username: string, email: string, password: string) => Promise<void>; // Função de Cadastro
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("@session");
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      } catch {
        console.error("Error checking session");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const newSession = {
        id: result.user.uid,
        userName: result.user.displayName || "",
        email: result.user.email || "",
      };
      setSession(newSession);
      await AsyncStorage.setItem("@session", JSON.stringify(newSession));
    } catch {
      alert("Login falhou");
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@session");
      setSession(null);
    } catch {
      alert("Logout falhou");
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, { displayName: username });
      const newSession = {
        id: result.user.uid,
        userName: result.user.displayName || "",
        email: result.user.email || "",
      };
      setSession(newSession);
      await AsyncStorage.setItem("@session", JSON.stringify(newSession));
    } catch {
      alert("Registro falhou ");
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
