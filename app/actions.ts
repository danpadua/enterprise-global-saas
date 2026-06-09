'use server'; // Diretiva obrigatória de nível de ficheiro para indicar funções de servidor

import { revalidatePath } from "next/cache";

// Interface para tipar a resposta da nossa ação
export interface ActionResponse {
  success: boolean;
  message: string;
}

// Simulador de persistência na base de dados (em produção seria o Prisma/Supabase/MongoDB)
export async function registerSecureIP(formData: FormData): Promise<ActionResponse> {
  // Simula uma pequena latência de inserção no banco de dados
  await new Promise((resolve) => setTimeout(resolve, 800));

  const ipAddress = formData.get("ipAddress") as string;
  const description = formData.get("description") as string;

  // Validação básica de segurança em nível de servidor
  if (!ipAddress || !ipAddress.includes(".")) {
    return {
      success: false,
      message: "Endereço IP inválido. Certifique-se de introduzir um formato IPv4 válido.",
    };
  }

  console.log(`[SERVER REGISTRATION] IP: ${ipAddress} | Motivo: ${description}`);

  // PRÁTICA SÉNIOR CRÍTICA: Revalidação Cirúrgica de Cache
  // Como adicionámos um dado novo, precisamos de dizer ao Next.js para limpar o cache
  // da página principal para que o utilizador veja o novo IP na lista de imediato.
  revalidatePath("/");

  return {
    success: true,
    message: `IP ${ipAddress} autorizado com sucesso no ecossistema global.`,
  };
}