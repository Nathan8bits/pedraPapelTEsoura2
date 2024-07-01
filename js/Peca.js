//aqui está a classe de peça, com seus atributos e métodos

//pedra, papel, tesoura {0, 1, 2}
import {tam} from './main.js'

export class Peca {
    tamanhoTabuleiro = tam
    //= [16, 16]
    posicao
    tipo 
    predador
    presa

    constructor(posicao, tipo) {
        this.posicao = posicao
        this.tipo = tipo
        this.predador = (tipo + 1)%3
        this.presa = (tipo + 2)%3
    }

    mover(tabuleiro) {
        //if (!this.mesmoTipo(tabuleiro))//verificando se todas sao do mesmo tipo
       // {                          //a peça só se moverá se houver pelo menos uma peça de tipo diferente
            let posiMov = [];
    
        for(let x = -1; x < 2; x++) {  //posições vizinhas
            for(let y = -1; y < 2; y++) {
                let posiSimu = [this.posicao[0]+x, this.posicao[1]+y];
    
                if(!(x== 0 && y==0) && this.contidoArea(posiSimu) 
                    && (this.retornaIndex(posiSimu, tabuleiro) == null || tabuleiro[this.retornaIndex(posiSimu, tabuleiro)].tipo != this.tipo)) {
                    let valor = 0;
    
                    for(let i=0; i<tabuleiro.length; i++) { //percorrendo todas as peças do tabuleiro
                        if(tabuleiro[i] != this) {
                            if(tabuleiro[i].tipo == this.predador) {
                                valor += this.distancia(tabuleiro[i].posicao, posiSimu);
                            } else if(tabuleiro[i].tipo ==this.presa) {
                                valor -= this.distancia(tabuleiro[i].posicao, posiSimu);
                            }
                           
                        }
                    }
                    posiMov.push([valor, posiSimu])
                }
            }
        }
        let melhorPosi = this.melhorPosicao(posiMov);
        let index = this.retornaIndex(melhorPosi, tabuleiro)

        if( index!=null && tabuleiro[index].tipo == this.presa ) {
            tabuleiro[index].tipo = this.tipo
        } else if ( index!=null && tabuleiro[index].tipo == this.predador) {
            tabuleiro[index].tipo = this.tipo
        } else {
            console.log(`melhor posicao ${this.posicao} --> ${this.melhorPosicao(posiMov)}`)
            this.posicao = this.melhorPosicao(posiMov);
            
        }
        
        /*
        if( this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)!=null && tabuleiro[this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)].tipo == this.presa ) {
            tabuleiro[this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)].tipo = this.tipo
        } else if ( this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)!=null && tabuleiro[this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)].tipo == this.predador) {
            tabuleiro[this.retornaIndex(this.melhorPosicao(posiMov), tabuleiro)].tipo = this.tipo
        } else {
            console.log(`melhor posicao ${this.posicao} --> ${this.melhorPosicao(posiMov)}`)
            //this.posicao = this.melhorPosicao(posiMov);
            return this.melhorPosicao(posiMov);
        }
        */
        
        
    }

    retornaIndex(ponto, tabuleiro){
        //retorna o index do objeto que tem a posição passada como parâmetro
        for (let i = 0; i < tabuleiro.length; i++) {
            if(ponto[0] == tabuleiro[i].posicao[0] && ponto[1]==tabuleiro[i].posicao[1]) {
                return i;
            }
        }
        
        return null
    }

    melhorPosicao(matriz) {
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

    mesmoTipo(vetor){
        let todasMesmoTipo = true
        console.log(`mesmotipo: ${vetor[0].tipo}`)
        let tipo = vetor[0].tipo

        vetor.forEach(element => {
            if(element.tipo != tipo) {
                todasMesmoTipo = false;
            }
        });

        return todasMesmoTipo;
    }

    contidoArea(ponto) {
        //Essa função responde a essa pergunta:
        //o ponto está contido na área do tabuleiro?
        if((ponto[0] >= this.tamanhoTabuleiro[0] || ponto[0] < 0) 
            || (ponto[1] >= this.tamanhoTabuleiro[1] || ponto[1] < 0)) {
                return false 
            } 
            else {
                return true
            }
    }


    tam(){
        console.log(this.tamanhoTabuleiro)
    }

    distancia(a, b) {
        return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
    }
}
