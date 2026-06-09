// src/components/telemetry-trigger.tsx
'use client';

import { useState } from "react";

export function TelemetryTrigger() {
  const [loading, setLoading] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);

  async function sendTelemetry(serviceName: string, cpu: number, ram: number) {
    setLoading(true);
    setResponseLog(null);

    try {
      // Dispara o método POST para a nossa rota interna de API
      const res = await fetch("/api/v1/telemetry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // NOTA TÉCNICA: Como estamos no mesmo domínio, o Next.js anexa automaticamente 
          // os cabeçalhos tratados pelo middleware configurado na Parte 1.
        },
        body: JSON.stringify({
          serviceName,
          cpuUsage: cpu,
          memoryUsage: ram,
        }),
      });

      const data = await res.json();
      setResponseLog(`[HTTP ${res.status}] ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResponseLog("Network error communication failure.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col gap-1 border-b border-slate-800 pb-2">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          BFF Gateway Sandbox: Trigger Node Telemetry
        </h3>
        <p className="text-xs text-slate-500">Dispare requisições HTTP REST simulando microsserviços injetando métricas em tempo real.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => sendTelemetry("auth-service-pod-1", 12, 256)}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-700 font-mono text-xs px-4 py-2.5 rounded-lg text-slate-300 active:scale-95 transition-all"
        >
          Simular Auth Service (Leve)
        </button>
        <button
          onClick={() => sendTelemetry("payment-gateway-worker", 89, 1024)}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-700 font-mono text-xs px-4 py-2.5 rounded-lg text-slate-300 active:scale-95 transition-all"
        >
          Simular Payment Worker (Pesado)
        </button>
      </div>

      {responseLog && (
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">BFF JSON HTTP Response Log:</span>
          <pre className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-xs font-mono text-indigo-400 overflow-x-auto whitespace-pre-wrap">
            {responseLog}
          </pre>
        </div>
      )}
    </div>
  );
}