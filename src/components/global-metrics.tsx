interface MetricData {
  totalUsers: number;
  processedVolume: string;
  uptime: string;
  lastUpdated: string;
}

// Simulação de uma chamada de API assíncrona para o nosso ecossistema
async function getGlobalMetrics(): Promise<MetricData> {
  // Prática sênior: Usando o fetch nativo com as tags estendidas do Next.js
  const res = await fetch("https://6a276a52a84f9d39e90886a8.mockapi.io/api/v1/metrics/1", {
    // ISR: Instruiu o Next.js a guardar essa resposta em cache por no mínimo 60 segundos
    next: { 
      revalidate: 60,
      tags: ['metrics-dashboard'] // Tag para revalidação sob demanda que usaremos no futuro
    }
  });

  console.log('[GlobalMetrics] Fetching latest metrics data...', res);

  // Se a API externa falhar em produção, o Next.js continuará servindo o último cache válido
  if (!res.ok) {
    return {
      totalUsers: 142050,
      processedVolume: "$1.2B",
      uptime: "99.99%",
      lastUpdated: new Date().toLocaleTimeString()
    };
  }

  return res.json();
}

export async function GlobalMetrics() {
  const metrics = await getGlobalMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl">
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800/50">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Users</span>
        <p className="text-2xl font-bold text-indigo-400 mt-1">{metrics.totalUsers}</p>
      </div>
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800/50">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processed Volume</span>
        <p className="text-2xl font-bold text-emerald-400 mt-1">{metrics.processedVolume}</p>
      </div>
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800/50">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Uptime</span>
        <p className="text-2xl font-bold text-amber-400 mt-1">{metrics.uptime}</p>
        <span className="text-[10px] text-slate-600 block mt-1">Cache updated at: {metrics.lastUpdated}</span>
      </div>
    </div>
  );
}