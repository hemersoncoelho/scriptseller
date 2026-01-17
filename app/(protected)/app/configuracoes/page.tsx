"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch"; // Need to install switch
import { storage } from "@/lib/storage";
import { AppSettings } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({
        language: 'pt-BR',
        tone: 'Profissional',
        length: 'medium',
        devMode: false
    });

    useEffect(() => {
        setSettings(storage.getSettings());
    }, []);

    const handleSave = () => {
        storage.saveSettings(settings);
        toast.success("Configurações salvas com sucesso!");
        // Force reload to apply changes if needed, or rely on window reload.
        // Ideally context would handle this, but for MVP localstorage is single source.
        window.location.reload();
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
                <p className="text-gray-500 mt-2">Personalize suas preferências de geração.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Preferências Gerais</CardTitle>
                    <CardDescription>Estes valores serão usados como padrão em todos os templates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Idioma Padrão</Label>
                        <Select
                            value={settings.language}
                            onValueChange={(v: any) => setSettings({ ...settings, language: v })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                <SelectItem value="en-US">Inglês (US)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tom de Voz Padrão</Label>
                        <Select
                            value={settings.tone}
                            onValueChange={(v) => setSettings({ ...settings, tone: v })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Profissional">Profissional</SelectItem>
                                <SelectItem value="Amigável">Amigável</SelectItem>
                                <SelectItem value="Persuasivo">Persuasivo</SelectItem>
                                <SelectItem value="Luxuoso">Luxuoso</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tamanho Padrão</Label>
                        <Select
                            value={settings.length}
                            onValueChange={(v: any) => setSettings({ ...settings, length: v })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="short">Curto</SelectItem>
                                <SelectItem value="medium">Médio</SelectItem>
                                <SelectItem value="long">Longo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Desenvolvedor</CardTitle>
                    <CardDescription>Opções avançadas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Modo Debug</Label>
                            <p className="text-sm text-gray-500">
                                Exibe aba de detalhes técnicos na geração.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* Checkbox fallback if switch not installed yet, or install switch */}
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={settings.devMode}
                                onChange={(e) => setSettings({ ...settings, devMode: e.target.checked })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>Salvar Alterações</Button>
            </div>
        </div>
    );
}
