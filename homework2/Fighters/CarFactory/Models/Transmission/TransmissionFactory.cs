namespace CarFactory.Models.Transmission
{
    public static class TransmissionFactory
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

        public static string AvailableOptionsToString()
        {
            return "Доступные типы коробки передач:\n1. Механическая\n2. Автоматическая";
        }
    }
}