import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { getSupabaseClient, isMockMode } from '@/config';
import { userService } from '@/services';
import type { User, LoginCredentials, RegisterPayload } from '@/types/models';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signIn: (credentials: LoginCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (payload: RegisterPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isMockMode()) {
            // Mock Auth Initialization
            const initMock = async () => {
                const mockUser = await userService.getCurrentUser();
                setUser(mockUser);
                setIsLoading(false);
            };
            initMock();
            return;
        }

        const supabase = getSupabaseClient();
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        // Check current session
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            if (currentSession?.user) {
                userService.getCurrentUser().then(setUser);
            }
            setIsLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
            setSession(currentSession);
            if (currentSession?.user) {
                const detailedUser = await userService.getCurrentUser();
                setUser(detailedUser);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (credentials: LoginCredentials) => {
        if (isMockMode()) {
            const mockUser = await userService.getCurrentUser();
            setUser(mockUser);
            return;
        }

        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) throw error;
    };

    const signOut = async () => {
        if (isMockMode()) {
            setUser(null);
            return;
        }

        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const signUp = async (payload: RegisterPayload) => {
        if (isMockMode()) {
            throw new Error('SignUp not available in mock mode');
        }

        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                data: {
                    full_name: payload.fullName,
                    role: payload.role,
                },
            },
        });

        if (error) throw error;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                isLoading,
                signIn,
                signOut,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
