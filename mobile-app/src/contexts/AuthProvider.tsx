import AppSplashScreen from "@/components/shared/AppSplashScreen";
import useStorage from "@/hooks/useStorage";
import { User } from "@/types/schema";
import { getTokenData } from "@/utils";
import { url } from "@/utils/fetch";
import axios, { AxiosInstance } from "axios";
import { router, usePathname, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

interface AuthContextProps {
  user: User | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  ready: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  getProfile: () => Promise<void>;
  AuthApi: AxiosInstance;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setToken: () => {},
  setUser: () => {},
  token: null,
  ready: false,
  getProfile: () => Promise.resolve(),
  logout: () => {},
  AuthApi: axios.create(),
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const useAuth = () => useContext(AuthContext);
export const whiteList = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-phone",
];

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const { getData, removeData } = useStorage();
  const [token, setToken] = useState<any>(undefined);
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const pathname = usePathname();
  const isAuthPage = whiteList.includes(pathname);

  const AuthApi = axios.create({
    baseURL: url,
    headers: {
      Authorization: token,
    },
  });

  const replace = (path: string) => {
    if (Platform.OS === "ios") {
      setTimeout(() => {
        router.replace(path as any);
      }, 1);
    } else {
      setImmediate(() => {
        router.replace(path as any);
      });
    }
  };

  // get profile to initialize user and also validating him
  const getProfile = async () => {
    console.log("getting profile", isAuthPage);
    if (isAuthPage) return;
    try {
      const id = getTokenData(token as string)?.id;
      console.log("id", id);
      const res = await AuthApi.get(`/user/me`);
      console.log("proRes", res.data);
      const data = res.data.data;
      setUser(data);
    } catch (error) {
      console.log("error", error);
      /* uncomment line below for extra security if you think token may be fabricated */
      // await removeData("token");
      // replace("/login");
    } finally {
      setReady(true);
    }
  };

  const logout = async () => {
    removeData("token");
    setUser(null);
    setToken(null);
    router.push("/");
  };

  useEffect(() => {
    getData("token").then((token) => {
      console.log("token", token);
      setToken(token);
    });
  }, []);

  useEffect(() => {
    if (token === undefined) return;
    if (!token) {
      setReady(true);
      return;
    }
    getProfile();
  }, [token]);

  useEffect(() => {
    console.log("segments", segments);
    if (!ready) return;
    const inAuthGroup = segments[0] === "(auth)" || segments.length as number === 0;
    const isLanding = segments[0] as string === "landing";

    // segments length is 0 when on the landing page. ot '/'
    // if (segments.length === 0) return;
    if (isLanding) return;

    if (
      // If the token is not signed in and the initial segment is not anything in the auth group.
      !token &&
      !inAuthGroup
    ) {
      console.log("has tkn segments", segments);
      // Redirect to the login page. For more info see https://github.com/expo/router/issues/740
      replace("/login");
    } else if (token && inAuthGroup) {
      // Redirect away from the login page.
      console.log("tabs", segments);
      replace("/(tabs)");
    }
  }, [token, segments, ready]);

  if (!ready) return <AppSplashScreen />;

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        token,
        setToken,
        ready,
        getProfile,
        AuthApi,
        logout,
      }}
    >
      {ready ? props.children : <AppSplashScreen />}
    </AuthContext.Provider>
  );
}
