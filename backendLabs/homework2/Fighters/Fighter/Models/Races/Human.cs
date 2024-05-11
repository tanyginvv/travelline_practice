namespace Fighter.Models.Races
{
    public class Human : IRace
    {
        public string Name => "Человек";
        public int Damage => 11;
        public int Health => 100;
        public int Armor => 10;
        public int Speed => 30;
    }
}