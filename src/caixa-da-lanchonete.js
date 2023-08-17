import { TabelaValores } from "./tabela_precos";
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let quantidadeInvalida = false;
        let quantidadeItens = false;
        let itemInexistente = false;

        const cardapio = new TabelaValores;

        let totalCompra = 0.00;
        const descontoCredito = 0.03;
        const descontoDinheiro = 0.05;

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';

          } else {
            itens.forEach(item => {
                
                const itemDetails = item.split(',');

                if(itemDetails.length == 2){
                  const codigo =itemDetails[0];
                  const quantidade = parseFloat(itemDetails[1]);
                  if(quantidade == 0){

                    quantidadeInvalida = true;
                    
                  }
                  const itemData = cardapio.getItem(codigo);
                  if(itemData != null){
                    totalCompra += parseFloat(itemData.valor * quantidade);
                  }else{
                    itemInexistente = true;
                  }
                }else{
                  quantidadeItens = true;
                }

                


            });
            if(metodoDePagamento == 'credito'){
              totalCompra = totalCompra + (totalCompra * descontoCredito);

            }else if(metodoDePagamento == 'dinheiro'){
              totalCompra = totalCompra - (totalCompra * descontoDinheiro);

            }else if(metodoDePagamento == 'debito'){

            }else{
              return 'Forma de pagamento inválida!'
            }
            
            
            
          }
          if(quantidadeInvalida){
            return 'Quantidade inválida!';
          }
          if(quantidadeItens || itemInexistente){
            return 'Item inválido!';
          }
          
            return "R$ " + totalCompra.toFixed(2).replace('.', ',');
    } 

}

export { CaixaDaLanchonete };

