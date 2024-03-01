# ESTRUTURA DE ESTILIZAÇÃO

## Estrutura e ambiente

    Trabalharemos com scss, porém o compilador desse código será um plugin do VSCode, o Live Sass Compiler (id da extenção: glenn2223.live-sass);

    Usaremos também o @use do sass (https://sass-lang.com/documentation/at-rules/use/) que é a forma mais indicada para criação de ligação entre diferentes arquivos afim de montar um único arquivo final;

    Dentro desta estrutura é necessário que todos os arquivos que utilizam @variables e @mixins chamem esses arquivos para si afim de serem capazes de criar as referencias necessárias;

## PASTAS

### utilities

    Pasta onde vamos manter os arquivos de configuração, os arquivos que são a base do nosso sistema;

### models

    Pasta para os scss de cada tipo de módulo específico. Importante que o nome do scss é o msm nome do model que ele se refere; O estilo dos models deve fzr tudo que é referente ao módulo;

## app.scss -> app.css

Aqui usaremos o app.scss para centralizar todos os arquivos scss que devem ser dividos afim de montar um estilo final que possa ser diferenciado para cada cliente, ou seja, vamos dividir os estilos por 'contexto'. Vamos ter os estilos de config que vão ser responsáveis pelo geral e os estilos específicos para grupos de conteúdo que possam ser retirados do sistema. Por exemplo, uma area de blog que pode não ser usada em todos os clientes, esta deve ter seus estilos especificos separados em um arquivo particular, este arquivo (\_blog.scss) vai ser usado (@use 'blog';) no app.scss afim de montar um arquivo final que possa ser limpo de regras inúteis.

## \_theme.scss :: %theme

Este arquivo contem o super auxiliar %theme e todos os seus subelementos. Tem como propósito centralizar todos os estilos reutilizaveis do sistema como títulos, configurações de texto e estilos de elementos repetitíveis no sistema.

Importante prestar atenção a essa montagem, pois todos os elementos opcionais devem herdar (@extend) do %theme e ajustar em si qualquer peculidaridade.

Nunca trazer peculiaridades para o %theme. Este arquivo deve conter apenas o super auxiliar %theme.

## \_main.scss

Este arquivo é onde será feito o estilo principal em si. Tudo que não for de um elemento especifico, como o exemplo do \_blog.scss, será editado aqui.
