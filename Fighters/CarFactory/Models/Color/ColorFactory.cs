namespace CarFactory.Models.Color
{
    public static class ColorFactory
    {
        public static IColor CreateColor(int colorChoice)
        {
            switch (colorChoice)
            {
                case 1:
                    return new Red();
                case 2:
                    return new Blue();
                case 3:
                    return new Green();
                default:
                    Console.WriteLine("Некорректный выбор цвета. Выбран цвет по умолчанию (Синий).");
                    return new Blue();
            }
        }

        public static string AvailableOptionsToString()
        {
            return "Доступные цвета автомобилей:\n1. Красный\n2. Синий\n3. Зеленый";
        }
    }
}