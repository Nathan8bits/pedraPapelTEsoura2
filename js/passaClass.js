import {Peca} from './Peca.js'

var tamanhoTabuleiro = [8, 8]

var tabuleiro = []
tabuleiro[0] = new Peca([0,1], 0)
tabuleiro[1] = new Peca([0,2], 0)
tabuleiro[2] = new Peca([1,2], 2)
//tabuleiro[3] = new Peca([0,3], 1)
//tabuleiro[4] = new Peca([0,4], 2)//tesoura
//tabuleiro[5] = new Peca([2,2], 2);

//console.log(`index 5 - posicao: ${tabuleiro[5].posicao}; predador: ${tabuleiro[5].predador}, presa: ${tabuleiro[5].presa}`)

//proxFrame(0);

function mover(index) {
    let posiMov = [];

    for(let x = -1; x < 2; x++) {  //posições vizinhas
        for(let y = -1; y < 2; y++) {
            let posiSimu = [tabuleiro[index].posicao[0]+x, tabuleiro[index].posicao[1]+y];

            if(!(x== 0 && y==0) && contidoArea(posiSimu) 
                && (retornaIndex(posiSimu) == null || tabuleiro[retornaIndex(posiSimu)].tipo != tabuleiro[index].tipo)) {
                let valor = 0;

                for(let i=0; i<tabuleiro.length; i++) { //percorrendo todas as peças do tabuleiro
                    if(tabuleiro[i] != tabuleiro[index]) {
                        if(tabuleiro[i].tipo == tabuleiro[index].predador) {
                            valor += distancia(tabuleiro[i].posicao, posiSimu);
                        } else if(tabuleiro[i].tipo ==tabuleiro[index].presa) {
                            valor -= distancia(tabuleiro[i].posicao, posiSimu);
                        }
                       
                    }
                }
                posiMov.push([valor, posiSimu])
            }
        }
    }
    
    if( retornaIndex(melhorPosicao(posiMov))!=null && tabuleiro[retornaIndex(melhorPosicao(posiMov))].tipo == tabuleiro[index].presa ) {
        tabuleiro[retornaIndex(melhorPosicao(posiMov))].tipo = tabuleiro[index].tipo
    } else if ( retornaIndex(melhorPosicao(posiMov))!=null && tabuleiro[retornaIndex(melhorPosicao(posiMov))].tipo == tabuleiro[index].predador) {
        tabuleiro[retornaIndex(melhorPosicao(posiMov))].tipo = tabuleiro[index].tipo
    } else {
        tabuleiro[index].posicao = melhorPosicao(posiMov);
    }
}

//console.log("chamando a função retornaIndex")
//retornaIndex([0, 1])

function retornaIndex(ponto){
    //retorna o index do objeto que tem a posição passada como parâmetro
    for (let i = 0; i < tabuleiro.length; i++) {
        if(ponto[0] == tabuleiro[i].posicao[0] && ponto[1]==tabuleiro[i].posicao[1]) {
            return i;
        }
    }
    
    return null
}

function melhorPosicao(matriz) {
    //retorna a posicao que correponde ao maior valor
    let maiorValor = matriz[0][0];
    let posicao =matriz[0][1];

    for(let i=1; i<matriz.length; i++) {
        if (matriz[i][0] > maiorValor){
            maiorValor = matriz[i][0];
            posicao = matriz[i][1];
        }
    }

    return posicao;
}

function contidoArea(ponto) {
    //Essa função responde a essa pergunta:
    //o ponto está contido na área do tabuleiro?
    if((ponto[0] > tamanhoTabuleiro[0] || ponto[0] < 0) 
        || (ponto[1] > tamanhoTabuleiro[1] || ponto[1] < 0)) {
            return false 
        } 
        else {
            return true
        }
}


function distancia(a, b) {
    return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
}
