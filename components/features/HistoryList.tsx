"use client";

import { storage } from "@/lib/storage";
import { GenerationHistoryItem } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function HistoryList() {
    const [history, setHistory] = useState<GenerationHistoryItem[]>([]);

    useEffect(() => {
        setHistory(storage.getHistory());
    }, []);

    if (history.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Nenhum histórico encontrado</p>
                <p className="text-sm">Gere seu primeiro script para vê-lo aqui.</p>
                <Link href="/app" className="mt-4 inline-block">
                    <Button>Criar Novo Script</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {history.map((item) => (
                <Card key={item.id} className="hover:shadow transition-shadow">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base mb-1">{item.templateName}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {format(new Date(item.createdAt), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                                </CardDescription>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {item.result.substring(0, 150)}...
                                </p>
                            </div>
                        </div>

                        <Link href={`/app/gerar?templateId=${item.templateId}&historyId=${item.id}`}>
                            <Button variant="ghost" size="icon">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    );
}
