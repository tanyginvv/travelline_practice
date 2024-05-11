using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory.Models.Car
{
    public static class CarFactory
    {
        public static CarOptions BuildCarOptions()
        {
            var carOptions = new CarOptions();

            try
            {
                Console.WriteLine("Выберите марку автомобиля:");
                Console.WriteLine(BrandFactory.AvailableOptionsToString());
                int brandChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid brand"));
                carOptions.Brand = BrandFactory.CreateBrand(brandChoice);

                Console.WriteLine("Выберите модель автомобиля:");
                Console.WriteLine(ModelFactory.AvailableOptionsToString(brandChoice));
                int modelChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid model"));
                carOptions.Model = ModelFactory.CreateModel(brandChoice, modelChoice);

                Console.WriteLine("Выберите тип кузова:");
                Console.WriteLine(BodyTypeFactory.AvailableOptionsToString());
                int bodyTypeChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid body type"));
                carOptions.BodyType = BodyTypeFactory.CreateBodyType(bodyTypeChoice);

                Console.WriteLine("Выберите коробку передач:");
                Console.WriteLine(TransmissionFactory.AvailableOptionsToString());
                int transmissionChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid transmission"));
                carOptions.Transmission = TransmissionFactory.CreateTransmission(transmissionChoice);

                Console.WriteLine("Выберите тип двигателя:");
                Console.WriteLine(EngineFactory.AvailableOptionsToString());
                int engineChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid engine"));
                carOptions.Engine = EngineFactory.CreateEngine(engineChoice);

                Console.WriteLine("Выберите цвет автомобиля:");
                Console.WriteLine(ColorFactory.AvailableOptionsToString());
                int colorChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid color"));
                carOptions.Color = ColorFactory.CreateColor(colorChoice);

                Console.WriteLine("Выберите положение руля:");
                Console.WriteLine(SteeringFactory.AvailableOptionsToString());
                int steeringChoice = int.Parse(Console.ReadLine() ?? throw new Exception("Invalid steering"));
                carOptions.Steering = SteeringFactory.CreateSteering(steeringChoice);

                return carOptions;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        public static Car CreateCar(
            IBrand brand,
            IModel model,
            IBodyType bodyType,
            IEngine engine,
            ITransmission transmission,
            ISteeringPosition steering,
            IColor color)
        {
            return new Car(brand, model, bodyType, engine, transmission, steering, color);
        }
    }
}