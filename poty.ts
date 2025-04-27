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
  basic = 'basic',
  focado_em_onça = 'focado_em_onça',
  focado_em_abelha = 'focado_em_abelha',
  focado_em_beija_flor = 'focado_em_beija_flor',
  focado_em_capivara = 'focado_em_capivara',
  focado_em_energia = 'focado_em_energia',
  focado_em_cartas_baixas = 'focado_em_cartas_baixas',
  precoce = 'precoce',
  moderado = 'moderado',
  demorado = 'demorado',
  basic_precoce =  `${Strategy.basic}_${Strategy.precoce}`, // segue roteiro de melhor jogada possível, mas pede chega o mais rápido que as regras permitirem
  basic_moderado = `${Strategy.basic}_${Strategy.moderado}`, // segue roteiro de melhor jogada possível, pede chega mais ou menos no meio do jogo
  basic_demorado = `${Strategy.basic}_${Strategy.demorado}`, // segue roteiro de melhor jogada possível, pede chega mais ou menos no meio do jogo
  focado_em_abelha_precoce =  `${Strategy.focado_em_abelha}_${Strategy.precoce}`,
  focado_em_abelha_moderado = `${Strategy.focado_em_abelha}_${Strategy.moderado}`,
  focado_em_abelha_demorado = `${Strategy.focado_em_abelha}_${Strategy.demorado}`,
  focado_em_beija_flor_precoce =  `${Strategy.focado_em_abelha}_${Strategy.precoce}`,
  focado_em_beija_flor_moderado = `${Strategy.focado_em_abelha}_${Strategy.moderado}`,
  focado_em_beija_flor_demorado = `${Strategy.focado_em_abelha}_${Strategy.demorado}`,
  focado_em_capivara_precoce =  `${Strategy.focado_em_capivara}_${Strategy.precoce}`,
  focado_em_capivara_moderado = `${Strategy.focado_em_capivara}_${Strategy.moderado}`,
  focado_em_capivara_demorado = `${Strategy.focado_em_capivara}_${Strategy.demorado}`,
  focado_em_onça_precoce =  `${Strategy.focado_em_onça}_${Strategy.precoce}`,
  focado_em_onça_moderado = `${Strategy.focado_em_onça}_${Strategy.moderado}`,
  focado_em_onça_demorado = `${Strategy.focado_em_onça}_${Strategy.demorado}`,
  focado_em_energia_precoce  = `${Strategy.focado_em_energia}_${Strategy.precoce}`,
  focado_em_energia_moderado = `${Strategy.focado_em_energia}_${Strategy.moderado}`,
  focado_em_energia_demorado = `${Strategy.focado_em_energia}_${Strategy.demorado}`,
  focado_em_cartas_baixas_precoce  = `${Strategy.focado_em_cartas_baixas}_${Strategy.precoce}`,
  focado_em_cartas_baixas_moderado = `${Strategy.focado_em_cartas_baixas}_${Strategy.moderado}`,
  focado_em_cartas_baixas_demorado = `${Strategy.focado_em_cartas_baixas}_${Strategy.demorado}`,
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

const sumValuesFromNaipeKeys = (getValueByNaipe: (n: Naipe) => number) => {
  let sum = 0;
  for (let naipe of Object.values(Naipe)) {
    sum += getValueByNaipe(naipe);
  }
  return sum;
}

const makeFocadoEmAbelhaStrategyBase = (player: Player, decks: Decks) => {
  //verifica se alguma das cartas abelha já consegue jogar
  //coloca energia na base abelha se não tiver no limite
  //descarta uma carta que não é abelha e compra outra da pilha de descartes se for abelha, ou da pilha de compras
  //verifica se uma das cartas de abelha da pilha de descartes pode ser substituida e faz sua jogada unica
  //descarta uma carta abelha alta demais e compra outra da pilha de descartes se for abelha, ou da pilha de compras
}

const makeFocadoEmBeijaFlorStrategyBase = (player: Player, decks: Decks) => {
  //verifica se alguma das cartas beija flor já consegue jogar
  //coloca energia na base beija flor, ou anterior se não tiver no limite
  //descarta uma carta que não é beija flor e compra outra da pilha de descartes se for beija flor, ou da pilha de compras
  //verifica se uma das cartas de beija flor da pilha de descartes pode ser substituida e faz sua jogada unica
  //descarta uma carta beija flor alta demais e compra outra da pilha de descartes se for beijar, ou da pilha de compras
}

const makeFocadoEmCapivaraStrategyBase = (player: Player, decks: Decks) => {
  //verifica se alguma das cartas capivara já consegue jogar
  //coloca energia na base capivara se não tiver no limite, ou nas anteriores se necessario
  //descarta uma carta que não é abelha e compra outra da pilha de descartes se for abelha, ou da pilha de compras
  //verifica se uma das cartas de abelha da pilha de descartes pode ser substituida e faz sua jogada unica
  //descarta uma carta abelha alta demais e compra outra da pilha de descartes se for abelha, ou da pilha de compras
}

const makeFocadoEmOnçaStrategyBase = (player: Player, decks: Decks) => {
  //verifica se alguma das cartas onça já consegue jogar
  //coloca energia na base onça se não tiver no limite, ou nas anteriores se necessario
  //descarta uma carta que não é onça e compra outra da pilha de descartes se for onça, ou da pilha de compras
  //verifica se uma das cartas de onça da pilha de descartes pode ser substituida e faz sua jogada unica
  //descarta uma carta onça alta demais e compra outra da pilha de descartes se for onça, ou da pilha de compras
}

const makeBasicStrategyBase = (player: Player, decks: Decks) => {
  player.hand.sort(sortByHigherCard);
  player.hand.sort(sortByHigherNaipe);

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

const sayChegaAccordinglyToStrategy = (player: Player, adversary: Player) => {
  if (player.strategy.includes(Strategy.precoce) && canSayChega(player, adversary)) {
    player.wantToStop = true;
    return;
  }

  if (player.strategy.includes(Strategy.moderado) && canSayChega(player, adversary)) {
    const cardsPlacedToSayChegaForModeratePlayers = getRandomArbitrary(5, 10);
    const totalCardPlaces = sumValuesFromNaipeKeys((naipe: Naipe) => player.stacks[naipe].length);
    const willSayChega = totalCardPlaces >= cardsPlacedToSayChegaForModeratePlayers;
    if (canSayChega(player, adversary) && willSayChega) {
      player.wantToStop = true;
      return;
    }
  }
}

const makeActionFollowingStrategy = (player: Player, adversary: Player, decks: Decks) => {
  sayChegaAccordinglyToStrategy(player, adversary);
  if (player.wantToStop) {
    return;
  }

  if (player.strategy.includes(Strategy.basic)) {
    makeBasicStrategyBase(player, decks);
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_abelha)) {
    makeFocadoEmAbelhaStrategyBase(player, decks);
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_beija_flor)) {
    makeFocadoEmBeijaFlorStrategyBase(player, decks);
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_capivara)) {
    makeFocadoEmCapivaraStrategyBase(player, decks);
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_onça)) {
    makeFocadoEmOnçaStrategyBase(player, decks);
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_energia)) {
    // todo
    return;
  }

  if (player.strategy.includes(Strategy.focado_em_cartas_baixas)) {
    // todo
    return;
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
