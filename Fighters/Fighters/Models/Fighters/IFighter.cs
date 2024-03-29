using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

namespace Fighters.Models.Fighters
{
    public interface IFighter
    {
        public int MaxHealth { get; }
        public int CurrentHealth { get; }
        public string Name { get; }
        public int Speed { get; }
        public IWeapon Weapon { get; }
        public IRace Race { get; }
        public IArmor Armor { get; }
        public IClass Class { get; }
        public int CurrentArmor { get; }
        public void TakeDamage(int damage);
        public int CalculateDamage();
    }
}