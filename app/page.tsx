// src/app/page.tsx
import { Suspense } from "react";
import Script from "next/script";
import { InteractiveCounter } from "@/components/interactive-counter";
import { GlobalMetrics } from "@/components/global-metrics";
import { AuditLogs } from "@/components/audit-logs";
import { UserProfile } from "@/components/user-profile";
import { IpWhitelistForm } from "@/components/ip-whitelist-form";
import { TelemetryTrigger } from "@/components/telemetry-trigger";

export default function HomePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <Script 
        src="https://example.com/analytics.js" 
        strategy="lazyOnload" // Carrega o script apenas após a página se tornar totalmente interativa
      />

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Asset Optimization Layer</h2>
        <p className="text-slate-400 max-w-2xl">
          Nesta etapa, implementamos fontes hospedadas localmente pelo build, tratamento automático de imagens e carregamento assíncrono e inteligente de scripts de terceiros.
        </p>
      </div>

      {/* Perfil com Imagem Otimizada (Prática de LCP) */}
      <UserProfile />

      {/* NOVO: Sandbox de disparo de Telemetria via API Route */}
      <TelemetryTrigger />

      {/* NOVO: Formulário de Mutação de Dados (Server Action) */}
      <IpWhitelistForm />
      
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Enterprise Data Strategy</h2>
        <p className="text-slate-400 max-w-2xl">
          Abaixo estamos combinando geração estática sob demanda (ISR) com streaming de dados em tempo real (No-Store), tudo controlado de forma nativa pela camada de rede do framework.
        </p>
      </div>

      {/* Seção 1: Componente Cacheado via ISR (Revalida a cada 60s) */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data Layer: Incremental Static Regeneration</h4>
        <GlobalMetrics />
      </div>

      {/* Seção 2: Componente Dinâmico em Tempo Real com Streaming/Suspense */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data Layer: Dynamic Server-Side Rendering</h4>
        <Suspense fallback={
          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 animate-pulse text-sm text-slate-500 font-mono">
            Streaming live infrastructure logs...
          </div>
        }>
          <AuditLogs />
        </Suspense>
      </div>

      {/* Sandbox da Parte 1 */}
      <div className="border-t border-slate-800 pt-6">
        <InteractiveCounter />
      </div>
    </div>
  );
}