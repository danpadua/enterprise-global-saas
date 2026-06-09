// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value;
  const { pathname } = request.nextUrl;

  // Protegendo rotas de uma futura área logada (/dashboard)
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      // Se não houver token de sessão, redireciona o usuário para a home de forma segura na borda
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Injetando um header customizado para monitoramento interno da arquitetura
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-processed-by', 'nextjs-edge-architecture');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configuração do Matcher: Define quais caminhos o middleware irá interceptar.
// Evita que o middleware rode em arquivos estáticos (imagens, favicon, etc) por questões de performance.
export const config = {
  matcher: [
    '/dashboard/:path*', // Captura qualquer sub-rota de dashboard
    '/api/:path*' // Captura rotas sensíveis de API que criaremos adiante
  ],
};