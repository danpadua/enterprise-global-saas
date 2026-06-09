# Enterprise Global SaaS — Next.js 15+ Advanced Architecture

Este é um projeto de referência arquitetural concebido para demonstrar as práticas mais avançadas, seguras e performantes do ecossistema **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**. A aplicação simula um dashboard corporativo de um SaaS Global, mitigando problemas comuns de infraestrutura, segurança e Core Web Vitals enfrentados por grandes plataformas tecnológicas.

---

## 🏗️ Visão Geral da Arquitetura

O projeto foi modularizado para extrair 100% dos recursos nativos do framework, eliminando a dependência de bibliotecas externas de terceiros para gestão de dados, caching e otimização de mídias.

### Pilares Técnicos Implementados:

1. **Renderização Híbrida Isolada (Server vs. Client):** Divisão cirúrgica entre componentes executados no servidor (RSC) para otimização de payload e hidratação seletiva no cliente apenas onde a interatividade é estritamente necessária.
2. **Estratégias de Cache Avançadas:** Coexistência harmónica de dados estáticos regenerados em segundo plano via **ISR (Incremental Static Regeneration)** e streaming de dados em tempo real via **Dynamic SSR (No-Store)** utilizando React Suspense.
3. **Mutações Seguras com Server Actions:** Modificação de dados diretamente no backend através de formulários nativos, contornando a necessidade de expor endpoints públicos tradicionais e aplicando revalidação cirúrgica de cache (`revalidatePath`).
4. **Padrão BFF (Backend-for-Frontend):** Centralização de rotas de API internas protegidas por uma camada de Middleware global na borda (_Edge Network_), blindando o sistema contra acessos maliciosos externos (como Postman/Insomnia).
5. **Otimização de Assets & Core Web Vitals:** Eliminação total de impactos de CLS (_Cumulative Layout Shift_) e LCP (_Largest Contentful Paint_) através do uso nativo de `next/image` (conversão automática para WebP na Edge) e `next/font` (fontes locais no tempo de build).
6. **Conteirização Standalone (Production Ready):** Configuração Multi-Stage Build via Docker otimizada para ambientes Kubernetes, AWS ECS ou GCP, reduzindo o tamanho final da imagem em até 90%.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 15+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Engine de Estilos:** Fontes do Google (Inter) pré-compiladas localmente
- **Containers:** Docker (Multi-stage & Standalone output)

---

## 📂 Estrutura do Projeto

```text
├── .next/               # Ficheiros gerados após o build de produção
├── public/              # Assets estáticos globais
└── src/
    ├── app/             # Camada core de roteamento (App Router)
    │   ├── api/         # Endpoints REST HTTP (Padrão BFF)
    │   ├── actions.ts   # Mutações isoladas (Server Actions)
    │   ├── layout.tsx   # Layout root (Server Component padrão)
    │   ├── middleware.ts# Interceptador global na borda (Edge Middleware)
    │   └── page.tsx     # Página principal agregadora de dados
    └── components/      # Componentes agnósticos encapsulados
        ├── audit-logs.tsx         # Componente Dynamic SSR (Real-time)
        ├── global-metrics.tsx     # Componente cacheado via ISR
        ├── interactive-counter.tsx# Sandbox interativa (Client Component)
        ├── ip-whitelist-form.tsx  # Formulário reativo integrado à Server Action
        ├── telemetry-trigger.tsx  # Disparador HTTP integrado ao BFF
        └── user-profile.tsx       # Perfil otimizado via Next Image
```

## 🚀 Como Rodar a Aplicação

### Pré-requisitos:

- \*\*Node.js v20 ou superior instalado.
- \*\*Docker instalado (opcional, para testes de produção).

### Desenvolvimento Local

1. **Clone o repositório para a sua máquina local.**
2. **Instale as dependências de forma limpa:**

```code
npm ci
```

3. ** Inicie o servidor de desenvolvimento:**

```code
npm run dev
```

## 🐳 Ambiente de Produção com Docker (Multi-Stage)

Este projeto está configurado para gerar um build minimalista standalone através do Docker. O processo ignora ficheiros de desenvolvimento e expõe apenas o servidor Node.js otimizado.
