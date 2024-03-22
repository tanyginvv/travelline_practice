namespace Fighters
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Добро пожаловать в игру!");
            Console.WriteLine("Выберите параметры для первого бойца:");

            var firstFighter = Controller.CreateFighter();

            Console.WriteLine("Теперь выберите параметры для второго бойца:");

            var secondFighter = Controller.CreateFighter();

            var master = new GameMaster();
            var winner = master.PlayAndGetWinner(firstFighter, secondFighter);

            Console.WriteLine($"Выигрывает {winner.Name}");
        }
    }
}
