var movimentos = data.movimentos;
var contador = 0;

while (contador < movimentos.length) {
    
    var id = movimentos[contador].id;
    var nome = movimentos[contador].nome;
    var tipo = movimentos[contador].tipo;
    var categoria = movimentos[contador].categoria;
    var poder = movimentos[contador].poder;
    var precisao = movimentos[contador].precisao;

    var row = '<tr>';
    row += `<td>${fixarCasas(id)}</td>`;
    row += `<td>${nome}</td>`;
    row += `<td>${tipo}</td>`;
    row += `<td>${categoria}</td>`;
    row += `<td>${poder}</td>`;
    row += `<td>${precisao}</td>`;
    row += `<tr>`;

    moveTable.innerHTML += row;
    contador++;
}

function fixarCasas(numero) {

    if (numero < 10) {
        
        return "00" + numero;
    }

    if (numero >= 10 && numero < 100) {

        return "0" + numero;
    }

    if (numero >= 100) {
        
        return "" + numero;
    }
}