// src/components/ip-whitelist-form.tsx
'use client';

import { useState } from "react";
import { registerSecureIP } from "@/app/actions"; // Importando diretamente a função do servidor

export function IpWhitelistForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatus(null);

    try {
      // Invocando a função do servidor como se fosse uma função local comum!
      const result = await registerSecureIP(formData);
      setStatus(result);
      
      if (result.success) {
        // Limpa os campos do formulário se a operação correr bem
        const form = document.getElementById("whitelist-form") as HTMLFormElement;
        form?.reset();
      }
    } catch (error) {
      setStatus({ success: false, message: "Erro crítico na infraestrutura de rede." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl space-y-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
        Security Gateway: Authorize Secure IP
      </h3>
      
      <form id="whitelist-form" action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">IP Address (v4)</label>
            <input 
              name="ipAddress"
              type="text" 
              placeholder="Ex: 192.168.10.25"
              required
              className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Description / Reason</label>
            <input 
              name="description"
              type="text" 
              placeholder="Ex: DevOps VPN Gateway"
              required
              className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors shadow-lg"
        >
          {loading ? "A processar no Servidor..." : "Autorizar Acesso"}
        </button>
      </form>

      {status && (
        <div className={`p-3 rounded-lg text-xs font-mono border ${
          status.success ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" : "bg-rose-950/40 border-rose-800 text-rose-400"
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}