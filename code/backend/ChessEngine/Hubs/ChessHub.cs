using ChessEngine.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChessEngine.Hubs
{
    public class ChessHub : Hub
    {
        private readonly IChessService chessService;

        public ChessHub(IChessService chessService)
        {
            this.chessService = chessService;
        }
    }
}