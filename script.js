// ==========================================
// 1. ESTADO GLOBAL E CONFIGURAÇÕES
// ==========================================
// Unificamos as variáveis para evitar conflitos de dados
let bannerAtual = 0;
let pizzas = [];
let carrinho = [];
let pizzaAtual = null; // Única variável para controlar a pizza aberta no modal
let taxaSelecionada = 5.00;
let descontoCupom = 0;

const sabores = [
    { id: 'mussarela', nome: 'Mussarela', categoria: 'salgada', preco: 40.00 },
    { id: 'portuguesa', nome: 'Portuguesa', categoria: 'salgada', preco: 50.00 },
    { id: 'choc_morango', nome: 'Chocolate com Morango', categoria: 'doce', preco: 42.00 },
    { id: 'romeu_julieta', nome: 'Romeu e Julieta', categoria: 'doce', preco: 38.00 }
];

const listaPizzas = [
     {   id: 1, nome: "Mussarela", preco: 40.00, tipo: "salgada",
        imagem: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=400", 
        descricao: "Molho de tomate artesanal, mussarela premium, rodelas de tomate fresco e orégano.",
        removiveis: ["Cebola", "Tomate", "Azeitona"]
    },
    {   id: 2, nome: "Quatro Queijos", preco: 45.00, tipo: "salgada",
        imagem: "https://images.unsplash.com/photo-1548369937-47519962c11a?q=80&w=1974", 
        descricao: "Combinação perfeita de mussarela, catupiry autêntico, provolone e parmesão ralado.",
        removiveis: ["Parmesão", "Provolone", "Catupiry"]
    },
    {   id: 3, nome: "Pepperoni", preco: 48.00, tipo: "salgada", destaque: true,
        imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080", 
        descricao: "Mussarela coberta com fatias generosas de pepperoni levemente picante e cebola.",
        removiveis: ["Pepperoni", "Cebola"]
    },
    {   id: 4, nome: "Portuguesa", preco: 50.00, tipo: "salgada",
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981", 
        descricao: "Presunto, ovos selecionados, cebola, ervilhas, mussarela e azeitonas pretas.",
        removiveis: ["Ovos", "Ervilhas", "Azeitonas"]
    },
    {   id: 10, nome: "Chocolate com Morango", preco: 42.00, tipo: "doce",
        imagem: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=400",
        descricao: "Brigadeiro artesanal, morangos frescos e granulado melita de ótima qualidade.",
        removiveis: ["Morango", "Granulado"]
    },
    {   id: 11, nome: "Romeu e Julieta", preco: 38.00, tipo: "doce",
        imagem: "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183_960_720.jpg",
        descricao: "Mussarela derretida e goiabada cascão premium, um clássico dos doces.",
        removiveis: ["Goiabada"]
    }
];

