"use client";

import { TEMPLATES } from "@/lib/constants/templates";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Video, Map, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    BookOpen,
    MessageSquare,
    Video,
    Map,
    Lightbulb
};

export function TemplateGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => {
                const Icon = iconMap[template.iconName] || BookOpen;

                return (
                    <Card key={template.id} className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col rounded-2xl border-border shadow-sm overflow-hidden group/card relative bg-card dark:hover:bg-white dark:hover:border-transparent">
                        <CardHeader className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-secondary rounded-xl p-2.5 inline-flex dark:group-hover/card:bg-neutral-100 transition-colors">
                                    <Icon className="w-5 h-5 text-foreground dark:group-hover/card:text-neutral-900 transition-colors" />
                                </div>
                            </div>

                            <CardTitle className="text-lg font-semibold text-card-foreground leading-tight mb-1 dark:group-hover/card:text-neutral-900 transition-colors">
                                {template.displayName || template.name}
                            </CardTitle>

                            {template.displaySubtitle && (
                                <p className="text-sm font-medium text-muted-foreground mb-2 dark:group-hover/card:text-neutral-600 transition-colors">
                                    {template.displaySubtitle}
                                </p>
                            )}

                            <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed dark:group-hover/card:text-neutral-500 transition-colors">
                                {template.description}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="p-6 pt-0 mt-auto">
                            <Link href={`/app/gerar?templateId=${template.id}`} className="w-full">
                                <Button className="w-full h-11 shadow-sm group transition-all duration-200 
                                    bg-primary text-primary-foreground
                                    hover:bg-blue-600 hover:text-white hover:border-blue-600
                                    dark:bg-primary dark:text-primary-foreground
                                    dark:group-hover/card:bg-neutral-900 dark:group-hover/card:text-white 
                                    dark:group-hover/card:hover:bg-neutral-800">
                                    Criar agora
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
