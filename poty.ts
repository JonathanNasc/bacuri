const bases_limit = 4;
const hand_limit = 4;

enum Naipe {
  abelha = 'abelha',
  beija_flor = 'beija_flor',
  capivara = 'capivara',
  onça = 'onça',
}

type Card = [number, Naipe];

type Decks = {
  buyStack: Array<Card>,
  discardStack: Array<Card>,
}

enum Strategy {
  basic_precoce = 'basic_precoce', // segue roteiro de melhor jogada possível, mas pede chega o mais rápido que as regras permitirem
  basic_moderado = 'basic_moderado', // segue roteiro de melhor jogada possível, pede chega mais ou menos no meio do jogo
  basic_demorado = 'basic_demorado', // segue roteiro de melhor jogada possível, nunca pede chega
  focused_em_onça_precoce = 'focused_em_onça_precoce', // tenta caçar as onças e jogá-las, pede chega o mais rápido que pode
  focused_em_onça_moderado = 'focused_em_onça_moderado', // tenta caçar as onças, pede chega no meio do jogo
  focused_em_onça_demorado = 'focused_em_onça_demorado', // tenta caçar as onças e nunca pede chega
  energizado_precoce = 'energizado_precoce', //completa todas as energias, então segue o básico precoce
  energizado_moderado = 'energizado_moderado', //completa todas, então segue o básico moderado
  energizado_demorado = 'energizado_demorado', //completa todas, então segue o básico demorado
}

type BaseAmount = 0|1|2|3|4;

type Player = {
  strategy: Strategy,
  wantToStop: boolean,
  hand: Array<Card>,
  points: any,
  bases: {
    [Naipe.abelha]: BaseAmount,
    [Naipe.beija_flor]: BaseAmount,
    [Naipe.capivara]:BaseAmount,
    [Naipe.onça]: BaseAmount,
  },
  stacks: {
    [Naipe.abelha]: Array<Card>,
    [Naipe.beija_flor]: Array<Card>,
    [Naipe.capivara]: Array<Card>,
    [Naipe.onça]: Array<Card>,
  }
}

const baralho: Array<Card> = [
  [0, Naipe.abelha], //coringa
  [1, Naipe.abelha],
  [2, Naipe.abelha],
  [3, Naipe.abelha],
  [4, Naipe.abelha],
  [5, Naipe.abelha],
  [6, Naipe.abelha],
  [7, Naipe.abelha],
  [8, Naipe.abelha],
  [9, Naipe.abelha],
  [10, Naipe.abelha],
  [0, Naipe.beija_flor], //coringa
  [1, Naipe.beija_flor],
  [2, Naipe.beija_flor],
  [3, Naipe.beija_flor],
  [4, Naipe.beija_flor],
  [5, Naipe.beija_flor],
  [6, Naipe.beija_flor],
  [7, Naipe.beija_flor],
  [8, Naipe.beija_flor],
  [9, Naipe.beija_flor],
  [0, Naipe.capivara], //coringa
  [1, Naipe.capivara],
  [2, Naipe.capivara],
  [3, Naipe.capivara],
  [4, Naipe.capivara],
  [5, Naipe.capivara],
  [6, Naipe.capivara],
  [7, Naipe.capivara],
  [8, Naipe.capivara],
  [0, Naipe.onça], //coringa
  [1, Naipe.onça],
  [2, Naipe.onça],
  [3, Naipe.onça],
  [4, Naipe.onça],
  [5, Naipe.onça],
  [6, Naipe.onça],
];

const canSayChega = (player1: Player, player2: Player) => {
  //os jogadores precisam ter pelo menos uma carta em cada pilha
  for (let player of [player1, player2]) {
    for (let naipe of Object.values(Naipe)) {
      if (player.stacks[naipe].length == 0) {
        return false;
      }
    }
  }

  return true;
}

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const getNewShuffledDeck = () => {
  const deck = structuredClone(baralho);

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [deck[i], deck[j]] = [deck[j], deck[i]];  // swap elements
  }
  return deck;
}

