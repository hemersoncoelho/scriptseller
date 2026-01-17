"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { TEMPLATES } from "@/lib/constants/templates";
import { DynamicForm } from "@/components/features/DynamicForm";
import { ResultViewer } from "@/components/features/ResultViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { mockGenerate } from "@/lib/mock-api";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Component wrapper for Suspense
function GeneratorContent() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get("templateId");
    const { user } = useAuth();
    const router = useRouter();

    const [template, setTemplate] = useState<any>(null);
    const [inputs, setInputs] = useState<Record<string, any>>({});
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (templateId) {
            const found = TEMPLATES.find(t => t.id === templateId);
            if (found) {
                setTemplate(found);
            } else {
                toast.error("Template não encontrado");
                router.push('/app');
            }
        }
    }, [templateId, router]);

    useEffect(() => {
        const historyId = searchParams.get("historyId");
        if (historyId) {
            const history = storage.getHistory();
            const item = history.find(h => h.id === historyId);
            if (item && item.templateId === templateId) {
                setInputs(item.inputs);
                setResult(item.result);
                toast.info("Histórico carregado");
            }
        }
    }, [searchParams, templateId]);

    const handleGenerate = async () => {
        if (!user || !template) return;

        // Validate required fields
        const missing = template.schema.filter((f: any) => f.required && !inputs[f.key]);
        if (missing.length > 0) {
            toast.error(`Por favor, preencha: ${missing.map((f: any) => f.label).join(', ')}`);
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const settings = storage.getSettings();
            const payload = {
                userId: user.email, // using email as ID for MVP
                templateId: template.id,
                inputs: inputs,
                preferences: settings
            };

            const generatedText = await mockGenerate(payload);
            setResult(generatedText);

            // Save history
            storage.addToHistory({
                id: Date.now().toString(),
                templateId: template.id,
                templateName: template.name,
                inputs: inputs,
                result: generatedText,
                createdAt: new Date().toISOString()
            });

            toast.success("Script gerado com sucesso!");
        } catch (e) {
            toast.error("Erro ao gerar script. Tente novamente.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (!template) {
        return <div className="p-8 text-center text-gray-500">Carregando template...</div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
            <div className="mb-4 flex items-center gap-2">
                <Link href="/app">
                    <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Voltar</Button>
                </Link>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {template.displayName || template.name}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 relative">
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-xl transition-all duration-300">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                            <Brain className="w-16 h-16 text-primary relative z-10 animate-bounce duration-[2000ms]" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-foreground animate-pulse">Gerando Inteligência...</h3>
                        <p className="text-sm text-muted-foreground mt-1">Carregando seus insights</p>
                    </div>
                )}

                {/* Left Column: Form */}
                <Card className="flex flex-col overflow-hidden h-full bg-card border-border">
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm uppercase text-muted-foreground">Inputs</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto pt-0">
                        <DynamicForm
                            schema={template.schema}
                            values={inputs}
                            onChange={(k, v) => setInputs(prev => ({ ...prev, [k]: v }))}
                            disabled={loading}
                        />
                    </CardContent>
                    <div className="p-4 border-t border-border bg-muted/20">
                        <Button className="w-full font-semibold shadow-sm" onClick={handleGenerate} disabled={loading}>
                            {loading ? "Processando..." : "Gerar Script"}
                        </Button>
                    </div>
                </Card>

                {/* Right Column: Result */}
                <div className="h-full">
                    <ResultViewer
                        result={result}
                        inputs={inputs}
                        loading={false} // Loading handled by overlay now
                        onClear={() => { setResult(null); setInputs({}); }}
                    />
                </div>
            </div>
        </div>
    );
}

// Wrap in Suspense as `useSearchParams` causes static bail out
export default function GeneratePage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <GeneratorContent />
        </Suspense>
    );
}
