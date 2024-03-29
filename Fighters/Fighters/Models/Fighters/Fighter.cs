using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

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
        public Fighter(string name, IRace race, IWeapon weapon, IArmor armor, IClass classFighter)
        {
            Name = name;
            Race = race;
            Weapon = weapon;
            Armor = armor;
            Class = classFighter;
            CurrentHealth = MaxHealth;
        }

        public int CalculateDamage()
        {
            double damageModifier = (Random.Shared.Next(80, 121) / 100d);
            CriticalDamageCounter++;
            double allDamage = (Race.Damage + Class.Damage + Weapon.Damage) * damageModifier;
            if (CriticalDamageCounter % 3 == 0) 
            {
                Console.WriteLine("Критический урон");
                CriticalDamageCounter = 0;
                return (int) allDamage * 2;
            }
            else
            {
                return (int) allDamage;
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