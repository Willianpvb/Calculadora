class Calculadora{
    /*
    * Variaveis Para Inicalizar e fazer a calculadora funcionar são elas:
    * a CONTA(onde vai ficar o resultado e onde vai ficar o resultado convertido em numericos)
    * o H2(vai pegar o valor do h2 em string da pagina html)
    * os OPERADORES(para conseguir identificar cada operação que vai ser usada)
    */
    conta = ""
    h2 = document.querySelector(".resposta h2")
    operadores = ["/","+","-","*"]
    
    /**
     * 
     * @param {String} operation Operação númerica
     * Pega uma das opções de botões que não são numeros e verifica qual é e o que deve fazer com cada opção
     * @returns 
     */
    processarAtividade(operation){
        switch(operation){
            case "DEL":
                this.deletar();
                break;
            case "C":
                this.limparTudo();
                break;
            case "=":
                if(this.conta.length >= 3 && !(this.operadores.includes(this.conta[this.conta.length-2]))){
                    this.h2.innerHTML = this.resultado();
                }
                break;
            default:
                /*Não deixa o primeiro digito ser uma operação */
                if(this.conta.length >= 1){
                    /*Não deixa dois operadores um do lado do outro */
                    if(this.operadores.includes(this.conta[this.conta.length-2])){
                        this.trocarOperacao(operation);
                    }else{
                        this.escrever(operation)
                    }
                }
                break;   
        }

        return;
    }
    
    /**
     * Pega dois valores númericos e os soma
     * @returns retorna o resultado da conta
    */
    somar(a,b){
    let somar = a + b
    return somar
    }

    /**
     * 
     * Pega dois valores númericos e os subtrai
     * @returns retorna o resultado da conta
    */
    subtrair(a, b){
        let subtrair = a - b
        return subtrair
    }

    /**
     * Pega dois valores númericos e os multiplica
     * @param {*} a 
     * @param {*} b 
     * @returns retorna o resultado da conta
     */
    multiplicar(a, b){
        let multiplicar = a * b
        return multiplicar
    }

    /**
     * Pega dois valores númericos e os divide
     * @param {Number} a 
     * @param {Number} b 
     * 
     * @returns retorna o resultado da conta 
     */
    dividir(a, b){
        let dividir = a / b
        return dividir
    }
    
    /**
     *Transforma todos os numeros que são String em Numeros 
     * @returns retorna uma lista com os numeros e operações separados, com os números transformados em numbers
     */
    converterParaNumero(){
        //Transformar Strings em Numericos
        let contaPartes = this.conta.split(' ')

        for(let x = 0; x < contaPartes.length; x++ ){
            let valor = contaPartes[x]
            if(!this.operadores.includes(valor)){  
                contaPartes[x] = parseFloat(valor)
                }
        }
        return contaPartes
    }

    /**
     * Realiza a identificação de operaçãos para realizar os calculos dentro do loop para resultar no número final depois de todos os calculos e prioridades
     * @param {Array} calculo Lista com a conta inteira
     * @returns retorna o resultado de toda a conta
     */
    calculando(calculo){

        let calculandoPartes = calculo
        
        //Calculando
        while(calculandoPartes.length !== 1){
            
            let i = this.prioridade(calculandoPartes)

            /* Numeros que fazem parte do calculo especifico(o nº antes da operação e o nº depois da operação) */
            let nums = [calculandoPartes[i-1], calculandoPartes[i+1]]

            /* Restante da conta, excluindo apenas o calculo que vai ser executado nesse primeiro ciclo do loop while.
            *   Pegando tudo antes do calculo e tudo depois dele, para ser concatenado com o resultado no fim do switch. 
            */
            let anteriorPosterior = [calculandoPartes.slice(0, i-1), calculandoPartes.slice(i+2, calculandoPartes.length)]

            /* identifica qual o local e qual operação é e então a executa */
            switch(calculandoPartes[i]){
                case "/":
                    calculandoPartes = anteriorPosterior[0].concat(this.dividir(nums[0], nums[1]), anteriorPosterior[1])
                    break;
                case "*":
                    calculandoPartes = anteriorPosterior[0].concat(this.multiplicar(nums[0], nums[1]), anteriorPosterior[1])
                    break;
                case "+":
                    calculandoPartes = anteriorPosterior[0].concat(this.somar(nums[0], nums[1]), anteriorPosterior[1])
                    break;
                case "-":
                    calculandoPartes = anteriorPosterior[0].concat(this.subtrair(nums[0], nums[1]), anteriorPosterior[1])
                    break;
                default:
                    break;
            }
        }

        return calculandoPartes
    }

    /**
     * Define quais calculos deverão ser feitos primeiro
     * @param {Array} calculo 
     * @returns retorna o local onde se deve calcular primeiro por causa da sua prioridade matematica
     */
    prioridade(calculo){

        //Definindo A prioridade
        if(calculo.includes("/") || calculo.includes("*")){
            let EncontrarOperacao1 = calculo.indexOf('/')
            let EncontrarOperacao2 = calculo.indexOf('*')
            //Sabendo se tem os dois tipos
            if(EncontrarOperacao1 !== -1 && EncontrarOperacao2 !== -1){
                if(EncontrarOperacao1 < EncontrarOperacao2){
                    return EncontrarOperacao1
                }else{
                    return EncontrarOperacao2
                }

            /* Sabendo qual dos dois existe */
            }else {
                if(EncontrarOperacao1 === -1){
                    return EncontrarOperacao2
                }else{
                    return EncontrarOperacao1
                }

            }
          
        }

        return 1;
    }
    
    /**
     * Esse método intermadia todos os outros métodos para realizar o calculo da conta
     * @returns retorna o resulta da conta
     */
    resultado(){
        let calculo = this.converterParaNumero()

        let resultado = this.calculando(calculo)
        resultado = resultado.toString()

        this.conta = resultado

        return resultado
    }

    /**
     * Pega o ultimo digito da conta e o tira
     */
    deletar(){
        if(this.operadores.includes(this.conta[this.conta.length - 2])){
            this.conta = this.conta.substring(0, this.conta.length - 3)
        }else{
            this.conta = this.conta.substring(0, this.conta.length - 1)
        }

        this.h2.innerText = this.conta 
    }

    /**
     * Limpa as variaveis CONTA e H2
     */
    limparTudo(){
        this.conta = ""
        this.h2.innerHTML = ""
    }

    /**
     * Caso tenha outra operação já digitada vai ser verificada e ser for diferente será trocada pela que foi digitada
     * @param {String} operacao Operação(/*-+) que vai ser escrita 
     */
    trocarOperacao(operacao){
        if(operacao !== this.conta[this.conta.length-2]){
            this.conta = this.conta.substring(0,this.conta.length-3)
            this.escrever(operacao)
           
        }
    }
    
    /**
     * Identifica o valor digitado e o imprime na tela concatenado com o valor que já está sendo exibido, e é adicionado na variavel conta 
     * @param {String} tecla Botão digitado na calculadora
     */
    escrever(tecla){
        if(this.operadores.includes(tecla)){
            this.conta += " "+tecla+" "
        }else{
            this.conta += tecla
        }

        this.h2.innerText = this.conta 
    }

}


const calc = new Calculadora()

const buttons = document.querySelectorAll("#buttons-container button");

/*
 *Adiciona um evento de escuta(quando for clicado ativa os metodos descritos logo abaixo) nos botões da calculadora
 */
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === "."){
            calc.escrever(value);
        }else{
            calc.processarAtividade(value);
        }
    
    });

});

