using BenGrosecloseWebsite.API.Models;
using Refit;

namespace BenGrosecloseWebsite.API
{
    public interface ISportsDataAPI
    {
        [Get("/nba/scores/json/Standings/{year}")]
        Task<IEnumerable<TeamStanding>> GetStandings(int year);
    }
}