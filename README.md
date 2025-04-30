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

### Cartas oficiais

| Número da carta | Naipe       | Nome                                    | Tamanho (cm) | Classe/Subfilo     | Vale 1 semente | Papel ecológico                      |
|-----------------|-------------|-----------------------------------------|--------------|---------------------|----------------|--------------------------------------|
| 1               | Abelha      | Mosquito-da-dengue (Aedes aegypti)      | 0,5          | Inseto              | não            | Presa/outros                         |
| 2               | Abelha      | Joaninha (Coccinellidae)                | 1            | Inseto              | sim            | Predador                             |
| 3               | Abelha      | Cupim (Isoptera)                        | 1,2          | Inseto              | sim            | Presa/outros                         |
| 4               | Abelha      | Abelha (Apis mellifera)                 | 1,5          | Inseto              | sim            | Polinizador                          |
| 5               | Abelha      | Peixe-lápis (Nannostomus eques)        | 2,5          | Peixes              | não            | Presa/outros                         |
| 6               | Abelha      | Perereca-de-vidro (Hyalinobatrachium)   | 3            | Anfíbio             | sim            | Predador                             |
| 7               | Abelha      | Borboleta-azul (Morpho spp.)            | 5            | Inseto              | sim            | Polinizador                          |
| 8               | Abelha      | Lagarto (Stenocercus scirtetellus)      | 6            | Réptil              | não            | Predador                             |
| 9               | Abelha      | Rã-do-brejo-pequena (Hypsiboas semilineatus) | 8     | Anfíbio             | sim            | Predador                             |
| 10              | Abelha      | Bicho-pau (Phasmatodea)                 | 9            | Inseto              | não            | Presa/outros                         |
| 1               | Beija-flor  | Beija-flor (Trochilidae)                | 11           | Ave                 | sim            | Polinizador                          |
| 2               | Beija-flor  | Lagarto pequeno (Heterodactylus lundii) | 12           | Réptil              | não            | Predador                             |
| 3               | Beija-flor  | Lagartixa (Hemidactylus mabouia)        | 13           | Réptil              | sim            | Predador                             |
| 4               | Beija-flor  | Rato-do-campo (Akodon spp.)             | 14           | Mamífero            | sim            | Dispersor de sementes                |
| 5               | Beija-flor  | Sapo-cururu (Rhinella marina)           | 15           | Anfíbio             | não            | Predador                             |
| 7               | Beija-flor  | Calango-do-Cerrado (Tropidurus oreadicus) | 24         | Réptil              | sim            | Predador                             |
| 8               | Beija-flor  | Preá (Cavia aperea)                     | 25           | Mamífero            | sim            | Dispersor de sementes                |
| 9               | Beija-flor  | Mico-leão-dourado (Leontopithecus rosalia) | 30       | Mamífero            | sim            | Dispersor de sementes                |
| 1               | Capivara    | Tatu-galinha (Dasypus novemcinctus)     | 50           | Mamífero            | sim            | Dispersor de sementes                |
| 2               | Capivara    | Preguiça-marmota                        | 52           | Mamífero            | sim            | Dispersor de sementes                |
| 3               | Capivara    | Macaco-prego (Sapajus spp.)             | 70           | Mamífero            | sim            | Dispersor de sementes                |
| 4               | Capivara    | Tartaruga-da-amazônia                   | 80           | Réptil              | sim            | Dispersor de sementes                |
| 5               | Capivara    | Tamanduá-mirim (Tamandua tetradactyla) | 88           | Mamífero            | sim            | Predador                             |
| 6               | Capivara    | Cachorra-larga (Hydrolycus scomberoides)| 90           | Peixes              | não            | Predador                             |
| 7               | Capivara    | Harpia                                  | 99           | Ave                 | não            | Predador                             |
| 8               | Capivara    | Capivara (Hydrochoerus hydrochaeris)    | 134          | Mamífero            | não            | Presa/outros, Dispersor de sementes  |
| 1               | Onça        | Lobo-guará (Chrysocyon brachyurus)      | 147          | Mamífero            | sim            | Predador, Dispersor de sementes      |
| 2               | Onça        | Ema (Rhea americana)                    | 170          | Ave                 | sim            | Dispersor de sementes                |
| 3               | Onça        | Onça-pintada (Panthera onca)            | 180          | Mamífero            | não            | Predador                             |
| 5               | Onça        | Cervo-do-pantanal (Blastocerus dichotomus) | 200        | Mamífero            | sim            | Presa/outros, Dispersor de sementes  |
| 4               | Onça        | Boto-cor-de-rosa (Inia geoffrensis)     | 250          | Mamífero            | sim            | Predador, Dispersor de sementes      |
| 6               | Onça        | Pirarucu                                | 300          | Peixes              | não            | Predador                             |
| 7               | Onça        | Sucuri-verde (Eunectes murinus)         | 500          | Réptil              | não            | Predador                             |

Você gostaria que essa tabela fosse exportada como um arquivo `.md` também?

### Início do jogo e ações possíveis

A pessoa que plantou uma semente mais recentemente começa. Em sua vez, cada jogador poderá escolher uma entre as seguintes ações:

