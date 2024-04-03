using CarFactory.Models.Model;

namespace CarFactory.Factories
{
    public class ModelFactory
    {
        public static IModel CreateModel(int brandChoice, int modelChoice)
        {
            switch (brandChoice)
            {
                case 1: // Toyota
                    switch (modelChoice)
                    {
                        case 1:
                            return new Camry();
                        case 2:
                            return new Supra();
                        default:
                            Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (Camry).");
                            return new Camry();
                    }
                case 2: // Lada
                    switch (modelChoice)
                    {
                        case 1:
                            return new Vesta();
                        case 2:
                            return new Priora();
                        default:
                            Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (Vesta).");
                            return new Vesta();
                    }
                case 3: // BMW
                    switch (modelChoice)
                    {
                        case 1:
                            return new X5();
                        case 2:
                            return new M8();
                        default:
                            Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (X5).");
                            return new X5();
                    }
                default:
                    Console.WriteLine("Некорректный выбор марки. Выбрана марка по умолчанию (Toyota).");
                    return new Camry();
            }
        }
        public static List<string> GetModelsForBrand(int brandChoice)
        {
            switch (brandChoice)
            {
                case 1: // Toyota
                    return ["Camry", "Supra"];
                case 2: // Lada
                    return ["Vesta", "Priora"];
                case 3: // BMW
                    return ["X5", "M8"];
                default:
                    Console.WriteLine("Некорректный выбор марки. Выбрана марка по умолчанию (Toyota).");
                    return ["Camry"];
            }
        }

        public static void PrintAvailableOptions(int brandChoice)
        {
            List<string> modelsForBrand = GetModelsForBrand(brandChoice);
            Console.WriteLine("Доступные модели автомобилей:");
            for (int i = 0; i < modelsForBrand.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {modelsForBrand[i]}");
            }
        }
    }
}