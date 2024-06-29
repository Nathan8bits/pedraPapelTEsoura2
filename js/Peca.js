//aqui está a classe de peça, com seus atributos e métodos

//pedra, papel, tesoura {0, 1, 2}

export class Peca {
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

    proximoPasso(tabuleiro){
        let valoresPonto = [8] //8 pontos a serem analisados
        console.log(`posicao: ${this.posicao}`)

        for(let x = -1; x < 2; x++) {
            for(let y = -1; y < 2; y++) {
                //verificando se a peça se moveu: x!=0 e y!=0
                if(!(x == 0 && y == 0)) { 
                    let posSimuX = this.posicao[0] + x;
                    let posSimuY = this.posicao[1] + y;
                    console.log(`{${posSimuX}, ${posSimuY}}`)

                    for(let i=0; i < tabuleiro.length; i++) {
                        if(tabuleiro[i].tipo == this.predador) {
                            valoresPonto += -1*(this.distancia(tabuleiro[i].posicao, [posSimuX, posSimuY]));
                        }
                    }


                }
            }
        }
    }

    distancia(a, b) {
        return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
    }
}
