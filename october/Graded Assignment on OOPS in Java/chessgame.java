import java.util.Scanner;

public class ChessGame {
    private Chessboard board;
    private Player[] players;
    private int currentPlayerIndex;

    public ChessGame() {
        board = new Chessboard();
        players = new Player[2];
        players[0] = new Player("Player 1", PieceColor.WHITE);
        players[1] = new Player("Player 2", PieceColor.BLACK);
        currentPlayerIndex = 0;
    }

    public void play() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            board.display();
            Player currentPlayer = players[currentPlayerIndex];
            System.out.println(currentPlayer.getName() + ", enter your move (e.g., 'e2 e4' or 'q' to quit): ");
            String move = scanner.nextLine();

            if (move.equals("q")) {
                System.out.println("Game ended by player " + currentPlayer.getName());
                break;
            }

            if (isValidMove(move)) {
                String[] moveParts = move.split(" ");
                int fromX = moveParts[0].charAt(0) - 'a';
                int fromY = 8 - (moveParts[0].charAt(1) - '0');
                int toX = moveParts[1].charAt(0) - 'a';
                int toY = 8 - (moveParts[1].charAt(1) - '0');

                if (board.movePiece(fromX, fromY, toX, toY)) {
                    // Check for checkmate or stalemate here
                    if (board.isCheckmate(PieceColor.WHITE)) {
                        System.out.println("Player 2 wins by checkmate!");
                        break;
                    }
                    if (board.isCheckmate(PieceColor.BLACK)) {
                        System.out.println("Player 1 wins by checkmate!");
                        break;
                    }
                    if (board.isStalemate(currentPlayer.getColor())) {
                        System.out.println("Stalemate! The game is a draw.");
                        break;
                    }
                }

                currentPlayerIndex = 1 - currentPlayerIndex; // Switch to the next player
            } else {
                System.out.println("Invalid move. Try again.");
            }
        }
    }

    private boolean isValidMove(String move) {
        // Implement move validation logic here
        return true; // Placeholder
    }

    public static void main(String[] args) {
        ChessGame game = new ChessGame();
        game.play();
    }
}
