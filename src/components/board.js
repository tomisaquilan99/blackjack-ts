import { Button } from "@mui/base";
import { Box, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const Board = () => {
  const generateRandomCard = () => {
    const randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard > 10) {
      return 10;
    } else if (randomCard === 1) {
      return 11;
    } else {
      return randomCard;
    }
  };

  const [playerCards, setPlayerCards] = useState([
    generateRandomCard(),
    generateRandomCard(),
  ]);
  const [croupierCards, setCroupierCards] = useState([generateRandomCard()]);
  const [cardsSum, setCardsSum] = useState(
    playerCards.reduce((a, b) => a + b, 0)
  );
  const [croupierSum, setCroupierSum] = useState(
    croupierCards.reduce((a, b) => a + b, 0)
  );
  const [currentBet, setCurrentBet] = useState(10);
  const [chips, setChips] = useState(1000);
  const [result, setResult] = useState();
  const [isCroupierTakingCards, setIsCroupierTakingCards] = useState(false);

  const handleCroupierTurn = useCallback(() => {
    console.log("el croupier roba una carta", isCroupierTakingCards);
    if (croupierSum < 17) {
      // Si la puntuación del croupier es menor que 17, toma una nueva carta
      console.log("llamada recursiva", croupierCards);
      const randomCard = generateRandomCard();

      // Utiliza la función de actualización para agregar la nueva carta al estado anterior
      setCroupierCards((prevCroupierCards) => [
        ...prevCroupierCards,
        randomCard,
      ]);

      console.log(croupierCards);

      // Calcula la suma después de actualizar croupierCards
      const sumCroupier = [...croupierCards, randomCard].reduce(
        (a, b) => a + b,
        0
      );

      // Actualiza croupierSum
      setCroupierSum(sumCroupier);
      console.log("suma local", sumCroupier);
      console.log("suma state", croupierSum);

      // Llama a la función de forma recursiva para seguir tomando cartas si es necesario
      if (isCroupierTakingCards) {
        if (sumCroupier < 17) {
          console.log("debo llamar nuevamente a la funcion");
          setTimeout(handleCroupierTurn, 1000); // Agrega un pequeño retraso para dar efecto de toma de cartas
        } else {
          setIsCroupierTakingCards(false); // Detiene la toma de cartas del croupier
        }
      } else {
        setIsCroupierTakingCards(false); // Detiene la toma de cartas del croupier
      }
      console.log(
        "isCroupierTakingCards en el final de la funcion",
        isCroupierTakingCards
      );
    }
  }, [
    croupierSum,
    croupierCards,
    setCroupierCards,
    setIsCroupierTakingCards,
    isCroupierTakingCards,
  ]);

  const handleStand = () => {
    // Ejecutar la lógica del croupier después de que el jugador presione "Stand"
    setIsCroupierTakingCards(true);
  };

  useEffect(() => {
    // Ejecuta la lógica del croupier después de que el jugador presiona "Stand"
    if (isCroupierTakingCards) {
      handleCroupierTurn();
    }
  }, [isCroupierTakingCards, handleCroupierTurn]);

  const setRandomCards = () => {
    const randomCard1 = generateRandomCard();
    const randomCard2 = generateRandomCard();
    const randomCard3 = generateRandomCard();

    setPlayerCards([randomCard1, randomCard2]);
    setCroupierCards([randomCard3]);
    setChips(chips - currentBet);
  };

  const addNewCard = () => {
    if (cardsSum < 21 && cardsSum !== 21) {
      const randomCard = generateRandomCard();
      setPlayerCards([...playerCards, randomCard]);
    }
  };

  useEffect(() => {
    const sumPlayer = playerCards.reduce((a, b) => a + b, 0);
    const sumCroupier = croupierCards.reduce((a, b) => a + b, 0);
    setCardsSum(sumPlayer);
    setCroupierSum(sumCroupier);
  }, [playerCards, croupierCards]);

  console.log("cartas finales", croupierCards);
  console.log(isCroupierTakingCards);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"white"}
    >
      <Typography color={"yellow"}>Blackjack</Typography>
      <Typography color={"red"}>Next Round</Typography>

      <Box display={"flex"} gap={10} margin={10}>
        <Box>
          <Typography>Player Cards</Typography>
          <Box display={"flex"} gap={10}>
            {playerCards.map((card, index) => (
              <Typography key={index}>{card}</Typography>
            ))}
          </Box>
          <Typography>Your count is: {cardsSum}</Typography>
          <Typography>
            {cardsSum > 21
              ? "Te pasaste maleta"
              : cardsSum === 21
              ? "BLACKJACK PERRO"
              : "¿Quieres otra carta?"}
          </Typography>
        </Box>

        <Box>
          <Typography>Croupier Cards</Typography>
          {croupierCards.map((card, index) => (
            <Typography key={index}>{card}</Typography>
          ))}
          <Typography>Croupier count is: {croupierSum}</Typography>
        </Box>
      </Box>

      <Box>
        <Button onClick={() => setCurrentBet(10)}>10</Button>
        <Button onClick={() => setCurrentBet(25)}>25</Button>
        <Button onClick={() => setCurrentBet(50)}>50</Button>
        <Button onClick={() => setCurrentBet(100)}>100</Button>
        <Typography>Current Bet: {currentBet}</Typography>
      </Box>
      <Button onClick={() => setRandomCards()}>START GAME</Button>
      <Box>
        <Button onClick={() => addNewCard()}>New Card</Button>
        <Button onClick={() => handleStand()}>Stand</Button>
      </Box>
      <Typography>Tomi</Typography>
      <Typography>{chips} Chips</Typography>
    </Box>
  );
};

export default Board;
