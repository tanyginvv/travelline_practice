using Fighters.Armors;
using Fighters.Races;
using Fighters.Weapons;

namespace Fighters.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth => Race.Health + Class.Health;
        public int CurrentHealth { get; set; }
        public string Name { get; }
        public int Speed => Race.Speed;
        public IRace Race { get; }
        public IWeapon Weapon { get; private set; }
        public IArmor Armor {  get; private set; }

        public int CurrentArmor => Race.Armor + Armor.Armor;
        public IClass Class { get; private set; }
        //пусть каждый третий удар будет критическим(то есть будет увеличен в 2 раза) для этого ввожу счетчик
        public int CriticalDamageCounter { get; set; } = 0;

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
            Random random = new Random();
            double damageModifier = (random.Next(80, 120) * 0.01);
            CriticalDamageCounter++; 
            if (CriticalDamageCounter % 3 == 0) 
            {
                Console.WriteLine("Критический урон");
                CriticalDamageCounter = 0;
                return (int)Math.Max((Race.Damage + Class.Damage + Weapon.Damage) * damageModifier * 2, 0);
            }
            else
            {
                return (int)Math.Max((Race.Damage + Class.Damage + Weapon.Damage) * damageModifier, 0);
            }
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