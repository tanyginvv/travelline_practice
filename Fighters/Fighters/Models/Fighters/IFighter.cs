using Fighters.Races;
using Fighters.Weapons;

namespace Fighters
{
    public interface IFighter
    {
        public int MaxHealth { get; }
        public int CurrentHealth { get; }

        public string Name { get; }

        public IWeapon Weapon { get; }
        public IRace Race { get; }
        public IArmor Armor { get; }
        public IClass Class { get; }

        public void TakeDamage(int damage);
        public int CalculateDamage();
    }
}