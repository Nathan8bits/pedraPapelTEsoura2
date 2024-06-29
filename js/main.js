//aqui estão os eventos da página HTML
// e o setInterval, atualização de frames


//## 10:37

import {Peca} from './Peca.js'

var tipoSelecao = 0;

var pecas = []
pecas[0] = "start" //1

//celulas evento de click
function instanciarPecas(posicao) {
    for(let i=0; i<pecas.length; i++) {

        if(pecas[0] == "start") { //verificando se é a primeira peça adicionada
            pecas[0] = "inicializada";
            pecas[0] = new Peca(posicao, tipoSelecao);
            console.log(`${pecas.length} - peça: [${pecas[i].posicao}], ${pecas[i].tipo}. PRIMEIRA`);

        } else if (pecas[i].posicao == posicao) { //verificar posição repetida
            console.log(`${pecas.length} - peça: [${pecas[i].posicao}], ${pecas[i].tipo}. REMOVIDA`);
            pecas.splice(i, 1);

        } else {
            pecas.push(new Peca(posicao, tipoSelecao));
            console.log(`${pecas.length} - peça: [${pecas[pecas.length - 1].posicao}], peça: ${pecas[i++].tipo}. ADICIONADA`);
        }
    }
}

function btnTipo(tipo){
    tipoSelecao = tipo;
}


function exibirTodasPecas() {
    console.log("FUNÇÃO EXIBIR TODAS AS PEÇAS")
    pecas.forEach(p => {
        console.log(`[${p.posicao}], ${p.tipo}`)
    })
}


btnTipo(0);//pedra
instanciarPecas([1, 2]);

btnTipo(1)
instanciarPecas([7, 4])


instanciarPecas([7, 2])

//btnTipo(1)//papel
//instanciarPecas([1, 4]);
//instanciarPecas([7, 4])


//btnTipo(2)//tesoura
//instanciarPecas([1, 1])
//instanciarPecas([2, 1])
//instanciarPecas([2, 2])

//pecas[1].proximoPasso(pecas)/

exibirTodasPecas();