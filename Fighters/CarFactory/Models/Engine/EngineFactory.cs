namespace CarFactory.Models.Engine
{
    public static class EngineFactory
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

        public static string AvailableOptionsToString()
        {
            return "Доступные типы двигателя:\n1. V1\n2. V6\n3. V8\n4. V12";
        }
    }
}