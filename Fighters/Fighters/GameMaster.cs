using Fighters.Models.Fighters;
using System.Diagnostics;

namespace Fighters
{
    public class GameMaster
    {
        public IFighter PlayAndGetWinner(List<Fighter> fighters)
        {
            Random random = new Random();
            List<Fighter> orderedFighters = OrderFightersByRaceSpeed(fighters, random);

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

                for (int i = 0; i < fighters.Count; i++)
                {
                    int attackerIndex = i;
                    int defenderIndex = (i + 1) % fighters.Count;

                    var attacker = fighters[attackerIndex];
                    var defender = fighters[defenderIndex];

                    Console.WriteLine($"Боец {attacker.Name} атакует Бойца {defender.Name}");

                    FightAndCheckIfOpponentDead(attacker, defender);

                    if (defender.CurrentHealth <= 0)
                    {
                        Console.WriteLine($"Боец {defender.Name} был повержен!");
                        fighters.Remove(defender);
                    }
                }

                if (fighters.Count == 1)
                {
                    return fighters[0];
                }

                Console.WriteLine();
            }
        }

        private List<Fighter> OrderFightersByRaceSpeed(List<Fighter> fighters, Random random)
        {
            Dictionary<string, int> raceSpeeds = new Dictionary<string, int>();
            foreach (var fighter in fighters)
            {
                string race = fighter.Race.Name;
                int speed = fighter.Speed;

                if (!raceSpeeds.ContainsKey(race))
                {
                    raceSpeeds[race] = speed;
                }
                else if (speed > raceSpeeds[race])
                {
                    raceSpeeds[race] = speed;
                }
            }

            List<(Fighter fighter, int speed)> fightersWithSpeeds = new List<(Fighter, int)>();
            foreach (var fighter in fighters)
            {
                string race = fighter.Race.Name;
                int speed = raceSpeeds[race];
                fightersWithSpeeds.Add((fighter, speed));
            }

            List<Fighter> orderedFighters = fightersWithSpeeds.OrderByDescending(x => x.speed).Select(x => x.fighter).ToList();

            if (raceSpeeds.Count == 1)
            {
                orderedFighters = orderedFighters.OrderBy(x => random.Next()).ToList();
            }
            else
            {
                var groupedByRace = orderedFighters.GroupBy(x => x.Race);
                foreach (var group in groupedByRace)
                {
                    if (group.Count() > 1)
                    {
                        var shuffledGroup = group.OrderBy(x => random.Next()).ToList();
                        for (int i = 0; i < group.Count(); i++)
                        {
                            orderedFighters[orderedFighters.IndexOf(group.ElementAt(i))] = shuffledGroup[i];
                        }
                    }
                }
            }

            return orderedFighters;
        }

        private bool FightAndCheckIfOpponentDead(Fighter roundOwner, Fighter opponent)
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
