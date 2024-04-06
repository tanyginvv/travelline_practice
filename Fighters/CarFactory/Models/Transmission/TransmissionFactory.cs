namespace CarFactory.Models.Transmission
{
    public class TransmissionFactory
    {
        public static ITransmission CreateTransmission(int transmissionChoice)
        {
            switch (transmissionChoice)
            {
                case 1:
                    return new Mechanical();
                case 2:
                    return new Automatical();
                default:
                    Console.WriteLine("Некорректный выбор типа трансмиссии. Выбран тип по умолчанию (Механическая).");
                    return new Mechanical();
            }
        }

        public static void PrintAvailableOptions()
        {
            Console.WriteLine("Доступные типы коробки передач:");
            Console.WriteLine("1. Механическая");
            Console.WriteLine("2. Автоматическая");
        }
    }
}