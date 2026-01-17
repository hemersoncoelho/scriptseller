import { TemplateGrid } from "@/components/features/TemplateGrid";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">O que vamos criar hoje?</h1>
            </div>
            <TemplateGrid />
        </div>
    );
}
