namespace Fighters.Models.Races
{
    public class TheCelt : IRace
    {
        public string Name => "Кельт";
        public int Damage => 9;
        public int Health => 220;
        public int Armor => 50;
        public int Speed => 20;
    }
}