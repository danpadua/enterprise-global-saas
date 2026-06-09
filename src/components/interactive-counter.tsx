'use client'; // Esta diretiva marca o componente para ser hidratado no navegador

import { useState } from "react";

export function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl mt-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Client-Side Sandbox (Hydration Zone)
      </h3>
      <p className="text-2xl font-bold mb-4">Cliques: <span className="text-indigo-400">{count}</span></p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Interagir na Aplicação
      </button>
    </div>
  );
}