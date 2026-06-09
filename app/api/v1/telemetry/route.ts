import { NextRequest, NextResponse } from "next/server";

// Handler para requisições HTTP POST
export async function POST(request: NextRequest) {
  try {
    // 1. Conceito BFF: Interceptação e validação de segurança interna
    // Verifica se a requisição passou pelo nosso ecossistema de Middleware
    const processedByHeader = request.headers.get("x-processed-by");

    console.log("[BFF TELEMETRY] Incoming request with headers:", Object.fromEntries(request.headers.entries()));
    
    if (processedByHeader !== "nextjs-edge-architecture") {
      return NextResponse.json(
        { error: "Unauthorized Gateway. Direct API access is blocked." },
        { status: 401 }
      );
    }

    // 2. Extração do payload enviado no corpo da requisição
    const body = await request.json();
    const { serviceName, cpuUsage, memoryUsage } = body;

    // Validação básica do schema dos dados no servidor
    if (!serviceName || cpuUsage === undefined) {
      return NextResponse.json(
        { error: "Invalid payload schema. Missing required parameters." },
        { status: 400 }
      );
    }

    // 3. Simulação de BFF de Alta Performance:
    // Aqui o Next.js poderia anexar uma chave secreta privada guardada no arquivo .env
    // e disparar um fetch em segundo plano para um microserviço robusto em .NET/C#
    // Ex: const internalRes = await fetch(process.env.NET_CORE_API_URL, { headers: { 'Authorization': process.env.SECRET_TOKEN } })
    console.log(`[BFF TELEMETRY] Service: ${serviceName} | CPU: ${cpuUsage}% | RAM: ${memoryUsage}MB`);

    // 4. Retorna a resposta limpa e formatada para o cliente
    return NextResponse.json(
      {
        status: "SUCCESS",
        message: "Telemetry ingested securely into the infrastructure backend.",
        receivedAt: new Date().toISOString(),
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Gateway Error parsing payload." },
      { status: 500 }
    );
  }
}