const initPlayer = (str: Strategy): Player => ({
  strategy: str,
  wantToStop: false,
  points: {
    total: 0,
    detailed: {}
  },
  hand: [],
  bases: {
    [Naipe.abelha]: 0,
    [Naipe.beija_flor]: 0,
    [Naipe.capivara]: 0,
    [Naipe.onça]: 0,
  },
  stacks: {
    [Naipe.abelha]: [],
    [Naipe.beija_flor]: [],
    [Naipe.capivara]: [],
    [Naipe.onça]: [],
  }
});

const canPlayerBuyOneCard = (player: Player) => player.hand.length < hand_limit;
const playerBuyOneCard = (player: Player, deck: Array<Card>) => player.hand.push(deck.splice(0,1)[0]);

const sortByHigherCard = (a: Card, b: Card) => b[0] - a[0];
const sortByHigherNaipe = (a: Card, b: Card) => getIndexOfNaipe(b[1]) - getIndexOfNaipe(a[1]);

const sortHandByStrongerCardToWeaker = (player: Player) => {
  player.hand.sort(sortByHigherCard);
  player.hand.sort(sortByHigherNaipe);
};

const canCardBePlaced = (player: Player, [cardValue, cardNaipe]: Card) => {
  const naipeBaseCount = player.bases[cardNaipe];
  const naipeStackCount = player.stacks[cardNaipe].length;

  return naipeBaseCount + naipeStackCount >= cardValue;
}

const getIndexOfNaipe = (naipe: Naipe): number => (
  Object.values(Naipe).findIndex((v) => v === naipe)
)

const getNaipeByIndex = (naipeIndex: number): Naipe => (
  Naipe[Object.values(Naipe)[naipeIndex]]
)

const getTotalCardsPlaced = (player: Player) => {
  let sum = 0;
  for (let naipe of Object.values(Naipe)) {
    sum += player.stacks[naipe].length;
  }
  return sum;
}

const sumValuesFromNaipeKeys = (getValueByNaipe: (n: Naipe) => number) => {
  let sum = 0;
  for (let naipe of Object.values(Naipe)) {
    sum += getValueByNaipe(naipe);
  }
  return sum;
}

const makeBasicStrategyBase = (player: Player, decks: Decks) => {
  sortHandByStrongerCardToWeaker(player);

  // joga maior carta possível que tenha seu requisito cumprido
  for (let i = player.hand.length - 1; i >= 0; i--) {
    if (canCardBePlaced(player, player.hand[i])) {
      player.stacks[player.hand[i][1]].push(player.hand.splice(i,1)[0]);
      return;
    }
  }

  // joga energia na base mais a esquerda com menos energia sem ultrapassar limite
  for (let naipe of Object.values(Naipe)) {
    const naipeIndex = getIndexOfNaipe(naipe);
    if (naipeIndex == 0 && player.bases[naipe] < bases_limit) {
      player.bases[naipe]++;
      return;
    }

    if (naipeIndex < player.bases[getNaipeByIndex(naipeIndex-1)] && player.bases[naipe] < bases_limit) {
      player.bases[naipe]++;
      return;
    }
  }

  if (!canPlayerBuyOneCard(player)) {
    // descarta a carta mais forte
    decks.discardStack.push(player.hand.splice(0,1)[0]);
  }

  // se o topo da pilha de descartes já poderia ser jogada, compra essa para o proximo turno
  if(decks.discardStack.length > 0 && canCardBePlaced(player, decks.discardStack[0])) {
    playerBuyOneCard(player, decks.discardStack);
    return;
  }

  playerBuyOneCard(player, decks.buyStack);
}

const makeActionFollowingStrategy = (player: Player, adversary: Player, decks: Decks) => {
  switch (player.strategy) {
    case Strategy.basic_precoce:
      if (canSayChega(player, adversary)) {
        player.wantToStop = true;
        break;
      }

      makeBasicStrategyBase(player, decks);
      break;
    case Strategy.basic_moderado:
      const cardsPlacedToSayChegaForModeratePlayers = getRandomArbitrary(5, 10);
      const totalCardPlaces = sumValuesFromNaipeKeys((naipe: Naipe) => player.stacks[naipe].length);
      const willSayChega = totalCardPlaces >= cardsPlacedToSayChegaForModeratePlayers;
      if (canSayChega(player, adversary) && willSayChega) {
        player.wantToStop = true;
        break;
      }

      makeBasicStrategyBase(player, decks);
      break;
    default:
      makeBasicStrategyBase(player, decks);
  }
}

