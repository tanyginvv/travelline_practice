namespace CarFactory.Models.Engine
{
    public class EngineFactory
    {
        public static IEngine CreateEngine(int engineChoice)
        {
            switch (engineChoice)
            {
                case 1:
                    return new V1();
                case 2:
                    return new V6();
                case 3:
                    return new V8();
                case 4:
                    return new V12();
                default:
                    Console.WriteLine("Некорректный выбор типа двигателя. Выбран тип по умолчанию (V6).");
                    return new V6();
            }
        }

        public static void PrintAvailableOptions()
        {
            Console.WriteLine("Доступные типы двигателя:");
            Console.WriteLine("1. V1");
            Console.WriteLine("2. V6");
            Console.WriteLine("3. V8");
            Console.WriteLine("4. V12");
        }
    }
}