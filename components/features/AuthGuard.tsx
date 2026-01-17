"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user && pathname.startsWith('/app')) {
            router.replace('/login');
        }
    }, [user, isLoading, router, pathname]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Carregando...</div>;
    }

    // Allow rendering if user is logged in OR if we are not on a protected route (though this guard is mostly used in protected layouts)
    // For the /app layout, we want to block if not user.
    if (!user && pathname.startsWith('/app')) {
        return null;
    }

    return <>{children}</>;
}
