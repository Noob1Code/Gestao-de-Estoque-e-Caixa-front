# 📦 Sistema de Gestão de Estoque e Caixa — Front-End

Este é o **Front-End** da aplicação de Gestão de Estoque e Vendas, desenvolvido com **Angular 17+** utilizando a abordagem de *Standalone Components* e a biblioteca de componentes **PrimeNG**.

O sistema oferece uma interface moderna e responsiva para controle de acesso (RBAC), gestão de produtos, fluxo de caixa (PDV) e relatórios gerenciais, com foco em experiência do usuário (UX) e integridade de dados.

---

## 🚀 Tecnologias Utilizadas

* Angular 17 (Standalone Components, Signals, `inject()`)
* TypeScript 5
* PrimeNG 17 (Table, Dialog, Toast, ConfirmDialog)
* Chart.js (Gráficos do Dashboard)
* RxJS (Programação Reativa)
* CSS3 / Flexbox / Grid

---

## 🛠 Funcionalidades Principais

### 🔐 Autenticação e Segurança

* **Login**: Acesso seguro com validação de credenciais via API.
* **Guards de Rota**:

  * `AuthGuard`: Protege rotas privadas contra acesso não autenticado.
  * `AdminGuard`: Restringe acesso a páginas administrativas (Estoque, Usuários).
  * `OperadorGuard`: Restringe acesso à página de Caixa.
* **Interceptor**: `UsuarioInterceptor` injeta automaticamente o header `X-Usuario` para auditoria no backend.

### 🛡️ Proteção de Navegação (UX Avançada)

* **Guards de Desativação (CanDeactivate)**:

  * `CaixaCanDeactivateGuard`: Impede que o operador saia da tela de vendas se houver itens no carrinho.
  * `FormCanDeactivateGuard`: Avisa o administrador se tentar sair de um formulário com dados não salvos.

### 📊 Dashboard (Gerencial)

* KPIs de Faturamento, Vendas e Estoque Crítico.
* Gráficos: "Top Produtos" e "Status de Estoque".
* Filtros por período.

### 📦 Gestão de Estoque (Admin)

* CRUD completo de produtos.
* Movimentação de estoque via modal.

### 🛒 Frente de Caixa / PDV (Operador)

* Busca inteligente com `p-autoComplete`.
* Validações de estoque em tempo real.
* Cálculos automáticos de subtotal e troco.

---

## 📂 Estrutura do Projeto

Arquitetura baseada em *features* e *core*.

```
(front)
├── .angular/
├── node_modules/
└── src
     ├── app
     │     ├── core
     │     │   ├── guards
     │     │   │   ├── admin.guard.ts
     │     │   │   ├── auth.guard.ts
     │     │   │   ├── caixa-can-deactivate.guard.ts
     │     │   │   ├── form-can-deactivate.guard.ts
     │     │   │   └── operador.guard.ts
     │     │   │
     │     │   ├──interceptors
     │     │   │   └── usuario.interceptor.ts
     │     │   │
     │     │   │
     │     │   ├── models
     │     │   │   ├── login.dto.ts
     │     │   │   ├── produto.dto.ts
     │     │   │   ├── usuario.dto.ts
     │     │   │   └── venda.dto.ts
     │     │   │
     │     │   └── services
     │     │       ├── auth.service.ts
     │     │       ├── produto.service.ts
     │     │       ├── usuario.service.ts
     │     │       └── venda.service.ts
     │     │
     │     ├── layout
     │     │   └── main-layout
     │     │       ├── main-layout.component.css
     │     │       ├── main-layout.component.html
     │     │       └── main-layout.component.ts
     │     │
     │     ├── pages
     │     │     ├── admin
     │     │     │   ├── estoque
     │     │     │   │   ├── estoque.component.css
     │     │     │   │   ├── estoque.component.html
     │     │     │   │   └── estoque.component.ts
     │     │     │   │
     │     │     │   └── usuarios
     │     │     │       ├── usuarios.component.css
     │     │     │       ├── usuarios.component.html
     │     │     │       └── usuarios.component.ts
     │     │     │
     │     │     ├── caixa
     │     │     │   ├── caixa.component.css
     │     │     │   ├── caixa.component.html
     │     │     │   └── caixa.component.ts
     │     │     │
     │     │     ├── dashboard                  
     │     │     │   ├── dashboard.component.css
     │     │     │   ├── dashboard.component.html
     │     │     │   └── dashboard.component.ts
     │     │     │
     │     │     ├── login
     │     │     │   ├── login.component.css
     │     │     │   ├── login.component.html
     │     │     │   └── login.component.ts
     │     │     │
     │     │     └── relatorios
     │     │          ├── relatorios.component.css
     │     │          ├── relatorios.component.html
     │     │          └── relatorios.component.ts
     │     │
     │     ├── app.component.css
     │     ├── app.component.html
     │     ├── app.component.spec.ts
     │     ├── app.component.ts
     │     ├── app.config.ts
     │     └── app.routes.ts
     │
     │
     ├── assets
     │    └──.gitkeep
     │
     ├── favicon.ico
     ├── index.html
     ├── main.ts
     ├── styles.css
     ├── .editorconfig
     ├── angular.json
     ├── package-lock.json
     ├── package.json
     └── README.md
```

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos

* Node.js 18+
* Angular CLI
* Backend Java rodando em `:8080`

### Passo a passo

**1. Clone o repositório:**

```bash
git clone https://github.com/Noob1Code/Gestao-de-Estoque-e-Caixa-front.git
cd Gestao-de-Estoque-e-Caixa-front
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Execute o projeto:**

```bash
ng serve
```

**4. Acesse:**

```
http://localhost:4200
```

---

## 🎨 Padrões de Interface (UI/UX)

* `p-confirmDialog` para confirmações críticas.
* `p-toast` para mensagens de sucesso/erro.
* `p-table` com ordenação e paginação.
* `p-dialog` para formulários em modal.

---

## 🔗 Integração com Backend

* Comunicação via REST API.
* Endpoints iniciam com:

```
http://localhost:8080/api/
```

* Backend deve permitir CORS.

---

## 📝 Licença

Projeto desenvolvido para fins acadêmicos/avaliação (**GCS - N2**).
