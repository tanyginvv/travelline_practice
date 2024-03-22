using Fighters.Models.Fighters;
using System.Diagnostics;

namespace Fighters
{
    public class GameMaster
    {
        public IFighter PlayAndGetWinner(Fighter firstFighter, Fighter secondFighter)
        {
            int round = 1;
            Console.WriteLine( firstFighter.ToString() + '\n' + secondFighter.ToString());
            while (true)
            {
                Console.WriteLine($"Раунд {round++}.");

                // First fights second
                if (FightAndCheckIfOpponentDead(firstFighter, secondFighter))
                {
                    return firstFighter;
                }

                // Second fights first
                if (FightAndCheckIfOpponentDead(secondFighter, firstFighter))
                {
                    return secondFighter;
                }

                Console.WriteLine();
            }

            throw new UnreachableException();
        }

        private bool FightAndCheckIfOpponentDead(Fighter roundOwner, Fighter opponent)
        {
            int damage = roundOwner.CalculateDamage();
            int takenDamage = Math.Max(damage - opponent.CurrentArmor, 0);
            opponent.TakeDamage(takenDamage);

            Console.WriteLine(
                $"Боец {opponent.Name} получает {takenDamage} урона. " +
                $"Количество жизней: {opponent.CurrentHealth}");

            return opponent.CurrentHealth < 1;
        }
    }
}
