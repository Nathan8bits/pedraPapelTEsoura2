//aqui estão os eventos da página HTML
// e o setInterval, atualização de frames


//variaveis do HTML
const botoes = document.querySelectorAll(".btnPPT")//botoes.value
botoes[0].checked = true
const btnRun = document.querySelector("#btnRunPPT")
let mapa = document.querySelector("#pedraPapelTesoura");
let celulaTd = []//= document.querySelectorAll(".celulaTd");;


//variveis de estado
var jogo = false;
export let tam = [16, 16];
var tipoSelecao = 0;
var pecas = []

import {Peca} from './Peca.js'


//celulas evento de click
function instanciarPecas(posicao) {
    console.log("INSTANCIAR PECAS: " + posicao)
    //caso a posicao passada nao exista crie um objeto com a posicao na ultima posicao do vetor
    //caso exista remova o obj que tenha essa posicao
    let encontrada = false;

    for(let i=0; i<pecas.length; i++) {
        if (pecas[i].posicao[0] == posicao[0]
                     && pecas[i].posicao[1] == posicao[1]) {
             console.log(`${i} - REMOVIDA: [${pecas[i].posicao}], ${pecas[i].tipo}`)
             pecas.splice(i, 1);
             encontrada = true;
             i=pecas.length
         }
    }
    if(!encontrada) {
        console.log(` ADICIONADA`)
        pecas.push(new Peca(posicao, tipoSelecao))
    }
}

function clickCelula(i) {
    console.log(tipoSelecao)
    console.log(([i%tam[0], (i-(i%tam[0]))/tam[0]]));
    instanciarPecas([i%tam[0], (i-(i%tam[0]))/tam[0]]);
    
    if(!(celulaTd[i].classList.contains("pedra") 
        || celulaTd[i].classList.contains("papel")
        || celulaTd[i].classList.contains("tesoura"))){
        switch (tipoSelecao) {
            case 0:
                celulaTd[i].classList.add("pedra")
                
                break;
            case 1:
                celulaTd[i].classList.add("papel")
                break;
            case 2:
                celulaTd[i].classList.add("tesoura");
                break;
        }

    } else {
        celulaTd[i].classList.remove("pedra");
        celulaTd[i].classList.remove("papel");
        celulaTd[i].classList.remove("tesoura");
    }
}

function removerClass(p) {
    console.log(`remover class: ${p.posicao}. `)
    console.log(`index: ${p.posicao[1]*tam[0] + p.posicao[0]}`)
    celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.remove("pedra");
    celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.remove("papel");
    celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.remove("tesoura");
}

function atualizarClasseCelula(p) {
    console.log(`atualizar peça: ${p.posicao}`)
    switch (p.tipo) {
        case 0:
            celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.add("pedra");
            break;
        case 1:
            celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.add("papel");
            break;
        case 2:
            celulaTd[p.posicao[1]*tam[0] + p.posicao[0]].classList.add("tesoura");
            break;
    }
}

function iniciarCelulas() {
    for(let i=0; i<celulaTd.length; i++) {
        celulaTd[i].addEventListener("click", () => {
            clickCelula(i);
           });
    }
}

function iniciarBotoes(){

    btnRun.addEventListener("click", ()=> {
        console.log(btnRun.innerHTML);
        if(btnRun.innerHTML == "RUN") {
            btnRun.innerHTML = "PAUSE"
            jogo = true;

        } else {
            jogo = false;
            btnRun.innerHTML = "RUN"
        }
    })

    for(let i=0; i<botoes.length; i++){
        botoes[i].addEventListener("click", () => {
            tipoSelecao = i;
            console.log(`tipoSelecao: ${tipoSelecao}`)
        });
    }
}

function criarTabuleiro( ) {
    
    const matrizMapa = document.createElement('table');
    matrizMapa.setAttribute('class', 'matrizMapa');

    for (let y = 0; y < tam[1]; y++) {
      const linha = document.createElement('tr');

      for (let x = 0; x < tam[0]; x++) {
        const celula = document.createElement('td');
        celulaTd.push(celula)
        celula.setAttribute("class", "celulaTd");
        linha.appendChild(celula);
      	}
      matrizMapa.appendChild(linha);
    	}
    	
        //celulaTd = document.querySelectorAll(".celulaTd");
    	mapa.appendChild(matrizMapa);
    	// matrizMapa deve ser o retorno dessa funcao
        iniciarCelulas();
        iniciarBotoes();
    }// fim da criarTabuleiro



function exibirTodasPecas() {
    console.log("FUNÇÃO EXIBIR TODAS AS PEÇAS")
    pecas.forEach(p => {
        console.log(`[${p.posicao}], ${p.tipo}`)
    })
}

criarTabuleiro();



setInterval(function (){
    //console.log(`qnts celulas: ${pecas.length}`);
    if(jogo) {
        console.log("run===========")
        
        for(let i=0; i<pecas.length; i++){
            console.log(pecas[i].posicao)
            removerClass(pecas[i]);
            pecas[i].mover(pecas);
            console.log(pecas[i].posicao)
            atualizarClasseCelula(pecas[i])
        }
    }
    
}, 500)