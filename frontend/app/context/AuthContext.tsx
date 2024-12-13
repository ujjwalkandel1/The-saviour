import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Use `undefined` as the default value to indicate no context value initially
const AuthContextInstance = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContextInstance);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode; // Type for children
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const tokenExpirationDuration = 60 * 60 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");

      if (token && tokenExpiration) {
        const expirationTime = parseInt(tokenExpiration);

        // If the token has expired, remove it and navigate to login
        if (Date.now() > expirationTime) {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("tokenExpiration");
          setIsAuthenticated(false);
          router.push("/auth/Login");
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        router.push("/auth/Login");
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string) => {
    const expirationTime = Date.now() + tokenExpirationDuration; // Set the expiration time
    await AsyncStorage.setItem("userToken", token); // Save token
    await AsyncStorage.setItem("tokenExpiration", expirationTime.toString()); // Save expiration time
    setIsAuthenticated(true);
    router.push("/Home");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken"); // Remove token
    await AsyncStorage.removeItem("tokenExpiration"); // Remove expiration time
    setIsAuthenticated(false);
    router.push("/auth/Login");
  };

  return (
    <AuthContextInstance.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContextInstance.Provider>
  );
};
