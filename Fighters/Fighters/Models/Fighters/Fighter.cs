using Fighters.Races;
using Fighters.Weapons;

namespace Fighters.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth => Race.Health + Class.Health;
        public int CurrentHealth { get; set; }

        public string Name { get; }

        public IRace Race { get; }
        public IWeapon Weapon { get; private set; }
        public IArmor Armor {  get; private set; }

        public int CurrentArmor => Race.Armor + Armor.Armor;
        public IClass Class { get; private set; }

        public Fighter(string name, IRace race, IWeapon weapon, IArmor armor, IClass _class)
        {
            Name = name;
            Race = race;
            Weapon = weapon;
            Armor = armor;
            Class = _class;
            CurrentHealth = MaxHealth;
        }

        public int CalculateDamage()
        {
            return Math.Max(Race.Damage + Class.Damage + Weapon.Damage, 0);
        }

        public void TakeDamage(int damage)
        {
            CurrentHealth -= damage;
            if (CurrentHealth < 0)
            {
                CurrentHealth = 0;
            }
        }
        public override string ToString()
        {
            return $"У игрока {Name} начальных очков здоровья {MaxHealth} и общая емкость щита {CurrentArmor}";
        }
    }
}