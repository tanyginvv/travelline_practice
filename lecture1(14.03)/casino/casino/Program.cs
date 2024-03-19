int balance = 10000;
while (balance > 0)
{
    Console.WriteLine("Введите ставку");
    var inp = int.Parse(Console.ReadLine());
    Random random = new Random();
    int randomNumber = random.Next(1, 20);
    int[] valid = [18, 19, 20];

    if (inp <= balance)
    {
        if (valid.Contains(randomNumber))
        {
            int win = (int)(inp * (1 + (0.1 * (randomNumber % 17))));
            balance += win;
            Console.WriteLine($"Вы выиграли, ваш баланс {balance}");
        }
        else
        {
            balance -= inp;
            Console.WriteLine($"Вы проиграли, ваш баланс {balance}");
        }
    }
    else
    {
        Console.WriteLine($"Недостаточно денег, Ваш баланс {balance}");
    }
}
Console.WriteLine("Вы остались без денег! Нажмите любую кнопку, чтобы закончить игру.");
Console.ReadKey();
