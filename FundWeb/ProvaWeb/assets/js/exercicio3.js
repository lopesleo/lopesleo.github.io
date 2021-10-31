function botao(){
          
   
    var aux = document.getElementById("salario");
    var valor = Number(aux.value);
    percent= aumento(valor);
    porcentagem = (percent * 100)
    acrescimo = valor * percent;
    salario = acrescimo  + valor
    var result = document.getElementById("result");
 
    result.innerHTML = `
   Salário antes do reajuste: ${valor} <br>
   Percentual de aumento aplicado: ${porcentagem} % <br>
   O valor aumentado foi de: ${acrescimo} <br>
   Novo salário, após o aumento: ${salario} `


    
}

function aumento(salario,porcentagem){
    if (salario) {
        porcentagem = verificaPorcentagem(salario);

        return porcentagem; 
        
    }
}

function verificaPorcentagem(salario){
    if (salario<=2800) {
        return 0.2
    }
    else if (salario>2800 && salario<7000){
        return 0.15
    }
    else if (salario>=7000 && salario<15000){
        return 0.10
    }
    else{
        return 0.05
    }

}