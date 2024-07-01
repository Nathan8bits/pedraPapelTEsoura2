import {Peca} from './Peca.js'

var tamanhoTabuleiro = [8, 8]

var tabuleiro = []
tabuleiro[0] = new Peca([0,1], 0)
tabuleiro[1] = new Peca([0,0], 0)
tabuleiro[2] = new Peca([0,2], 1)
//tabuleiro[3] = new Peca([0,3], 1)
//tabuleiro[4] = new Peca([0,4], 2)//tesoura
//tabuleiro[5] = new Peca([2,2], 2);


//console.log(`index 5 - posicao: ${tabuleiro[5].posicao}; predador: ${tabuleiro[5].predador}, presa: ${tabuleiro[5].presa}`)

proxFrame(0);

function proxFrame(index) {
    console.log(`peça considerada: [${tabuleiro[index].posicao}]; ${tabuleiro[index].tipo}`);
    let posiMov = [];

    for(let x = -1; x < 2; x++) {  //posições vizinhas
        for(let y = -1; y < 2; y++) {
            let posiSimu = [tabuleiro[index].posicao[0]+x, tabuleiro[index].posicao[1]+y];
            
            /*
            if(retornaIndex(posiSimu) != null) {
                console.log("essa posicao já está ocupada");

                if(tabuleiro[retornaIndex(posiSimu)].tipo == tabuleiro[index].tipo) {
                    console.log("por uma peça de mesmo tipo. essa possição deve ser desconsiderada!");
                }

            }*/

            if(!(x== 0 && y==0) && contidoArea(posiSimu) 
                && (retornaIndex(posiSimu) == null || tabuleiro[retornaIndex(posiSimu)].tipo != tabuleiro[index].tipo)) {
                let valor = 0;
                
                console.log("=============================================")
                console.log(`posição simulada: ${posiSimu}`);
    
                for(let i=0; i<tabuleiro.length; i++) { //percorrendo todas as peças do tabuleiro
                    if(tabuleiro[i] != tabuleiro[index]) {
                        if(tabuleiro[i].tipo == tabuleiro[index].predador) {
                            valor += distancia(tabuleiro[i].posicao, posiSimu);

                            console.log("----------------------------------------");
                            console.log(`predador: [${tabuleiro[i].posicao}]; ${tabuleiro[i].tipo}`);
                            console.log(`distancia entre: ${tabuleiro[i].posicao} e ${posiSimu} = ${distancia(tabuleiro[i].posicao, posiSimu)}`);
                            console.log(`valor: ${valor}`);
                            console.log("----------------------------------------");
                        } else if(tabuleiro[i].tipo ==tabuleiro[index].presa) {
                            valor -= distancia(tabuleiro[i].posicao, posiSimu);

                            console.log("----------------------------------------");
                            console.log(`presa: [${tabuleiro[i].posicao}]; ${tabuleiro[i].tipo}]`);
                            console.log(`distancia entre: ${tabuleiro[i].posicao} e ${posiSimu} = ${distancia(tabuleiro[i].posicao, posiSimu)}`);
                            console.log(`valor: ${valor}`);
                            console.log("----------------------------------------");
                        }
                       
                    }
                }
                posiMov.push([valor, posiSimu])
                //console.log(`valor: ${valor} posicao: ${posiSimu}`)
               
                //posiMov.push([valor, posiMov]);//posiMuv[0]- valor; posiMuv[1] - posicao
            }
        }
    }
    //exibindo resultados
    for(let i=0; i<posiMov.length; i++) {
        console.log(`VALOR PARA A POSICAO: valor: ${posiMov[i][0]}; posicao: ${posiMov[i][1]}`);
    }

    //retornar posicao de maior valor
    console.log(`MELHOR POSICAO: ${melhorPosicao(posiMov)}`)

    /*
    if(tabuleiro[melhorPosicao(posiMov)].tipo == tabuleiro[index].predador 
        || tabuleiro[melhorPosicao(posiMov)].tipo == tabuleiro[index].presa  ) {
            console.log(`FOI CONTAMINADA! peça: [${tabuleiro[i].posicao}]; ${tabuleiro[i].tipo}`)
            tabuleiro[melhorPosicao(posiMov)].tipo = tabuleiro[index].tipo
    }
    */
    

}

console.log("chamando a função retornaIndex")
retornaIndex([0, 1])

function retornaIndex(ponto){
    //retorna o index do objeto que tem a posição passada como parâmetro
    for (let i = 0; i < tabuleiro.length; i++) {
        if(ponto[0] == tabuleiro[i].posicao[0] && ponto[1]==tabuleiro[i].posicao[1]) {
            console.log(`posicao: ${ponto} --> index: ${i}`)
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

function exibirTodasPecas(matriz) {
    console.log("FUNÇÃO EXIBIR TODAS AS PEÇAS")
    matriz.forEach(p => {
        console.log(`[${p[0]}], ${p[1]}`)
    })
}

//console.log(contidoArea([-1, 8]))

function contidoArea(ponto) {
    //Essa função responde a essa pergunta:
    //o ponto está contido na área do tabuleiro?
    //console.log(`ponto: ${ponto}, area: ${tamanhoTabuleiro}`);
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