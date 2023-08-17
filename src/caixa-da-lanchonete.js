import { TabelaValores } from "./tabela_precos";
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let queijo = null;
        let chantily = null;
        let queijoPrincipal = false;
        let chantilyPrincipal = false;
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

                    if(itemData.codigo == 'queijo'){
                      queijo = itemData;
                    }
                    if(itemData.codigo == 'chantily'){
                      chantily = itemData;
                    }

                    totalCompra += parseFloat(itemData.valor * quantidade);
                  }else{
                    itemInexistente = true;
                  }
                }else{
                  quantidadeItens = true;
                }

            });
            if(queijo != null){
              itens.forEach(item => {
                const itemDetails = item.split(',');

                if(itemDetails.length == 2){
                  const codigo =itemDetails[0];
                  const quantidade = parseFloat(itemDetails[1]);

                  if(quantidade != 0){

                    const itemData = cardapio.getItem(codigo);

                    if(itemData != null){
                      if(itemData.codigo != queijo.codigo && queijo.descricao.includes(itemData.descricao)){
                        queijoPrincipal = true;
                      }
                    }
                    
                  }
                }
                  
              });
            }

            if(chantily != null){
              itens.forEach(item => {
                const itemDetails = item.split(',');

                if(itemDetails.length == 2){
                  const codigo =itemDetails[0];
                  const quantidade = parseFloat(itemDetails[1]);

                  if(quantidade != 0){

                    const itemData = cardapio.getItem(codigo);

                    if(itemData != null){
                      if(itemData.codigo != chantily.codigo && chantily.descricao.includes(itemData.descricao)){
                        chantilyPrincipal = true;
                      }
                    }
                    
                  }
                }
                  
              });
            }

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

          if(!queijoPrincipal && queijo != null){
            return 'Item extra não pode ser pedido sem o principal';
          }
          if(!chantilyPrincipal && chantily != null){
            return 'Item extra não pode ser pedido sem o principal';
          }
          
            return "R$ " + totalCompra.toFixed(2).replace('.', ',');
    } 

}

export { CaixaDaLanchonete };

