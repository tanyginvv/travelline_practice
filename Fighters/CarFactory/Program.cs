using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Добро пожаловать на фабрику машин! Давайте соберем ее для вас!");
            //Выбор марки автомобиля
            Console.WriteLine("Выберите марку автомобиля:");
            Console.WriteLine("1. Toyota");
            Console.WriteLine("2. Lada");
            Console.WriteLine("3. BMW");
            int brandChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid brand"));

            IBrand brand;
            switch (brandChoice)
            {
                case 1:
                    brand = new Toyota();
                    break;
                case 2:
                    brand = new Lada();
                    break;
                case 3:
                    brand = new BMW();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор марки. Выбрана марка по умолчанию (Toyota).");
                    brand = new Toyota();
                    break;
            }

            IModel model;
            // Выбор модели автомобиля
            if (brandChoice == 1)
            {
                Console.WriteLine("Выберите модель автомобиля:");
                Console.WriteLine("1. Camry");
                Console.WriteLine("2. Supra");
                int modelChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid model"));
                switch (modelChoice)
                {
                    case 1:
                        model = new Camry();
                        break;
                    case 2:
                        model = new Supra();
                        break;
                    default:
                        Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (Camry).");
                        model = new Camry();
                        break;
                }
            } else if (brandChoice == 2)
            {
                Console.WriteLine("Выберите модель автомобиля:");
                Console.WriteLine("1. Vesta");
                Console.WriteLine("2. Priora");
                int modelChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid model"));
                switch (modelChoice)
                {
                    case 1:
                        model = new Vesta();
                        break;
                    case 2:
                        model = new Priora();
                        break;
                    default:
                        Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (Priora).");
                        model = new Priora();
                        break;
                }
            } else
            {
                Console.WriteLine("Выберите модель автомобиля:");
                Console.WriteLine("1. x5");
                Console.WriteLine("2. m8");
                int modelChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid model"));
                switch (modelChoice)
                {
                    case 1:
                        model = new X5();
                        break;
                    case 2:
                        model = new M8();
                        break;
                    default:
                        Console.WriteLine("Некорректный выбор модели. Выбрана модель по умолчанию (X5).");
                        model = new X5();
                        break;
                }
            }

            // Выбор типа кузова
            Console.WriteLine("Выберите тип кузова:");
            Console.WriteLine("1. Седан");
            Console.WriteLine("2. Внедорожник");
            Console.WriteLine("3. Универсал");
            int bodyTypeChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid body type"));

            IBodyType bodyType;
            switch (bodyTypeChoice)
            {
                case 1:
                    bodyType = new SedanBody();
                    break;
                case 2:
                    bodyType = new SUV();
                    break;
                case 3:
                    bodyType = new StationWagonBody();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор типа кузова. Выбран тип по умолчанию (Седан).");
                    bodyType = new SedanBody();
                    break;
            }

            // Выбор типа двигателя
            Console.WriteLine("Выберите тип двигателя:");
            Console.WriteLine("1. V1");
            Console.WriteLine("2. V6");
            Console.WriteLine("3. V8");
            Console.WriteLine("4. V12");
            int engineChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid engine"));

            IEngine engine;
            switch (engineChoice)
            {
                case 1:
                    engine = new V1();
                    break;
                case 2:
                    engine = new V6();
                    break;
                case 3:
                    engine = new V8();
                    break;
                case 4:
                    engine = new V12();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор типа двигателя. Выбран тип по умолчанию (V6).");
                    engine = new V6();
                    break;
            }

            // Выбор типа трансмиссии
            Console.WriteLine("Выберите тип трансмиссии:");
            Console.WriteLine("1. Механическая");
            Console.WriteLine("2. Автоматическая");
            int transmissionChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid transmission"));

            ITransmission transmission;
            switch (transmissionChoice)
            {
                case 1:
                    transmission = new Mechanical();
                    break;
                case 2:
                    transmission = new Automatical();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор типа трансмиссии. Выбран тип по умолчанию (Механическая).");
                    transmission = new Mechanical();
                    break;
            }

            // Выбор цвета автомобиля
            Console.WriteLine("Выберите цвет автомобиля:");
            Console.WriteLine("1. Красный");
            Console.WriteLine("2. Синий");
            Console.WriteLine("3. Зеленый");

            int colorChoice = int.Parse(Console.ReadLine() ?? throw new Exception ("Invalid color") );

            IColor color;
            switch (colorChoice)
            {
                case 1:
                    color = new Red();
                    break;
                case 2:
                    color = new Blue();
                    break;
                case 3:
                    color = new Green();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор цвета. Выбран цвет по умолчанию (Синий).");
                    color = new Blue();
                    break;
            }
            //Выбор положения руля
            Console.WriteLine("Выберите положение руля:");
            Console.WriteLine("1. Левостороннее");
            Console.WriteLine("2. Правостороннее");
            int steeringChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid steering"));

            ISteeringPosition steering;
            switch (steeringChoice)
            {
                case 1:
                    steering = new LeftPosition();
                    break;
                case 2:
                    steering = new RightPosition();
                    break;
                default:
                    Console.WriteLine("Некорректный выбор положения руля. Выбрано положение по умолчанию (Левостороннее).");
                    steering = new LeftPosition();
                    break;
            }

            CarFactory factory = new CarFactory();
            var newCar = factory.CreateCar(brand, model, bodyType, engine, transmission, steering, color);

            Console.WriteLine("Новый автомобиль создан:");
            Console.WriteLine(newCar.ToString());
        }
    }
}