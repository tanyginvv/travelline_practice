namespace Fighters.Models.Races
{
    public class TheRoman : IRace
    {
        public string Name => "Римлянин";
        public int Damage => 15;
        public int Health => 180;
        public int Armor => 20;
        public int Speed => 25;
    }
}