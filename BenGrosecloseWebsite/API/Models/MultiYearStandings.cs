namespace BenGrosecloseWebsite.API.Models
{
    public class MultiYearStandings
    {
        public List<TeamStanding> Standings { get; set; }
        public IEnumerable<int> TeamIDs { get; set; }
    }
}