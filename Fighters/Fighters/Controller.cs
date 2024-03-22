using Fighters.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Fighters;
using Fighters.Races;
using Fighters.Weapons;

namespace Fighters
{
    public class Controller
    {
        public static Fighter CreateFighter()
        {
            Console.WriteLine("Введите имя бойца:");
            string name = Console.ReadLine();

            IRace selectedRace = ChooseRace();
            IWeapon selectedWeapon = ChooseWeapon();
            IArmor selectedArmor = ChooseArmor();
            IClass selectedClass = ChooseClass();

            return new Fighter(name, selectedRace, selectedWeapon, selectedArmor, selectedClass);
        }

        private static IClass ChooseClass()
        {
            Console.WriteLine("Выберите класс:");
            Console.WriteLine("1. Рыцарь");
            Console.WriteLine("2. Наемник");
            Console.WriteLine("3. Бард");

            int choice = GetInput(1, 3);
            switch (choice)
            {
                case 1:
                    return new Knight();
                case 2:
                    return new Mercenary();
                case 3:
                    return new Bard();
                default:
                    return new Knight();
            }
        }

        private static IRace ChooseRace()
        {
            Console.WriteLine("Выберите расу:");
            Console.WriteLine("1. Человек");
            Console.WriteLine("2. Кельт");
            Console.WriteLine("3. Германец");
            Console.WriteLine("4. Римлянин");

            int choice = GetInput(1, 4);
            switch (choice)
            {
                case 1:
                    return new Human();
                case 2:
                    return new TheCelt();
                case 3:
                    return new TheGerman();
                case 4:
                    return new TheRoman();
                default:
                    return new Human();
            }
        }

        private static IWeapon ChooseWeapon()
        {
            Console.WriteLine("Выберите оружие:");
            Console.WriteLine("1. Меч");
            Console.WriteLine("2. Лук");
            Console.WriteLine("3. Палка");
            Console.WriteLine("4. Без оружия");

            int choice = GetInput(1, 4);
            switch (choice)
            {
                case 1:
                    return new Sword();
                case 2:
                    return new Bow();
                case 3:
                    return new Staff();
                case 4:
                    return new NoWeapon();
                default:
                    return new NoWeapon();
            }
        }

        private static IArmor ChooseArmor()
        {
            Console.WriteLine("Выберите броню:");
            Console.WriteLine("1. Щит");
            Console.WriteLine("2. Без брони");
            Console.WriteLine("3. Шлем");

            int choice = GetInput(1, 3);
            switch (choice)
            {
                case 1:
                    return new Shield();
                case 2:
                    return new NoArmor();
                case 3:
                    return new Helmet();
                default:
                    return new NoArmor();
            }
        }

        private static int GetInput(int minValue, int maxValue)
        {
            int choice = 0;
            while (true)
            {
                Console.Write("Выберите опцию: ");
                if (!int.TryParse(Console.ReadLine(), out choice) || choice < minValue || choice > maxValue)
                {
                    Console.WriteLine($"Введите число от {minValue} до {maxValue}!");
                    continue;
                }
                break;
            }
            return choice;
        }
    }
}
