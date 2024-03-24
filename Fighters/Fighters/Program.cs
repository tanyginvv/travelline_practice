﻿using Fighters.Models.Fighters;

namespace Fighters
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Добро пожаловать в игру!");

            Console.WriteLine("Введите количество бойцов для игры:");
            int numberOfFighters;
            while (!int.TryParse(Console.ReadLine(), out numberOfFighters) || numberOfFighters < 2)
            {
                Console.WriteLine("Введите корректное целое число, больше или равное 2:");
            }

            List<Fighter> fighters = new List<Fighter>();
            for (int i = 1; i <= numberOfFighters; i++)
            {
                Console.WriteLine($"Выберите параметры для {i}-го бойца:");
                fighters.Add(Controller.CreateFighter());
                Console.WriteLine($"{i}-й боец успешно добавлен!");
            }

            var master = new GameMaster();
            var winner = master.PlayAndGetWinner(fighters);

            Console.WriteLine($"Выигрывает {winner.Name}");
        }
    }
}
