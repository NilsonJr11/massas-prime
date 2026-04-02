# 🍕 Massas Prime - Delivery System

Sistema de cardápio digital e checkout para pizzarias, desenvolvido com foco em experiência do usuário (UX) mobile e integração direta com WhatsApp para fechamento de pedidos.

## 🚀 Funcionalidades

- **Cardápio Dinâmico:** Listagem de pizzas e bebidas com suporte a diferentes tamanhos e sabores.
- **Sistema de Combos:** Banners promocionais que adicionam múltiplos itens ao carrinho com um único clique.
- **Carrinho de Compras:** Persistência de dados local (LocalStorage), permitindo que o usuário não perca o pedido ao atualizar a página.
- **Cálculo de Frete:** Ajuste automático do valor total baseado no bairro selecionado.
- **Checkout Inteligente:** Validação de campos obrigatórios (nome, endereço e forma de pagamento).
- **Integração WhatsApp:** Geração de mensagem estruturada com todos os detalhes do pedido via `encodeURIComponent`.
- **Cartão Fidelidade:** Feedback visual de progresso para incentivar novas compras.

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3:** Estrutura e estilização responsiva (Mobile First).
- **JavaScript (ES6+):** Lógica do carrinho, manipulação de DOM e persistência de dados.
- **FontAwesome:** Ícones para interface.
- **Canvas-confetti:** Feedback visual para ações de sucesso.
- **GitHub Pages:** Hospedagem e deploy contínuo.

## 📱 Demonstração

O projeto está disponível para testes no link abaixo:
👉 [https://NilsonJr11.github.io/massas-prime/](https://NilsonJr11.github.io/massas-prime/)

## 📂 Estrutura de Arquivos

```text
├── index.html          # Estrutura principal do site
├── style.css           # Estilizações e regras de responsividade
├── script.js           # Toda a lógica do sistema (Carrinho, WhatsApp, Banners)
└── img/                # Pasta contendo as imagens dos produtos e combos
