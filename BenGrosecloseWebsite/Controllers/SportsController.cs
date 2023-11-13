using BenGrosecloseWebsite.API;
using BenGrosecloseWebsite.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace BenGrosecloseWebsite.Controllers
{


    [Route("api/[controller]")]
    public class SportsController : Controller
    {
        private const int CURRENT_YEAR = 2023;
        private readonly ISportsDataAPI sportsDataAPI;

        public SportsController(ISportsDataAPI sportsDataAPI)
        {
            this.sportsDataAPI = sportsDataAPI;
        }

        [HttpGet("ringer/{year}")]
        public async Task<IActionResult> Get(int year)
        {
            var standings = await this.sportsDataAPI.GetStandings(year);

            return Ok(standings);
        }

        [HttpGet("ringer/multi-year")]
        public async Task<IActionResult> Get()
        {
            List<TeamStanding> standings = new List<TeamStanding>();

            for (int year = CURRENT_YEAR; year > (CURRENT_YEAR - 2); year--)
            {
                standings.AddRange(await this.sportsDataAPI.GetStandings(year));
            }

            return Ok(new MultiYearStandings
            {
                Standings = standings,
                TeamIDs = standings.Select(x => x.TeamID).Distinct()
            });
        }
    }
}