using Fighter.Models.Armors;
using Fighter.Models.Classes;
using Fighter.Models.Races;
using Fighter.Models.Weapons;

namespace Fighter.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth => Race.Health + Class.Health;
        public int CurrentHealth { get; set; }
        public string Name { get; }
        public int Speed => Race.Speed;
        public IRace Race { get; }
        public IWeapon Weapon { get; set; }
        public IArmor Armor { get; set; }
        public int CurrentArmor => Race.Armor + Armor.Armor;
        public IClass Class { get; set; }
        //пусть каждый третий удар будет критическим(то есть будет увеличен в 2 раза) для этого ввожу счетчик
        public int CriticalDamageCounter { get; set; }
        public Fighter(string name, IRace race, IWeapon weapon, IArmor armor, IClass fighterClass)
        {
            Name = name;
            Race = race;
            Weapon = weapon;
            Armor = armor;
            Class = fighterClass;
            CurrentHealth = MaxHealth;
        }

        public int CalculateDamage()
        {
            double damageModifier = Random.Shared.Next(80, 121) / 100d;
            CriticalDamageCounter++;
            double allDamage = (Race.Damage + Class.Damage + Weapon.Damage) * damageModifier;
            if (CriticalDamageCounter % 3 == 0)
            {
                Console.WriteLine("Критический урон");
                CriticalDamageCounter = 0;
                return (int)allDamage * 2;
            }
            else
            {
                return (int)allDamage;
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