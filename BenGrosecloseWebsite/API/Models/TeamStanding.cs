namespace BenGrosecloseWebsite.API.Models
{
    public class TeamStanding
    {
        public int Season { get; set; }
        public int SeasonType { get; set; }
        public int TeamID { get; set; }
        public string Key { get; set; }
        public string City { get; set; }
        public string Name { get; set; }
        public string Conference { get; set; }
        public string Division { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        /// <summary>
        /// Winning percentage
        /// </summary>
        public double Percentage { get; set; }
        public int ConferenceWins { get; set; }
        public int ConferenceLosses { get; set; }
        public int DivisionWins { get; set; }
        public int DivisionLosses { get; set; }
        public int HomeWins { get; set; }
        public int HomeLosses { get; set; }
        public int AwayWins { get; set; }
        public int AwayLosses { get; set; }
        public int LastTenWins { get; set; }
        public int LastTenLosses { get; set; }
        public double PointsPerGameFor { get; set; }
        public double PointsPerGameAgainst { get; set; }
        public int Streak { get; set; }
        public double GamesBack { get; set; }
        public string StreakDescription { get; set; }
        public int GlobalTeamID { get; set; }
        public int? ConferenceRank { get; set; }
        public int? DivisionRank { get; set; }
    }
}
