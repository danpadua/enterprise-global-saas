interface Log {
  id: string;
  action: string;
  ip: string;
  timestamp: string;
}

async function getLiveAuditLogs(): Promise<Log[]> {
  // Prática sênior: Forçando o Next.js a ignorar qualquer cache (Dynamic Rendering / SSR Puro)
  const res = await fetch("https://6a276a52a84f9d39e90886a8.mockapi.io/api/v1/logs", {
    cache: "no-store" // Garante que a requisição bata no servidor em 100% dos page views
  });

  if (!res.ok) {
    // Fallback de simulação local para teste imediato
    return [
      { id: "1", action: "AUTH_SUCCESS", ip: "192.168.1.50", timestamp: new Date().toISOString() },
      { id: "2", action: "API_KEY_CREATED", ip: "10.0.4.12", timestamp: new Date().toISOString() },
    ];
  }

  return res.json();
}

export async function AuditLogs() {
  const logs = await getLiveAuditLogs();

  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Real-Time Audit Logs (No-Store Stream)
            </h3>
            <span className="animate-pulse flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </div>
        <div className="divide-y divide-slate-800/60 font-mono text-xs">
            {logs.map((log) => (
                <div key={log.id} className="py-2.5 flex justify-between text-slate-300">
                    <div>
                        <span className="text-indigo-400 font-bold">[{log.action}]</span>
                        <span className="text-slate-500 ml-2">from {log.ip}</span>
                        <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}