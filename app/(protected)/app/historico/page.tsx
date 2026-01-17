import { HistoryList } from "@/components/features/HistoryList";

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Histórico de Gerações</h1>
                <p className="text-gray-500 mt-2">Acesse e reutilize seus scripts anteriores.</p>
            </div>
            <HistoryList />
        </div>
    );
}
