namespace Fighter.Models.Races
{
    public class TheGerman : IRace
    {
        public string Name => "Германец";
        public int Damage => 70;
        public int Health => 90;
        public int Armor => 9;
        public int Speed => 15;
    }
}