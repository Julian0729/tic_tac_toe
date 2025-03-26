import React, { useState, useEffect, createContext, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

// Context for Game State
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      const winningPlayer = winner === "🎀" ? playerX : playerO;
      if (winner === "🎀") setScoreX((prev) => prev + 1);
      else setScoreO((prev) => prev + 1);
      showWinnerAlert(winningPlayer);
    } else if (!board.includes(null)) {
      Alert.alert("Draw!", "Try again!");
    }
  }, [board]);

  const handlePress = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "🎀" : "🩶";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => setBoard(Array(9).fill(null));

  const showWinnerAlert = (winner) => {
    Alert.alert("🎉 Congratulations! 🎉", `\n${winner} wins!`, [
      { text: "OK" },
    ]);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        handlePress,
        resetGame,
        playerX,
        playerO,
        scoreX,
        scoreO,
        setPlayerX,
        setPlayerO,
        isXNext,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const Board = () => {
  const { board } = useContext(GameContext);
  return (
    <View style={styles.board}>
      {board.map((cell, index) => (
        <Square key={index} index={index} value={cell} />
      ))}
    </View>
  );
};

const Square = ({ index, value }) => {
  const { handlePress } = useContext(GameContext);
  return (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const ScoreBoard = () => {
  const { playerX, playerO, scoreX, scoreO } = useContext(GameContext);
  return (
    <View style={styles.scoreBoard}>
      <Text style={[styles.score, styles.highlight]}>
        {playerX}: {scoreX}
      </Text>
      <Text style={[styles.score, styles.highlight]}>
        {playerO}: {scoreO}
      </Text>
    </View>
  );
};

const PlayerInput = () => {
  const { playerX, playerO, setPlayerX, setPlayerO } = useContext(GameContext);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Player 1 Name"
        onChangeText={setPlayerX}
        value={playerX}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Player 2 Name"
        onChangeText={setPlayerO}
        value={playerO}
      />
    </View>
  );
};

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Tic-Tac-Toe</Text>
        <ScoreBoard />
        <Board />
        <NextPlayerDisplay />
        <ResetButton />
        <PlayerInput />
      </View>
    </GameProvider>
  );
}

const NextPlayerDisplay = () => {
  const { isXNext, playerX, playerO } = useContext(GameContext);
  return (
    <Text style={styles.nextPlayer}>{`Next Player: ${
      isXNext ? playerX : playerO
    }`}</Text>
  );
};

const ResetButton = () => {
  const { resetGame } = useContext(GameContext);
  return (
    <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
      <Text style={styles.resetText}>Reset Game</Text>
    </TouchableOpacity>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9381ff",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginBottom: 20,
  },
  score: { fontSize: 20, color: "" },
  highlight: { backgroundColor: "#deaaff", padding: 5, borderRadius: 5 },
  board: { width: 300, height: 300, flexDirection: "row", flexWrap: "wrap" },
  square: {
    width: 98,
    height: 98,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    margin: 1,
    backgroundColor: "#abc4ff",
  },
  text: { fontSize: 40, fontWeight: "bold", color: "black" },
  nextPlayer: { fontSize: 20, color: "black", marginVertical: 10 },
  resetButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f1c0e8",
    borderRadius: 5,
  },
  resetText: { color: "black", fontSize: 18 },
  inputContainer: { marginTop: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
});
