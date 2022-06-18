using Microsoft.AspNetCore.SignalR;

namespace BenGroseclose.API.Hubs
{
    public class ChessHub : Hub
    {

        public async Task CreateGame(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("Notification", $"{Context.ConnectionId} has joined the game: {gameId}");
        }

        public async Task LeaveGame(string gameId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("Notification", $"{Context.ConnectionId} has left the game: {gameId}");
        }

        public async Task StartGame(string gameId)
        {
            Console.WriteLine($"{gameId} started");
            await Clients.Group(gameId).SendAsync("StartGame");
        }

        public async Task RestartGame(string gameId)
        {
            Console.WriteLine($"{gameId} restarted");
            await Clients.Group(gameId).SendAsync("RestartGame");
        }

        public async Task ChessMove(int selectedPieceId, string chessNotation, string gameId)
        {
            await Clients.Group(gameId).SendAsync("ChessMove", selectedPieceId, chessNotation);
        }
    }
}
