"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

interface ResultViewerProps {
    result: string | null;
    inputs: any;
    loading: boolean;
    onClear: () => void;
}

export function ResultViewer({ result, inputs, loading, onClear }: ResultViewerProps) {
    const [copied, setCopied] = useState(false);
    const [devMode, setDevMode] = useState(false);

    useEffect(() => {
        // Check dev mode setting
        const settings = storage.getSettings();
        setDevMode(settings.devMode);
    }, []);

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        toast.success("Resultado copiado!");
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-card rounded-xl border border-border p-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <p>Gerando seu script...</p>
                <p className="text-xs mt-2 text-muted-foreground/80">Isso pode levar alguns segundos.</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="h-full flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-card/50 rounded-xl border-2 border-dashed border-border p-8 text-center">
                <p>Preencha o formulário e clique em gerar.</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm h-full flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-lg text-card-foreground">Resultado</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onClear}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Limpar
                    </Button>
                    <Button size="sm" onClick={handleCopy}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copiado" : "Copiar"}
                    </Button>
                </div>
            </div>

            <div className="p-0 flex-1 overflow-hidden flex flex-col">
                <Tabs defaultValue="result" className="w-full flex-1 flex flex-col">
                    <div className="px-4 pt-2">
                        <TabsList>
                            <TabsTrigger value="result">Texto Gerado</TabsTrigger>
                            {devMode && <TabsTrigger value="details">Detalhes (Debug)</TabsTrigger>}
                        </TabsList>
                    </div>

                    <TabsContent value="result" className="flex-1 p-4 overflow-y-auto prose dark:prose-invert max-w-none text-sm leading-relaxed text-foreground">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4 border rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...props} />
                                    </div>
                                ),
                                thead: ({ node, ...props }) => (
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props} />
                                ),
                                th: ({ node, ...props }) => (
                                    <th className="px-6 py-3" {...props} />
                                ),
                                td: ({ node, ...props }) => (
                                    <td className="px-6 py-4 border-t dark:border-gray-600" {...props} />
                                )
                            }}
                        >
                            {result}
                        </ReactMarkdown>
                    </TabsContent>

                    {devMode && (
                        <TabsContent value="details" className="flex-1 p-4 overflow-y-auto bg-muted text-muted-foreground font-mono text-xs">
                            <pre>{JSON.stringify(inputs, null, 2)}</pre>
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}
