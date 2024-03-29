using Fighters.Models.Fighters;
using System.Collections.Generic;
using System.Drawing;

namespace Fighters
{
    public class GameMaster
    {
        public IFighter PlayAndGetWinner(List<IFighter> fighters)
        {
            List<IFighter> orderedFighters = fighters.OrderByDescending(f => f.Speed).ThenBy(_ => Random.Shared.Next()).ToList();

            Console.WriteLine("Бой начался!");
            Console.WriteLine("Начальный порядок ходов:");

            for (int i = 0; i < orderedFighters.Count; i++)
            {
                int nextIndex = (i + 1) % orderedFighters.Count;
                Console.WriteLine($"Боец {orderedFighters[i].Name} атакует {orderedFighters[nextIndex].Name}");
            }

            int round = 0;
            while(true)
            {
                Console.WriteLine($"Раунд {round++}:");

                for (int i = 0; i < orderedFighters.Count; i++)
                {
                    int attackerIndex = i;
                    int defenderIndex = (i + 1) % orderedFighters.Count;

                    var attacker = orderedFighters[attackerIndex];
                    var defender = orderedFighters[defenderIndex];

                    Console.WriteLine($"Боец {attacker.Name} атакует Бойца {defender.Name}");

                    FightAndCheckIfOpponentDead(attacker, defender);

                    if (defender.CurrentHealth <= 0)
                    {
                        Console.WriteLine($"Боец {defender.Name} был повержен!");
                        orderedFighters.Remove(defender);
                    }
                }

                if (orderedFighters.Count == 1)
                {
                    return orderedFighters[0];
                }

                Console.WriteLine();
            }
        }

        private bool FightAndCheckIfOpponentDead(IFighter roundOwner, IFighter opponent)
        {
            int damage = roundOwner.CalculateDamage();
            int takenDamage = Math.Max(damage - opponent.CurrentArmor, 0);

            Console.WriteLine(
                $"Боец {opponent.Name} получает {(takenDamage >= opponent.CurrentHealth ? opponent.CurrentHealth : takenDamage )} урона. " +
                $"Количество жизней: {Math.Max(opponent.CurrentHealth - takenDamage, 0)}");
            opponent.TakeDamage(takenDamage);

            return opponent.CurrentHealth < 1;
        }
    }
}
