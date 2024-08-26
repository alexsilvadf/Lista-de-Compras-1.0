let ulProdutos = document.querySelector("ul");
let nomeProduto = document.querySelector("#nomeProduto");
let qtde = document.querySelector("#qtde");
let valorUnit = document.querySelector("#valorUnit");
let valorTotal = document.querySelector("#valorTotal");
let btnAdicionar = document.querySelector("#btnAdicionar");
let totalProdutos = document.querySelector("#totalProdutos");
let totalItens = document.querySelector("#totalItens");

let lstProdutos = JSON.parse(localStorage.getItem("@compra") || [{}]);
totalGeral = 0;
totItens = 0;

const maxDecimalPlaces = 2;

// teste

function renderizarTela() {
  ulProdutos.innerHTML = "";

  lstProdutos.map((resp) => {
    if (resp.nome !== undefined) {
      let liItem = document.createElement("li");
      liItem.setAttribute("class", "task");

      let imgCheck = document.createElement("img");
      imgCheck.setAttribute("src", "/img/checked.png");

      let imgTrahs = document.createElement("img");
      imgTrahs.setAttribute("src", "/img/trash.png");

      let posicao = lstProdutos.indexOf(resp);

      imgTrahs.setAttribute(
        "onclick",
        `removerProduto(${posicao}, ${resp.qtde}, ${resp.valorUnit})`
      );

      let nomeProduto = document.createElement("p");
      nomeProduto.setAttribute("class", "dadosProd");

      let qtdeProduto = document.createElement("p");
      qtdeProduto.setAttribute("class", "dadosProd");

      let vlrProduto = document.createElement("p");
      vlrProduto.setAttribute("class", "dadosProd");

      let vlrTotProduto = document.createElement("p");
      vlrTotProduto.setAttribute("class", "dadosProd");

      let produtoText = document.createTextNode(resp.nome);
      nomeProduto.appendChild(produtoText);

      let produtoQtd = document.createTextNode(resp.qtde);
      qtdeProduto.appendChild(produtoQtd);

      let produtoValorUnit = document.createTextNode(resp.valorUnit);
      vlrProduto.appendChild(produtoValorUnit);

      let totalProduto = resp.valorUnit * resp.qtde;
      vlrTotProduto.append(totalProduto);

      vlrTotProduto.innerHTML = totalProduto.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      liItem.appendChild(imgCheck);
      liItem.appendChild(nomeProduto);
      liItem.appendChild(vlrTotProduto);

      liItem.appendChild(imgTrahs);

      ulProdutos.appendChild(liItem);
    }
  });

  totalItens.innerHTML = totItens;

  totalProdutos.innerHTML = totalGeral.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function adicionarProduto() {
  if (nomeProduto.value === "" || qtde.value === "" || valorUnit.value === "") {
    alert("Preencha todos os campos");
    return;
  } else {
    lstProdutos.push({
      nome: nomeProduto.value,
      qtde: qtde.value,
      valorUnit: valorUnit.value,
    });

    let vlrTotal = parseFloat(valorTotal.value);

    totalGeral += vlrTotal;

    totItens += parseInt(qtde.value);

    nomeProduto.value = "";
    qtde.value = "";
    valorUnit.value = "";
    valorTotal.value = "";



    renderizarTela();

    salvarDados();
  }
}

function removerProduto(posicao, qtd, vlr) {

  lstProdutos.splice(posicao, 1);

  let resultadoValor = vlr * qtd;  

  totalGeral -= resultadoValor;

  totItens -= qtd;

  renderizarTela();
  salvarDados();
}

renderizarTela();

btnAdicionar.onclick = adicionarProduto;

valorUnit.onkeyup = calcularTotalParcial;

qtde.onkeyup = calcularTotalParcial;

function calcularTotalParcial() {
  if (qtde.value !== "" && valorUnit.value !== "") {
    let parcial = parseInt(qtde.value) * parseFloat(valorUnit.value);

    valorTotal.value = parcial.toFixed(2);

    valorUnit.value = valorUnit.slice(0,-1);
  }
}

valorUnit.addEventListener('input', () => {
  const value = valorUnit.value;
  const regex = new RegExp(`^\\d*(\\.\\d{0,${maxDecimalPlaces}})?$`);
  if (!regex.test(value)) {
    valorUnit.value = value.slice(0, -1); // Remove o último caractere inválido
  }
});

function salvarDados(){
  localStorage.setItem("@compra", JSON.stringify(lstProdutos));
}
