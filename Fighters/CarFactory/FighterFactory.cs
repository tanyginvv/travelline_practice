using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Fighters;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

namespace Fighters
{
    public static class FighterFactory
    {
        public static Fighter CreateFighter()
        {
            Console.WriteLine("Введите имя бойца:");
            string name = Console.ReadLine() ?? throw new Exception("Error name of fighter");

            IRace chosenRace = ChooseRace();
            IWeapon chosenWeapon = ChooseWeapon();
            IArmor chosenArmor = ChooseArmor();
            IClass chosenClass = ChooseClass();

            return new Fighter(name, chosenRace, chosenWeapon, chosenArmor, chosenClass);
        }

        private static IRace ChooseRace()
        {
            Console.WriteLine("Выберите расу:");
            Console.WriteLine("1. Человек");
            Console.WriteLine("2. Кельт");
            Console.WriteLine("3. Германец");
            Console.WriteLine("4. Римлянин");

            return GetInput(1, 4) switch
            {
                1 => new Human(),
                2 => new TheCelt(),
                3 => new TheGerman(),
                4 => new TheRoman(),
                _ => new Human()
            };
        }

        private static IWeapon ChooseWeapon()
        {
            Console.WriteLine("Выберите оружие:");
            Console.WriteLine("1. Меч");
            Console.WriteLine("2. Лук");
            Console.WriteLine("3. Палка");
            Console.WriteLine("4. Без оружия");

            return GetInput(1, 4) switch
            {
                1 => new Sword(),
                2 => new Bow(),
                3 => new Staff(),
                4 => new NoWeapon(),
                _ => new NoWeapon()
            };
        }

        private static IArmor ChooseArmor()
        {
            Console.WriteLine("Выберите броню:");
            Console.WriteLine("1. Щит");
            Console.WriteLine("2. Без брони");
            Console.WriteLine("3. Шлем");

            return GetInput(1, 3) switch
            {
                1 => new Shield(),
                2 => new NoArmor(),
                3 => new Helmet(),
                _ => new NoArmor()
            };
        }

        private static IClass ChooseClass()
        {
            Console.WriteLine("Выберите класс:");
            Console.WriteLine("1. Рыцарь");
            Console.WriteLine("2. Наемник");
            Console.WriteLine("3. Бард");

            return GetInput(1, 3) switch
            {
                1 => new Knight(),
                2 => new Mercenary(),
                3 => new Bard(),
                _ => new Knight()
            };
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