const listaBebidas = [
    { id: 20, nome: "Coca-Cola 2L", preco: 12.00, imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965", descricao: "Garrafa família de 2 Litros, bem gelada." },
    { id: 21, nome: "Suco de Laranja 500ml", preco: 8.00, imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1974", descricao: "Suco natural feito na hora." }
];

// ==========================================
// 2. RENDERIZAÇÃO DA INTERFACE
// ==========================================
function renderCardapio() {
    const container = document.getElementById('cardapio');
    if (!container) return;

    container.innerHTML = listaPizzas.map(p => `
        <div class="pizza-card" style="position: relative; margin-top: 20px;">
            ${p.destaque ? `<div class="badge-destaque" style="position: absolute; top: -10px; right: -5px; background: #ff0044; color: white; padding: 8px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; z-index: 10;">MAIS PEDIDA 🔥</div>` : ""}
            <img src="${p.imagem}" alt="${p.nome}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px 15px 0 0;">
            <div class="pizza-info">
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <span class="pizza-preco">R$ ${p.preco.toFixed(2)}</span>
                <button onclick="abrirModal('${p.nome}')">ADICIONAR</button>
            </div>
        </div>
    `).join('');
}

function adicionarComboFamilia() {
    // 1. Criamos o objeto seguindo o padrão que seu 'atualizarCarrinho' entende
    const comboItem = {
        nome: "🎁 COMBO: Portuguesa + 4 Queijos + Coca 2L",
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000",
        preco: 60.00, 
        detalhes: { 
            borda: "Padrão", 
            adicionais: ["Promoção da Semana"], 
            removidos: [] 
        }
    };

    // 2. Usamos 'carrinho' (sua variável da linha 8)
    carrinho.push(comboItem);

    // 3. Persistência no LocalStorage (importante para não sumir ao dar F5)
    localStorage.setItem('carrinhoPizzaria', JSON.stringify(carrinho));

    // 4. Funções de interface que você já tem
    atualizarCarrinho(); 
    abrirCarrinho();
    
    // 5. Feedback visual
    if (typeof dispararConfetes === 'function') {
        dispararConfetes();
    }

    console.log("Combo Família adicionado com sucesso! 🍕🥤");
}

function renderBebidas() {
    const container = document.getElementById('bebidas-container');
    if (!container) return;
    container.innerHTML = listaBebidas.map(b => `
        <div class="pizza-card">
            <img src="${b.imagem}" alt="${b.nome}" style="width: 100%; height: 150px; object-fit: contain; padding: 10px;">
            <div class="pizza-info">
                <h3 style="text-align: center;">${b.nome}</h3>
                <p style="text-align: center;">${b.descricao}</p>
                <span class="pizza-preco" style="display: block; text-align: center;">R$ ${b.preco.toFixed(2)}</span>
                <button onclick="adicionarBebidaAoCarrinho('${b.nome}')" style="width: 100%;">ADICIONAR</button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 3. LÓGICA DO MODAL (VERSÃO FINAL CORRIGIDA)
// ==========================================
function abrirModal(nomePizza) {
    const modal = document.getElementById('modal-pizzas');
    const pizza = listaPizzas.find(p => p.nome === nomePizza);
    if (!pizza || !modal) return;

    // 1. Iniciamos o objeto pizzaAtual com os dados da pizza clicada
    pizzaAtual = {
        nome: pizza.nome,
        precoBase: pizza.preco, // O valor vem da listaPizzas (ex: 40.00)
        precoFinal: pizza.preco,
        tipo: pizza.tipo
    };

    document.getElementById('modal-img').src = pizza.imagem;
    document.getElementById('modal-nome').innerText = pizza.nome;
    document.getElementById('modal-descricao').innerText = pizza.descricao;

    // Ingredientes Removíveis
    const containerRemover = document.getElementById('container-removiveis');
    containerRemover.innerHTML = (pizza.removiveis || []).map(ing => `
        <label><input type="checkbox" class="remover" value="${ing}"> 🚫 Sem ${ing}</label>
    `).join('');

    // Adicionais Dinâmicos
    const containerAdicionais = document.getElementById('container-adicionais');
    if (pizzaAtual.tipo === 'doce') {
        containerAdicionais.innerHTML = `
            <label><input type="checkbox" class="extra" value="Leite Condensado" data-preco="2.00"> ➕ Leite Condensado (+R$ 2,00)</label>
            <label><input type="checkbox" class="extra" value="Confete" data-preco="3.00"> ➕ Confete (+R$ 3,00)</label>`;
    } else {
        containerAdicionais.innerHTML = `
            <label><input type="checkbox" class="extra" value="Bacon" data-preco="4.00"> ➕ Bacon (+R$ 4,00)</label>
            <label><input type="checkbox" class="extra" value="Palmito" data-preco="5.00"> ➕ Palmito (+R$ 5,00)</label>
            <label><input type="checkbox" class="extra" value="Cheddar" data-preco="3.00"> ➕ Cheddar (+R$ 3,00)</label>`;
    }

    // Bordas
    const selectBorda = document.getElementById('select-borda');
    if (selectBorda) {
        let opcoesHtml = '<option value="0">Sem Borda</option>';
        if (pizzaAtual.tipo === 'doce') {
            opcoesHtml += '<option value="7.00">Chocolate (+R$ 7,00)</option>';
        } else {
            opcoesHtml += '<option value="5.00">Catupiry (+R$ 5,00)</option>';
            opcoesHtml += '<option value="5.00">Cheddar (+R$ 5,00)</option>';
        }
        selectBorda.innerHTML = opcoesHtml;
        selectBorda.value = "0";
    }

    // 2. Chamamos a soma para o preço não começar em 0
    atualizarPrecoModal();
    modal.style.display = 'block';
}

function atualizarPrecoModal() {
    // 1. Verifica se existe uma pizza selecionada para evitar erro de 'undefined'
    if (!pizzaAtual) return;

    // 2. Começa o cálculo pelo preço base da pizza (ex: 40.00)
    let total = parseFloat(pizzaAtual.precoBase) || 0;

    // 3. Soma o valor da Borda (buscando pelo ID 'select-borda' do seu HTML)
    const selectBorda = document.getElementById('select-borda');
    if (selectBorda) {
        total += parseFloat(selectBorda.value) || 0;
    }

    // 4. Soma os Adicionais (buscando pela classe 'extra' que criamos no abrirModal)
    const adicionais = document.querySelectorAll('.extra:checked');
    adicionais.forEach(item => {
        // Pega o valor que está no atributo data-preco do input
        total += parseFloat(item.getAttribute('data-preco')) || 0;
    });

    // 5. Salva o valor final no objeto global para o carrinho usar depois
    pizzaAtual.precoFinal = total;

    // 6. ATUALIZA A TELA (Usando o ID 'modal-total' que está no seu HTML)
    const displayPreco = document.getElementById('modal-total');
    if (displayPreco) {
        displayPreco.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

// ==========================================
// 4. LÓGICA DO CARRINHO
// ==========================================
function adicionarAoCarrinho() {
    if (!pizzaAtual || !pizzaAtual.nome) return;

    const tipoPizza = document.getElementById('select-tipo-pizza')?.value || "inteira";
    const segundoSabor = document.getElementById('select-segundo-sabor')?.value || null;
    const bordaSelect = document.getElementById('select-borda');
    const nomeBorda = bordaSelect ? bordaSelect.options[bordaSelect.selectedIndex].text : "Sem Borda";
    
    const adicionais = Array.from(document.querySelectorAll('.extra:checked')).map(el => el.value);
    const removidos = Array.from(document.querySelectorAll('.remover:checked')).map(el => el.value);

    carrinho.push({
        nome: pizzaAtual.nome,
        preco: parseFloat(pizzaAtual.precoFinal),
        tipo: tipoPizza, // Salva se é inteira ou meia
        sabor2: tipoPizza === "meia" ? segundoSabor : null, // Salva o nome do 2º sabor
        detalhes: { borda: nomeBorda, adicionais, removidos }
    });

    fecharModal();
    atualizarCarrinho();
}

function adicionarBebidaAoCarrinho(nome) {
    const bebida = listaBebidas.find(b => b.nome === nome);
    if (bebida) {
        carrinho.push({ nome: bebida.nome, preco: parseFloat(bebida.preco) });
        atualizarCarrinho();
        abrirCarrinho();
    }
}

function abrirModalPizza() {
    const modal = document.getElementById('modal-pizzas');
    modal.style.display = 'flex'; // 'flex' centraliza melhor o conteúdo que 'block'
}

function atualizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    if (!container) return;

    container.innerHTML = carrinho.map((item, index) => {
        // 1. Tenta pegar a imagem de dentro do próprio item (Funciona para os COMBOS)
        // 2. Se não tiver no item, procura na lista (Funciona para Pizzas comuns)
        const info = listaPizzas.find(p => p.nome === item.nome) || listaBebidas.find(b => b.nome === item.nome);
        const img = item.imagem || (info ? info.imagem : ""); 

        return `
            <div class="item-carrinho" style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${img}" style="width: 40px; height: 40px; border-radius: 5px; object-fit: cover;>
                    <div style="flex-grow: 1;">
                        <h4 style="margin:0; font-size:0.9rem;">${item.nome}</h4>
                        <p style="margin:0; font-size:0.8rem; color:#ff3366;">R$ ${parseFloat(item.preco).toFixed(2)}</p>
                    </div>
                    <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fa fa-trash"></i></button>
                </div>
                </div>`;
    }).join('');

    // --- Sua lógica de cálculos abaixo continua igual ---
    // ...

    // --- Restante da sua lógica de cálculos (Subtotal, Total, etc) ---
    let soma = carrinho.reduce((acc, i) => acc + (parseFloat(i.preco) || 0), 0);
    if (document.getElementById('subtotal-carrinho')) document.getElementById('subtotal-carrinho').innerText = `R$ ${soma.toFixed(2)}`;
    if (document.getElementById('total-carrinho')) document.getElementById('total-carrinho').innerText = `R$ ${(soma + taxaSelecionada).toFixed(2)}`;
    if (document.getElementById('contagem-carrinho')) document.getElementById('contagem-carrinho').innerText = carrinho.length;
    localStorage.setItem('carrinhoPizzaria', JSON.stringify(carrinho));
}

function atualizarOpcoesSegundoSabor(saborPrincipalId) {
    const saborPrincipal = sabores.find(s => s.id === saborPrincipalId);
    const selectSegundoSabor = document.getElementById('segundo-sabor-select');
    
    // Limpa as opções atuais
    selectSegundoSabor.innerHTML = '<option value="">Selecione o segundo sabor</option>';

    // Filtra sabores que pertencem à mesma categoria do principal
    const saboresCompativeis = sabores.filter(s => s.categoria === saborPrincipal.categoria);

    saboresCompativeis.forEach(sabor => {
        const option = document.createElement('option');
        option.value = sabor.id;
        option.textContent = sabor.nome;
        selectSegundoSabor.appendChild(option);
    });
}

function registrarVendaFidelidade() {
    const pizzasNoCarrinho = carrinho.filter(item => item.detalhes).length; 
    if (pizzasNoCarrinho > 0) {
        let totalHistorico = parseInt(localStorage.getItem('fidelidadePizzasPrime')) || 0;
        totalHistorico += pizzasNoCarrinho;
        localStorage.setItem('fidelidadePizzasPrime', totalHistorico);
        atualizarFidelidade();
    }
}

function atualizarFidelidade() {
    const pontos = parseInt(localStorage.getItem('fidelidadePizzasPrime')) || 0;
    const barra = document.getElementById('progresso-pizzas');
    const textoStatus = document.getElementById('fidelidade-status');

    if (!barra || !textoStatus) return;

    const porcentagem = Math.min((pontos / 10) * 100, 100);
    barra.style.width = porcentagem + "%";
    barra.innerText = Math.floor(porcentagem) + "%";

    if (pontos >= 10) {
        textoStatus.innerHTML = "✨ **PRÊMIO LIBERADO!** Pizza Doce Grátis!";
        textoStatus.style.color = "#28a745";
        if (typeof confetti === 'function') {
            dispararConfetes();
        }
    } else {
        textoStatus.innerText = `Você já pediu ${pontos} de 10 pizzas para ganhar seu brinde!`;
        textoStatus.style.color = "#666";
    }
}

// ==========================================
// 5. FINALIZAÇÃO E WHATSAPP
// ==========================================
function enviarWhatsApp() {
    if (!carrinho.length) return alert("Seu carrinho está vazio!");

    const nome = document.getElementById('cliente-nome').value;
    const endereco = document.getElementById('cliente-endereco').value;
    const bairroSelect = document.getElementById('select-bairro');
    const bairro = bairroSelect ? bairroSelect.options[bairroSelect.selectedIndex].text : "";
    // --- 💳 NOVA LINHA: Captura a Forma de Pagamento ---
    const formaPagamento = document.getElementById('forma-pagamento').value;
    // --------------------------------------------------

    if (!nome || !endereco || formaPagamento === "") {
        alert("Por favor, preencha nome, bairro e forma de pagamento!");
        return;
    }

    // Registra no fidelidade, mas NÃO limpa o carrinho automaticamente
    registrarVendaFidelidade();

    let msg = `*🔥 NOVO PEDIDO - MASSAS PRIME *\n\n`;
    msg += `👤 *Cliente:* ${nome}\n📍 *Endereço:* ${endereco}\n🏘️ *Bairro:* ${bairro}\n💲 *Pagamento:* ${formaPagamento}\n💰` ;
    msg += `------------------------------------------\n`;

    carrinho.forEach((item, i) => {
        msg += `*${i+1}. ${item.nome}* - R$ ${parseFloat(item.preco).toFixed(2)}\n`;
        if (item.detalhes) {
            if (item.detalhes.borda !== "Sem Borda") msg += `   🍕 Borda: ${item.detalhes.borda}\n`;
            if (item.detalhes.adicionais.length) msg += `   ➕ Extras: ${item.detalhes.adicionais.join(', ')}\n`;
            if (item.detalhes.removidos.length) msg += `   🚫 Sem: ${item.detalhes.removidos.join(', ')}\n`;
        }
    });

    let subtotal = carrinho.reduce((acc, i) => acc + (parseFloat(i.preco) || 0), 0);
    let valorDesconto = subtotal * (descontoCupom / 100);
    let totalGeral = subtotal - valorDesconto + taxaSelecionada;

    msg += `------------------------------------------\n`;
    msg += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    if (descontoCupom > 0) msg += `🎁 Desconto (${descontoCupom}%): -R$ ${valorDesconto.toFixed(2)}\n`;
    msg += `🚚 Taxa de Entrega: R$ ${taxaSelecionada.toFixed(2)}\n`;
    msg += `💰 *TOTAL A PAGAR: R$ ${totalGeral.toFixed(2)}*`;

    // Apenas abre o WhatsApp. O carrinho continua lá como rascunho.
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, "_blank");
}

function aplicarCupom() {
    const inputCupom = document.getElementById('input-cupom').value.trim().toUpperCase();
    const feedback = document.getElementById('feedback-cupom');

    if (inputCupom === "PRIME10") {
        descontoCupom = 10;
        feedback.innerText = "Cupom PRIME10 aplicado! (10% OFF)";
        feedback.style.color = "#28a745";
    } else if (inputCupom === "") {
        descontoCupom = 0;
        feedback.innerText = "";
    } else {
        descontoCupom = 0;
        feedback.innerText = "Cupom inválido.";
        feedback.style.color = "#ff0000";
    }
    atualizarCarrinho();
}

// ==========================================
// 6. INICIALIZAÇÃO E AUXILIARES
// ==========================================
function fecharModal() { document.getElementById('modal-pizzas').style.display = 'none'; }
function abrirCarrinho() { document.getElementById("carrinho-lateral").style.width = "350px"; }
function fecharCarrinho() { document.getElementById("carrinho-lateral").style.width = "0"; }
function removerDoCarrinho(index) { carrinho.splice(index, 1); atualizarCarrinho(); }

function mudarBannerManual(direcao) {
    const banners = document.querySelectorAll('.banner-item');
    if (banners.length === 0) return;

    banners.forEach(b => {
        b.classList.remove('active');
        b.style.display = 'none';
    });

    bannerAtual += direcao;
    if (bannerAtual >= banners.length) bannerAtual = 0;
    if (bannerAtual < 0) bannerAtual = banners.length - 1;

    banners[bannerAtual].classList.add('active');
    banners[bannerAtual].style.display = 'flex';
}

window.onload = () => {
    renderCardapio();
    renderBebidas();

    // Inicia o carrossel automático
    iniciarBanner();

    // Pausa o banner quando o usuário passa o mouse (opcional, mas muito moderno)
    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.addEventListener('mouseenter', () => clearInterval(window.intervaloBanner));
        bannerContainer.addEventListener('mouseleave', () => iniciarBanner());
    }

    if (typeof iniciarBanner === "function") iniciarBanner();
    if (typeof atualizarFidelidade === "function") atualizarFidelidade();

    const btnFechar = document.querySelector('#modal-pizzas .close');
    if (btnFechar) btnFechar.onclick = fecharModal;

    const btnConfirmar = document.getElementById('btn-confirmar-adicionar');
    if (btnConfirmar) btnConfirmar.onclick = adicionarAoCarrinho;

    const selectBorda = document.getElementById('select-borda');
    if (selectBorda) selectBorda.onchange = atualizarPrecoModal;

    // Listener para os extras
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('extra')) {
            atualizarPrecoModal();
        }
    });

    const carrinhoSalvo = localStorage.getItem('carrinhoPizzaria');
    if (carrinhoSalvo) {
        try {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarCarrinho();
        } catch (e) {
            console.error("Erro ao carregar carrinho:", e);
            carrinho = [];
        }
    }
    console.log("Sistemas Massas Prime inicializados com sucesso! 🔥");
};

function iniciarBanner() {
    // Limpa qualquer intervalo anterior para não acumular velocidade
    if (window.intervaloBanner) clearInterval(window.intervaloBanner);

    window.intervaloBanner = setInterval(() => {
        mudarBannerManual(1); // Chama sua função existente para avançar
    }, 5000); // 5000ms = 5 segundos
}

function scrollParaCardapio() {
    const cardapioSection = document.getElementById('cardapio');
    if (cardapioSection) {
        cardapioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function atualizarFrete() {
    const selectFrete = document.getElementById('select-bairro');
    const displayTotalGeral = document.getElementById('total-carrinho');

    if (!selectFrete || !displayTotalGeral) return;

    let taxaEntregaStr = selectFrete.options[selectFrete.selectedIndex]?.getAttribute('data-valor');
    taxaSelecionada = parseFloat(taxaEntregaStr) || 0;

    // Recalcula o subtotal varrendo o carrinho, assim fica impossível dar erro de formatação
    let subtotal = carrinho.reduce((acc, i) => acc + (parseFloat(i.preco) || 0), 0);
    const totalGeral = subtotal + taxaSelecionada;

    displayTotalGeral.innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function dispararConfetes() {
    if(typeof confetti !== 'function') return;
    const duracao = 3 * 1000;
    const fim = Date.now() + duracao;

    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff0000', '#ffd700'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff0000', '#ffd700'] });
        if (Date.now() < fim) requestAnimationFrame(frame);
    }());
}

// Funções de Meia a Meia (mantidas como base, sem interferir no fluxo principal)
function abrirModalMeiaMeia() {
    const modal = document.getElementById('modal-pizzas');
    document.getElementById('modal-nome').innerText = "🍕 Pizza Meia a Meia";
    document.getElementById('modal-descricao').innerText = "Escolha um sabor salgado e um sabor doce.";

    document.getElementById('container-removiveis').innerHTML = `
        <label>Sabor Salgado:</label>
        <select id="sabor-salgado" onchange="atualizarPrecoMeia()">
            <option value="45.00">Mussarela - R$ 45,00</option>
            <option value="48.00">Pepperoni - R$ 48,00</option>
            <option value="50.00">Frango c/ Catupiry - R$ 50,00</option>
        </select>
    `;

    document.getElementById('container-adicionais').innerHTML = `
        <label>Sabor Doce:</label>
        <select id="sabor-doce" onchange="atualizarPrecoMeia()">
            <option value="42.00">Chocolate - R$ 42,00</option>
            <option value="45.00">Romeu e Julieta - R$ 45,00</option>
            <option value="47.00">Prestigio - R$ 47,00</option>
        </select>
    `;

    modal.style.display = 'block';
    atualizarPrecoMeia();
}

function abrirModalCombo(pizzaNome, bebidaNome, precoTotal) {
    // 1. Pegamos os elementos do seu modal que já existem na tela
    const modal = document.getElementById('modal-produto'); // Use o ID real do seu modal aqui!
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    const modalPreco = document.getElementById('modal-preco');
    const modalImagem = document.getElementById('modal-imagem');
    
    // 2. Preenchemos o modal com as informações do Combo
    if (modalTitulo) modalTitulo.innerText = `Combo: Pizza + ${bebidaNome}`;
    if (modalDescricao) modalDescricao.innerText = `Uma deliciosa Pizza Grande sabor ${pizzaNome} acompanhada de uma refrescante ${bebidaNome}.`;
    if (modalPreco) modalPreco.innerText = `R$ ${parseFloat(precoTotal).toFixed(2)}`;
    
    // Opcional: Coloca uma imagem legal de combo se tiver
    if (modalImagem) modalImagem.src = "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2069";

    // 3. Muda a ação do botão "Adicionar ao Carrinho" do Modal
    // para executar a função que realmente joga o combo no carrinho!
    const btnConfirmar = document.getElementById('btn-adicionar-carrinho'); // ID do botão verde do modal
    if (btnConfirmar) {
        btnConfirmar.onclick = function() {
            executarAdicaoCombo(pizzaNome, bebidaNome, precoTotal);
            fecharModal(); // Função que você já deve ter para fechar o modal
        };
    }

    // 4. Exibe o modal (use a mesma lógica que você já usa para abrir o modal de pizza)
    if (modal) modal.classList.add('active'); // Ou modal.style.display = "block";
}

// Essa função roda QUANDO O CLIENTE CLICA no botão do modal aberto!
function executarAdicaoCombo(pizzaNome, bebidaNome, precoTotal) {
    const itemCombo = {
        nome: `🎁 COMBO: Pizza (${pizzaNome}) + ${bebidaNome}`,
        imagem: "https://images.unsplash.com/photo-1620052397235-aa4ca207826e?q=80&w=1000",
        preco: parseFloat(precoTotal),
        detalhes: {
            borda: "Padrão",
            adicionais: ["Promoção do Dia"],
            removidos: []
        }
    };

    carrinho.push(itemCombo);
    localStorage.setItem('carrinhoPizzaria', JSON.stringify(carrinho));
    atualizarCarrinho();
    abrirCarrinho();
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function atualizarPrecoMeia() {
    const preco1 = parseFloat(document.getElementById('sabor-salgado').value) || 0;
    const preco2 = parseFloat(document.getElementById('sabor-doce').value) || 0;
    const valorFinal = Math.max(preco1, preco2);
    
    const displayTotal = document.getElementById('modal-total') || document.getElementById('preco-modal');
    if (displayTotal) displayTotal.innerText = `Total: R$ ${valorFinal.toFixed(2).replace('.', ',')}`;
}

function limparCarrinho() {
    // 1. Pergunta ao usuário para evitar cliques acidentais (Boa prática de UX/QA)
    if (confirm("Deseja realmente limpar todos os itens do seu pedido?")) {
        
        // 2. Esvazia o array na memória
        carrinho = [];
        
        // 3. Remove os dados salvos no navegador
        localStorage.removeItem('carrinhoPizzaria');
        
        // 4. Atualiza a interface visual (zera contadores e lista)
        atualizarCarrinho();
        
        // 5. Opcional: Fecha o carrinho lateral após limpar
        fecharCarrinho();
        
        console.log("Carrinho limpo com sucesso! 🧹");
    }
}

function adicionarCombo(pizzaNome, bebidaNome, precoTotal) {
    // 1. Cria um item especial de combo na estrutura que o carrinho entende
    const itemCombo = {
        nome: `🎁 COMBO: Pizza (${pizzaNome}) + ${bebidaNome}`,
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000",
        preco: parseFloat(precoTotal), // Blindagem contra NaN! 🛡️
        detalhes: {
            borda: "Padrão",
            adicionais: ["Promoção do Dia"],
            removidos: []
        }
    };

    // 2. Adiciona ao carrinho global
    carrinho.push(itemCombo);
    
    // 3. Persiste os dados no banco do navegador
    localStorage.setItem('carrinhoPizzaria', JSON.stringify(carrinho));
    
    // 4. Atualiza a interface (zera valores, contador e lista)
    atualizarCarrinho();
    
    // 5. Abre o carrinho lateral para o cliente ver
    abrirCarrinho();
    
    // 6. Efeito de confete para celebrar a compra! 🎉
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 7. Feedback no console (evita travar a tela com alert)
    console.log("Combo adicionado com sucesso! 🍕🥤");
}

// Função para abrir a barra lateral do carrinho (Efeito Gaveta)
function abrirCarrinho() {
    const carrinho = document.getElementById('carrinho-lateral');
    if (carrinho) {
        // Se a tela for de celular, ocupa 100%, senão ocupa 350px
        carrinho.style.width = window.innerWidth < 400 ? '100%' : '350px'; 
    } else {
        console.error("O elemento 'carrinho-lateral' não foi encontrado no HTML!");
    }
}

// Função para fechar a barra lateral do carrinho
function fecharCarrinho() {
    const carrinho = document.getElementById('carrinho-lateral');
    if (carrinho) {
        carrinho.style.width = '0'; // Zera a largura para esconder
    }
}

// Exemplo de como organizar seus dados (se já não estiverem assim)
const saboresPizzas = {
    salgadas: ["Mussarela", "Quatro Queijos", "Portuguesa", "Pepperoni"],
    doces: ["Romeu e Julieta", "Chocolate com Morango"]
};

function alternarSaborExtra() {
    const tipo = document.getElementById("select-tipo-pizza").value;
    const container = document.getElementById("container-segundo-sabor");
    const selectSabor2 = document.getElementById("select-segundo-sabor");
    const nomePizzaPrincipal = document.getElementById("modal-nome").innerText;

    if (tipo === "meia") {
        container.style.display = "block";
        
        // Limpa opções atuais
        selectSabor2.innerHTML = "";

        // Verifica se a pizza atual é doce ou salgada para filtrar o segundo sabor
        const ehDoce = saboresPizzas.doces.some(s => nomePizzaPrincipal.includes(s));
        const listaParaExibir = ehDoce ? saboresPizzas.doces : saboresPizzas.salgadas;

        listaParaExibir.forEach(sabor => {
            let option = document.createElement("option");
            option.value = sabor;
            option.text = sabor;
            selectSabor2.appendChild(option);
        });
    } else {
        container.style.display = "none";
    }
    atualizarPrecoModal();
}