const getHigherCardOrZeroByNaipe = (player: Player, naipe: Naipe): number =>
  (Number(player.stacks[naipe]?.at(0)?.at(0)) || 0)

const updatePoints = (player: Player) => {
  let coringasSum = 0;
  for (let naipe of Object.values(Naipe)) {
    player.stacks[naipe].sort(sortByHigherCard); //ordena as pilhas
    coringasSum += player.stacks[naipe].filter(([cardNumber]) => cardNumber === 0).length;
  }

  const bases = sumValuesFromNaipeKeys((naipe: Naipe) => player.bases[naipe]);
  const abelha = getHigherCardOrZeroByNaipe(player, Naipe.abelha);
  const beijaFlor = getHigherCardOrZeroByNaipe(player, Naipe.beija_flor) * 2;
  const capivara = getHigherCardOrZeroByNaipe(player, Naipe.capivara) * 3;
  const onça = getHigherCardOrZeroByNaipe(player, Naipe.onça) * 4;
  const total = bases + abelha + beijaFlor + capivara + onça + coringasSum;

  player.points = { bases, abelha, beijaFlor, capivara, onça, total };
}

const match = (player1Strategy: Strategy, player2Strategy: Strategy, detailed: boolean) => {
  const decks: Decks = { buyStack: getNewShuffledDeck(), discardStack: [] };
  const player1 = initPlayer(player1Strategy);
  const player2 = initPlayer(player2Strategy);
  player1.hand = decks.buyStack.splice(0, hand_limit); // distribui cartas pro player 1
  player2.hand = decks.buyStack.splice(0, hand_limit); // distribui cartas pro player 2

  let keepMatch = true;
  let turns = 0;
  while (keepMatch) {
    makeActionFollowingStrategy(player1, player2, decks);
    makeActionFollowingStrategy(player2, player1, decks);
    if(player2.wantToStop) {
      // player1 makes his last action
      makeActionFollowingStrategy(player1, player2, decks);
    }

    //encerra partida se acabar o baralho de compras ou alguém pedir chega
    keepMatch = decks.buyStack.length > 0 && (!player1.wantToStop && !player2.wantToStop);
    turns++;
  }

  updatePoints(player1);
  updatePoints(player2);

  const result = {
    turns,
    p1: {
      wantedToStop: player1.wantToStop,
      strategy: player1.strategy,
      points: player1.points,
    },
    p2: {
      wantedToStop: player2.wantToStop,
      strategy: player2.strategy,
      points: player2.points,
    },
  }

  if (detailed) {
    console.log(JSON.stringify(result, null, 2));
  }

  return result;
}

const simulateMatches = (player1Strategy: Strategy, player2Strategy: Strategy, rounds: number, detailed = false) => {
  let statistics = {p1: 0, p2: 0};
  for(let index = rounds; index > 0; index--) {
    const result = match(player1Strategy, player2Strategy, detailed);
    statistics.p1 += result.p1.points.total > result.p2.points.total ? 1 : 0;
    statistics.p2 += result.p2.points.total > result.p1.points.total ? 1 : 0;
  }

  return `
strategy, won, percent
${player1Strategy}, ${statistics.p1}, ${(statistics.p1 * 100)/(statistics.p1+statistics.p2)}%
${player2Strategy}, ${statistics.p2}, ${(statistics.p2 * 100)/(statistics.p1+statistics.p2)}%
  `;
}

const runFullSimulation = (rounds: number, detailed = false) => {
  const stats = simulateMatches(Strategy.basic_moderado, Strategy.basic_demorado, rounds, detailed);
  console.log(stats);
}

runFullSimulation(1000);
