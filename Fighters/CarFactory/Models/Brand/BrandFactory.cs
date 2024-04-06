namespace CarFactory.Models.Brand
{
    public static class BrandFactory
    {
        public static IBrand CreateBrand(int brandChoice)
        {
            switch (brandChoice)
            {
                case 1:
                    return new Toyota();
                case 2:
                    return new Lada();
                case 3:
                    return new BMW();
                default:
                    Console.WriteLine("Некорректный выбор марки. Выбрана марка по умолчанию (Toyota).");
                    return new Toyota();
            }
        }

        public static void PrintAvailableOptions()
        {
            Console.WriteLine("Доступные марки автомобилей:");
            Console.WriteLine("1. Toyota");
            Console.WriteLine("2. Lada");
            Console.WriteLine("3. BMW");
        }
    }
}