1. **Colocar uma semente em uma de suas bases**. Cada base pode ter até quatro sementes. Só é possível colocar uma semente em uma base, se a base a esquerda dela possuir pelo menos a mesma quantidade de sementes que ambas terão ao fim da ação. Por exemplo, se a base de naipe abelha possuir duas sementes, a base beija-flor possuir uma, e as demais nenhuma, só será possível colocar uma terceira semente na base abelha, ou uma segunda semente na base beija-flor, ou a primeira semente na base capivara.
1. **Colocar uma carta diante da base correspondente**. Para que uma carta da mão do jogador, ou diretamente da mesa, seja posicionada na pilha de cartas da base correspondente, é necessário que a quantidade de sementes nessa base, somado a quantidade de cartas já posicionadas desse mesmo naipe que possuem ícone de semente, seja pelo menos igual ao número dessa carta. Por exemplo, se a base abelha já possui três sementes e duas cartas com o ícone de semente do mesmo naipe diante dela, já é possível posicionar qualquer carta do naipe abelha de número até cinco. Coringas não exigem sementes para ser posicionados e adicionam uma semente extra a soma total da base. Nota: a posição das cartas em cada pilha pode ser remanejado ao longo do jogo para que a pontuação de maior sequência seja mais facilmente calculada, mas os coringas não substituem números faltantes.
1. **Comprar uma carta**. Adiciona-se a mão a carta no topo da pilha de compras. Se o jogador já possuir o limite de quatro cartas na mão, deverá descartar uma delas colocando-a por último no baralho de compras, antes de comprar uma nova.
1. **Dizer pronto**. Contanto que todos os jogadores já tenham posicionado uma carta em cada base, ou quatro cartas em uma das bases, quando estiver satisfeito, o jogador da vez pode dizer "pronto", dando aos demais jogadores a oportunidade de realizar sua última ação e então encerra-se a partida.

### Expansão do jogo com cartas bonus

As cartas bônus não são compatíveis com o modo básico quando jogado com um baralho comum, pois elas interagem com o baralho oficial que contém um animal da Fauna brasileira representando cada número e cada naipe.

Nesse modo de jogo um novo baralho com efeitos diversos é adicionado a partida. No início ele deve ser embaralhado e cada jogador recebe uma carta. O baralho é deixado a disposição e sempre que um jogador posiciona uma carta diante de uma base completando uma quadra, ou seja, tendo cartas de mesmo número mas dos outros naipes já posicionadas anteriormente, pode-se comprar uma nova carta bônus.

Algumas dessas cartas somam pontos extras como recompensa para realizações durante a partida, outras permitem ações especiais. Para realizar tais ações, o jogador deverá, em sua vez, anunciar a ação, aplicar o seu efeito, descartar a carta e passar a vez ao próximo jogador.

As cartas bônus são:

1. **Mamíferos**: Três pontos se tiver X ou mais mamíferos (x = 6 em partidas com 2 jogadores, x = 5 em partidas com três, x = 4 em partidas com quatro)
1. **Insetos**: Dois pontos se tiver X ou mais insetos (x = 3 em partidas com 2 jogadores, x = 2 em partidas com três, x = 1 em partidas com quatro)
1. **Réptil**: Dois pontos se tiver X ou mais réptil (x = 3 em partidas com 2 jogadores, x = 2 em partidas com três, x = 1 em partidas com quatro)
1. **Peixes**:Dois pontos se tiver X ou mais peixes (x = 2 em partidas com 2 jogadores, x = 1 em partidas com três, x = 1 em partidas com quatro)
1. **Aves**:Dois pontos se tiver X ou mais aves (x = 2 em partidas com 2 jogadores, x = 1 em partidas com três, x = 1 em partidas com quatro)
1. **Anfíbio**:Dois pontos se tiver X ou mais Anfíbio (x = 2 em partidas com 2 jogadores, x = 1 em partidas com três, x = 1 em partidas com quatro)

1. **Dispensores**: Três pontos se tiver X ou mais dispensores de sementes (x = 6 em partidas com 2 jogadores, x = 5 em partidas com três, x = 4 em partidas com quatro)
1. **Predadores**: Três pontos se tiver no máximo X predadores (x = 7 em partidas com 2 jogadores, x = 6 em partidas com três, x = 5 em partidas com quatro)
1. **Presas/outros**: Dois pontos se tiver X ou mais presas/outros (x = 3 em partidas com 2 jogadores, x = 2 em partidas com três, x = 1 em partidas com quatro)
1. **Polinizador**: Dois pontos se tiver X ou mais polinizadores (x = 2 em partidas com 2 jogadores, x = 1 em partidas com três, x = 1 em partidas com quatro)

1. Reponha todas as cartas da mesa, escolha até uma para jogar, caso tenha sementes suficientes, e passe a vez
1. Descarte qualquer quantidade de cartas e compre novas cartas até o limite da mão
1. Pronto nada! Ignora quando alguém diz "pronto" fazendo a partida continuar
1. Permite olhar três cartas bônus e escolher uma delas

### Fim de jogo e contagem de pontos

Se ninguém disser pronto, quando o baralho de compras se esgotarem, o jogo termina.

Anote a pontuação de cada jogador em cada uma das seguinte categorias:

1. Um ponto para cada semente posicionada em uma base
1. Um ponto por carta para a maior sequência de números seguidos de um mesmo naipe
1. Pontos igual a maior carta do naipe de abelha
1. Pontos igual a maior carta do naipe de beija-flor vezes dois
1. Pontos igual a maior carta do naipe de capivara vezes três
1. Pontos igual a maior carta do naipe de onça vezes quatro
1. Pontos que cumprem as condições de cartas bônus

Some tudo, o jogador com mais pontos vence. Caso empate, ambos compartilham a vitória.

https://coolors.co/palette/cfdbd5-e8eddf-f5cb5c-242423-333533
