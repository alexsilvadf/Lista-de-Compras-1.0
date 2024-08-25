let ulProdutos = document.querySelector("ul");
let nomeProduto = document.querySelector("#nomeProduto");
let qtde = document.querySelector("#qtde");
let valorUnit = document.querySelector("#valorUnit");
let valorTotal = document.querySelector("#valorTotal");
let btnAdicionar = document.querySelector("#btnAdicionar");
let totalProdutos = document.querySelector("#totalProdutos");
let totalItens = document.querySelector("#totalItens");

lstProdutos = [
  {}
];
totalGeral = 0;
totItens = 0;

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

      let posicao = lstProdutos.indexOf(resp.nome);

      imgTrahs.setAttribute(
        "onclick",
        `removerProduto(${posicao}, ${resp.qtde}, ${resp.valorTotal})`
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

      console.log("produtoText: " + produtoText);

      liItem.appendChild(imgCheck);
      liItem.appendChild(nomeProduto);
      // liItem.appendChild(qtdeProduto);
      // liItem.appendChild(vlrProduto);
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
  if (nomeProduto.value === "" || qtde.value === "" || valorUnit === "") {
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
  }
}

function removerProduto(posicao, qtd, vlr) {
  //   console.log("posicao: " + posicao);
  //   console.log("qtd: " + qtd);
  //   console.log("vlr: " + vlr);

  lstProdutos.splice(posicao, 1);

  totalGeral -= vlrTotal;
  totItens -= parseInt(qtde.value);

  renderizarTela();
}

renderizarTela();

btnAdicionar.onclick = adicionarProduto;

valorUnit.onkeyup = calcularTotalParcial;

qtde.onkeyup = calcularTotalParcial;

function calcularTotalParcial() {
  if (qtde.value !== "" && valorUnit.value !== "") {
    let parcial = parseInt(qtde.value) * parseFloat(valorUnit.value);

    valorTotal.value = parcial;
  }
}
