import Image from "next/image";

export function UserProfile() {
  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 bg-slate-800 flex-shrink-0">
        {/* Usando uma imagem pública do Unsplash para testes */}
        <Image 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
          alt="User avatar profile picture"
          fill // Faz a imagem ocupar 100% do container pai dinamicamente
          sizes="(max-w-768px) 96px, 96px" // Diz ao Next exatamento quão grande a imagem será na tela para ele otimizar o tamanho do arquivo
          priority // Prioridade Máxima: Como este elemento fica no topo da tela, o Next pré-carrega para otimizar o LCP
          className="object-cover"
        />
      </div>
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="text-lg font-bold text-slate-200">System Administrator</h3>
        <p className="text-sm text-slate-400">Access Tier: <span className="text-amber-400 font-mono">Enterprise Global</span></p>
        <p className="text-xs text-slate-500">Imagens processadas dinamicamente na borda do servidor em formato WebP.</p>
      </div>
    </div>
  );
}