namespace Fighters.Races
{
    internal class TheCelt : IRace
    {
        public string Name { get; } = "Кельт";
        public int Damage { get; } = 9;

        public int Health { get; } = 220;

        public int Armor { get; } = 50;
        public int Speed { get; } = 20;
    }
}