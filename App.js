import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const winner = calculateWinner(board);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "🎀" : "✖️";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (calculateWinner(newBoard)) {
      const winningPlayer = newBoard[index] === "🎀" ? playerX : playerO;
      if (newBoard[index] === "🎀") {
        setScoreX((prev) => prev + 1);
      } else {
        setScoreO((prev) => prev + 1);
      }
      Alert.alert("Congratulations!", `${winningPlayer} wins!`);
    } else if (!newBoard.includes(null)) {
      Alert.alert("Oops!", "Try Again!");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      <View style={styles.scoreBoard}>
        <Text style={styles.score}>
          {playerX}: {scoreX}
        </Text>
        <Text style={styles.score}>
          {playerO}: {scoreO}
        </Text>
      </View>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.text}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.nextPlayer}>
        {winner
          ? `Winner: ${winner === "🎀" ? playerX : playerO}`
          : `Next Player: ${isXNext ? playerX : playerO}`}
      </Text>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>

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
    </View>
  );
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textShadowColor: "cyan",
    textShadowRadius: 10,
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    color: "#fff",
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: 98,
    height: 98,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    margin: 1,
    backgroundColor: "#222",
    shadowColor: "#fff",
    shadowRadius: 10,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "cyan",
    textShadowRadius: 10,
  },
  nextPlayer: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 10,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
});
