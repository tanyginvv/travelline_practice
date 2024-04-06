namespace CarFactory.Models.SteeringPosition
{
    public static class SteeringFactory
    {
        public static ISteeringPosition CreateSteering(int steeringChoice)
        {
            switch (steeringChoice)
            {
                case 1:
                    return new LeftPosition();
                case 2:
                    return new RightPosition();
                default:
                    Console.WriteLine("Некорректный выбор положения руля. Выбрано положение по умолчанию (Левостороннее).");
                    return new LeftPosition();
            }
        }

        public static void PrintAvailableOptions()
        {
            Console.WriteLine("Доступные положения руля:");
            Console.WriteLine("1. Левостороннее");
            Console.WriteLine("2. Правостороннее");
        }
    }
}