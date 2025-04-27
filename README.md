# Bacuri

Bacuri é um jogo de cartas sendo desenvolvido desde dezembro de 2024, por Jonathan Nascimento. Esse script simula diferentes estratégias para analisar estatisticamente se algum estilo de jogo confere ao jogador maior vantagem, possibilitando ajustes nas regras.

- Para rodar a simulação, primeiro instale as dependências

```
npm install
```

- Depois execute o comando de start

```
npm start
```

## Como jogar Bacuri

Bacuri é um jogo de cartas para dois a quatro jogadores com duração média de 15 minutos. O modo básico (excluindo a expansão de cartas bônus) pode ser jogado com um baralho comum e pequenos marcadores que estiverem a disposição, como feijões, pedrinhas, ou, idealmente, sementes de Bacuri.

### Preparação

1. Distribua diante de cada jogador quatro cartas de base, uma para cada naipe, na seguinte ordem da esquerda para a direita.

> Dica: utilize como base qualquer carta do naipe correspondente que não será usada durante o jogo (como por exemplo a carta K - Rei).

- Abelha (ouros)
- Beija flor (espadas)
- Capivara (copas)
- Onça (paus)

> Dica: para não ter dúvidas sobre qual é a ordem dos naipes, pense no tamanho dos animais do menor para o maior.

2. Separe um coringa para cada naipe.

> Dica: pode ser alguma carta não utilizada nesse jogo, como a Dama (Q).

3. Selecione as seguintes cartas:

- Abelha: do 1 (Ás) ao 10.
- Beija flor: do 1 (Ás) ao 9.
- Capivara: do 1 (Ás) ao 8.
- Onça: do 1 (Ás) ao 7.

As demais cartas não serão usadas (os valetes, 10 de beija flor, 9 e 10 de capivara, etc).

Embaralhe as cartas selecionadas e distribua quatro para cada jogador. Deixe o restante em uma pilha de compras.

3. Agrupe os marcadores a disposição dos jogadores no centro da mesa. Para referência, chamaremos os marcadores de sementes.

### Início do jogo e ações possíveis

A pessoa que plantou uma semente mais recentemente começa. Em sua vez, cada jogador poderá escolher uma entre as seguintes ações:

1. **Colocar uma semente em uma de suas bases**. Cada base pode ter até quatro sementes. Só é possível colocar uma semente em uma base, se a base a esquerda dela possuir pelo menos a mesma quantidade de sementes que ambas terão ao fim da ação. Por exemplo, se a base de naipe abelha possuir duas sementes, a base beija-flor possuir uma, e as demais nenhuma, só será possível colocar uma terceira semente na base abelha, ou uma segunda semente na base beija-flor, ou a primeira semente na base capivara.
1. **Colocar uma carta diante da base correspondente**. Para que uma carta seja posicionada diante de sua base, é necessário que a quantidade de sementes nessa base, somado a quantidade de cartas desse mesmo naipe já posicionadas, seja pelo menos igual ao número dessa carta. Por exemplo, se a base abelha já possui três sementes e duas cartas do mesmo naipe diante dela, já é possível posicionar qualquer carta do naipe abelha de número até cinco. Coringas não exigem sementes para ser posicionados e adicionam uma semente extra a soma total da base.
1. **Comprar uma carta**. Pode ser a carta no topo da pilha de compras, ou a carta no topo da pilha de descartes. Se o jogador já possuir o limite de cartas na mão, que é quatro, deverá descartar uma delas antes de comprar uma nova.
1. **Dizer pronto**. Contanto que todos os jogadores já tenham posicionado uma carta em cada base, ou quatro cartas em uma das bases, quando estiver satisfeito, o jogador da vez pode encerrar a partida, dando aos demais jogadores a oportunidade de realizar sua última ação.

### Expansão do jogo com cartas bonus

As cartas bônus não são compatíveis com o modo básico quando jogado com um baralho comum, pois elas interagem com o baralho oficial que contém um animal da Fauna brasileira representando cada número e cada naipe.

Nesse modo de jogo um novo baralho com efeitos diversos é adicionado a partida. No início ele deve ser embaralhado e cada jogador recebe uma carta. O baralho é deixado a disposição e sempre que um jogador posiciona uma carta diante de uma base completando uma quadra, ou seja, tendo cartas de mesmo número mas dos outros naipes já posicionadas anteriormente, pode-se comprar uma nova carta bônus.

Algumas dessas cartas somam pontos extras como recompensa para realizações durante a partida, outras permitem ações especiais. Para realizar tais ações, o jogador deverá, em sua vez, anunciar a ação, aplicar o seu efeito, descartar a carta e passar a vez ao próximo jogador.

As cartas bônus são:

1. Um ponto para cada ave
1. Um ponto para cada réptil
1. Um ponto para cada predador
1. Um ponto para cada polinizador
1. Um ponto para cada animal do bioma Amazônia
1. Um ponto para cada animal do bioma Serrado e Pampa
1. Um ponto para cada animal do bioma Pantanal
1. Um ponto para cada animal do bioma Caatinga e Mata Atlântica
1. Substitua a maior carta posicionada diante de uma das bases por outra qualquer da pilha de descartes do mesmo naipe
1. Descarte qualquer quantidade de cartas e compre novas cartas até o limite da mão
1. Pronto nada! Ignora quando alguém diz "pronto" fazendo a partida continuar
1. Permite olhar três cartas bônus e escolher uma delas

### Fim de jogo e contagem de pontos

Se ninguém disser pronto, quando o baralho de compras acabar, embaralhe a pilha de descartes para que ela seja a nova pilha de compras. Quando as cartas se esgotarem, o jogo termina.

Anote a pontuação de cada jogador em cada uma das seguinte categorias:

1. Um ponto para cada semente posicionada em uma base
1. Um ponto por carta para a maior sequência de números seguidos de um mesmo naipe
1. Pontos igual a maior carta do naipe de abelha
1. Pontos igual a maior carta do naipe de beija-flor vezes dois
1. Pontos igual a maior carta do naipe de capivara vezes três
1. Pontos igual a maior carta do naipe de onça vezes quatro
1. Pontos que cumprem as condições de cartas bônus

Some tudo, o jogador com mais pontos vence. Caso empate, ambos compartilham a vitória.
