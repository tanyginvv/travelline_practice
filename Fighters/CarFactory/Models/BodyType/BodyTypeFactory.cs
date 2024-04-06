namespace CarFactory.Models.BodyType
{
    public static class BodyTypeFactory
    {
        public static IBodyType CreateBodyType(int bodyTypeChoice)
        {
            switch (bodyTypeChoice)
            {
                case 1:
                    return new SedanBody();
                case 2:
                    return new SUV();
                case 3:
                    return new StationWagonBody();
                default:
                    Console.WriteLine("Некорректный выбор типа кузова. Выбран тип по умолчанию (Седан).");
                    return new SedanBody();
            }
        }

        public static void PrintAvailableOptions()
        {
            Console.WriteLine("Доступные типы кузова:");
            Console.WriteLine("1. Седан");
            Console.WriteLine("2. Внедорожник");
            Console.WriteLine("3. Универсал");
        }
    }
}