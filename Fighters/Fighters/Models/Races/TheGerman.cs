namespace Fighters.Races
{
    internal class TheGerman : IRace
    {
        public string Name { get; } = "Германец";
        public int Damage { get; } = 70;

        public int Health { get; } = 90;

        public int Armor { get; } = 9;
        public int Speed { get; } = 15;
    }
}