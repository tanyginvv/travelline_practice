
using CarFactory.Factories;
using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class CarBuilder
    {
        public static (IBrand brand,
        IModel model,
        IBodyType bodyType,
        IEngine engine,
        ITransmission transmission,
        ISteeringPosition steering,
        IColor color) BuildCarOptions()
        {
            Console.WriteLine("Выберите марку автомобиля:");
            BrandFactory.PrintAvailableOptions();

            int brandChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid brand"));
            IBrand brand = BrandFactory.CreateBrand(brandChoice);

            Console.WriteLine("Выберите модель автомобиля:");
            ModelFactory.PrintAvailableOptions(brandChoice);

            int modelChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid model"));
            IModel model = ModelFactory.CreateModel(brandChoice, modelChoice);

            Console.WriteLine("Выберите тип кузова:");
            BodyTypeFactory.PrintAvailableOptions();

            int bodyTypeChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid body type"));
            IBodyType bodyType = BodyTypeFactory.CreateBodyType(bodyTypeChoice);

            Console.WriteLine("Выберите коробку передач:");
            TransmissionFactory.PrintAvailableOptions();

            int transmissionChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid transmission"));
            ITransmission transmission = TransmissionFactory.CreateTransmission(transmissionChoice);

            Console.WriteLine("Выберите тип двигателя:");
            EngineFactory.PrintAvailableOptions();

            int engineChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid engine"));
            IEngine engine = EngineFactory.CreateEngine(engineChoice);

            Console.WriteLine("Выберите цвет автомобиля:");
            ColorFactory.PrintAvailableOptions();

            int colorChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid color"));
            IColor color = ColorFactory.CreateColor(colorChoice);

            Console.WriteLine("Выберите положение руля:");
            SteeringFactory.PrintAvailableOptions();

            int steeringChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid steering"));
            ISteeringPosition steering = SteeringFactory.CreateSteering(steeringChoice);

            return (brand, model, bodyType, engine, transmission, steering, color);
        }
    }
}
