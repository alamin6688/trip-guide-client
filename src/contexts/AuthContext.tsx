"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { getCookie } from "@/services/auth/tokenHandlers";

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    refreshAuth: () => Promise<void>;
    logout: () => void;
    login: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await getCookie("accessToken");
            setIsAuthenticated(!!token);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();

        // Listen for storage events (for cross-tab sync)
        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener("storage", handleStorageChange);

        // Custom event for same-tab updates
        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, [checkAuth]);

    const refreshAuth = useCallback(async () => {
        await checkAuth();
        // Dispatch custom event for other components
        window.dispatchEvent(new Event("auth-change"));
    }, [checkAuth]);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("auth-change"));
    }, []);

    const login = useCallback(() => {
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("auth-change"));
    }, []);

    const value = useMemo(
        () => ({ isAuthenticated, isLoading, refreshAuth, logout, login }),
        [isAuthenticated, isLoading, refreshAuth, logout, login]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
