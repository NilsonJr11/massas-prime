# Teste do Sistema Dinâmico de Bordas

## Funcionalidade Implementada ✅

O seletor de bordas (#select-borda) agora é **100% dinâmico** com base no tipo de pizza.

### Regras Implementadas:

1. **"Sem Borda" é SEMPRE a primeira opção**
   - Valor: `0`
   - Nunca é removida, independente do tipo de pizza

2. **Para Pizzas Doces (tipo: 'doce'):**
   - Sem Borda (R$ 0,00) ✓
   - Chocolate (R$ 7,00) ✓

3. **Para Pizzas Salgadas (tipo: 'salgada'):**
   - Sem Borda (R$ 0,00) ✓
   - Catupiry (R$ 5,00) ✓
   - Cheddar (R$ 5,00) ✓

### Pizzas de Teste:

**Doces (exibem Chocolate):**
- "Chocolate com Morango" (id: 10, tipo: "doce")
- "Romeu e Julieta" (id: 11, tipo: "doce")

**Salgadas (exibem Catupiry + Cheddar):**
- "Mussarela" (id: 1, tipo: "salgada")
- "Quatro Queijos" (id: 2, tipo: "salgada")
- "Pepperoni" (id: 3, tipo: "salgada")
- "Portuguesa" (id: 4, tipo: "salgada")

### Comportamento Esperado:

1. Clique em "ADICIONAR" em qualquer pizza
2. O modal abre com o seletor de bordas preenchido dinamicamente
3. A opção "Sem Borda" está SEMPRE visível
4. As bordas específicas aparecem conforme o tipo
5. Ao trocar de pizza, o seletor é atualizado automaticamente
6. O preço se atualiza ao mudar a borda

### Código Responsável:

**Arquivo:** `/script.js` (linhas 125-151)

```javascript
// Filtragem de Bordas Dinâmico
const selectBorda = document.getElementById('select-borda');
if (!selectBorda) return;

// PASSO 1: A variável SEMPRE começa com o "Sem Borda"
let opcoesHtml = '<option value="0">Sem Borda</option>';

// PASSO 2: Verificamos o tipo da pizza e ACUMULAMOS (+=) as bordas específicas
if (pizza.tipo === 'doce') {
    opcoesHtml += '<option value="7.00">Chocolate (+R$ 7,00)</option>';
} else if (pizza.tipo === 'salgada') {
    opcoesHtml += '<option value="5.00">Catupiry (+R$ 5,00)</option>';
    opcoesHtml += '<option value="5.00">Cheddar (+R$ 5,00)</option>';
}

// PASSO 3: Injetamos tudo de uma vez no HTML (Sem Borda SEMPRE permanece)
selectBorda.innerHTML = opcoesHtml;

// PASSO 4: Resetamos o valor do select para "0" (Sem Borda) toda vez que o modal abrir
selectBorda.value = "0";
```

### Garantias de Qualidade:

✅ Sem Borda NUNCA desaparece  
✅ Sem Borda sempre está em primeiro lugar  
✅ Bordas específicas aparecem apenas para seu tipo  
✅ Valor "0" garante que sem borda = R$ 0,00 de taxa  
✅ Seletor é resetado ao abrir nova pizza  
✅ Dinâmico = sem hardcode de opções  
