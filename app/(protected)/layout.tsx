"use client";

import { AuthGuard } from "@/components/features/AuthGuard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { LogOut, Menu, User, Settings, History, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const NavContent = () => (
        <nav className="flex flex-col gap-2 mt-4">
            <Link href="/app" onClick={() => setIsOpen(false)}>
                <Button variant={pathname === '/app' ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                </Button>
            </Link>
            <Link href="/app/historico" onClick={() => setIsOpen(false)}>
                <Button variant={pathname.startsWith('/app/historico') ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <History className="mr-2 h-4 w-4" />
                    Histórico
                </Button>
            </Link>
            <button onClick={() => { setIsOpen(false); /* Open settings modal logic */ }}>
                {/* Settings ideally should be a modal or page. Let's make it a page for simplicity or just a button that opens a dialog implemented elsewhere */}
                {/* For MVP let's assume settings is on a page or just unimplemented in nav for now, user asked for "Configurações (modal ou página)" - I'll put it as a page /app/configuracoes */}
            </button>
            <Link href="/app/configuracoes" onClick={() => setIsOpen(false)}>
                <Button variant={pathname.startsWith('/app/configuracoes') ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                </Button>
            </Link>

            <div className="my-2 border-t" />
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
            </Button>
        </nav>
    );

    return (
        <AuthGuard>
            <div className="min-h-screen bg-muted/40 flex flex-col">
                {/* Header */}
                <header className="bg-background border-b px-4 py-3 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64">
                                <div className="font-bold text-lg mb-4 text-primary">ScriptSell</div>
                                <NavContent />
                            </SheetContent>
                        </Sheet>
                        <Link href="/app" className="font-bold text-xl text-primary flex items-center gap-2">
                            ScriptSell
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="hidden md:inline">Olá, {user?.name}</span>
                        <ModeToggle />
                        <User className="h-5 w-5 border rounded-full p-0.5" />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-1">
                    {/* Sidebar for Desktop */}
                    <aside className="hidden md:flex w-64 flex-col bg-background border-r p-4 sticky top-[57px] h-[calc(100vh-57px)]">
                        <NavContent />
                    </aside>

                    <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
