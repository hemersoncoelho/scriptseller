"use client";

import { FieldSchema } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

interface DynamicFormProps {
    schema: FieldSchema[];
    values: Record<string, any>;
    onChange: (key: string, value: any) => void;
    disabled?: boolean;
}

export function DynamicForm({ schema, values, onChange, disabled }: DynamicFormProps) {
    return (
        <div className="space-y-4">
            {schema.map((field) => (
                <div key={field.key} className="space-y-1.5">
                    <Label htmlFor={field.key} className="flex items-center gap-1.5">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                    </Label>

                    {field.type === 'select' && field.options ? (
                        <Select
                            value={values[field.key] || ""}
                            onValueChange={(val) => onChange(field.key, val)}
                            disabled={disabled}
                        >
                            <SelectTrigger id={field.key}>
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : field.type === 'textarea' ? (
                        <Textarea
                            id={field.key}
                            placeholder={field.placeholder}
                            value={values[field.key] || ""}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            rows={field.rows || 3}
                            disabled={disabled}
                        />
                    ) : field.type === 'boolean' ? (
                        <div className="flex items-center space-x-2 bg-card border p-3 rounded-lg">
                            <Switch
                                id={field.key}
                                checked={values[field.key] !== undefined ? values[field.key] : (field.defaultValue || false)}
                                onCheckedChange={(checked) => onChange(field.key, checked)}
                                disabled={disabled}
                            />
                            <Label htmlFor={field.key} className="cursor-pointer font-normal">
                                {field.label}
                            </Label>
                        </div>
                    ) : (
                        <Input
                            id={field.key}
                            type={field.type === 'number' ? 'number' : 'text'}
                            placeholder={field.placeholder}
                            value={values[field.key] || ""}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            disabled={disabled}
                        />
                    )}

                    {field.type === 'tags' && (
                        <p className="text-xs text-muted-foreground">Separe os itens por vírgula.</p>
                    )}
                </div>
            ))}
        </div>
    );
}
