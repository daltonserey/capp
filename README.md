# Controle Acadêmico UFCG ++

Este é um minúsculo
[_userscript_](https://en.wikipedia.org/wiki/Userscript) que
adiciona a funcionalidade de leitura de CSV ao sistema de
Controle Acadêmico da UFCG. Ele permite que um professor _copie e
cole_ um arquivo CSV (tipicamente produzido por planilhas) na
página de registro de notas do controle, evitando que seja
necessário digitar as notas uma a uma.

## Instalação

Este script requer a instalação da extensão
[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey)
no Chrome (acho que também funciona no Firefox, mas nunca
testei). Uma vez instalada a extensão, você deve instalar
o script deste repositório. 

> Acho que o Tampermonkey permite instalar o script a partir de
> uma URL. Se você descobrir como, pode usar [este
> link](https://raw.githubusercontent.com/daltonserey/capp/master/controle-academico-pp-ufcg.js)
> para a versão mais recente do script.

Infelizmente, não descobri uma forma simples de disponibilizar
esta extensão. Quando descobrir, atualizo esta informação.

## Como usar?

O script funciona exclusivamente quando você usa o site do
Controle Acadêmico. Ele adiciona uma caixa em que você pode
digitar (melhor copiar e colar!) um CSV. A estrutura do CSV é
simples: em cada linha de texto devem constar: a matrícula do
estudante, a nota 1, a nota 2, a nota 3 e a nota final (se
houver) de cada estudante. A ordem dessas notas é importante. Por
outro lado, a ordem das linhas é irrelevante, porque o script associará
os dados de cada linha à tabela, com base na matrícula do
estudante. 

## Detalhes

Se o csv passado contiver matrículas inexistentes na tabela, os
dados serão simplesmente ignorados. De forma semelhante, o script
não verifica se todas as matrículas no diário de classe estão
contemplados no CSV. Nesse caso, o script irá manter intactos os
valores encontrados inicialmente no controle acadêmico.
