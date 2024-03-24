namespace Fighters.Races
{
    internal class TheRoman : IRace
    {
        public string Name { get; } = "Римлянин";
        public int Damage { get; } = 15;

        public int Health { get; } = 180;

        public int Armor { get; } = 20;
        public int Speed { get; } = 25;
    }
}