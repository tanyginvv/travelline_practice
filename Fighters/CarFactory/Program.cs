

namespace CarFactory
{
    public class Program
    {
        static void Main()
        {
            Console.WriteLine("Добро пожаловать на фабрику машин! Давайте соберем ее для вас!");

            var (brand, model, bodyType, engine, transmission, steering, color) = CarBuilder.BuildCarOptions();

            Car newCar = CarFactory.CreateCar(brand,
                model,
                bodyType,
                engine,
                transmission,
                steering,
                color);

            Console.WriteLine("Новый автомобиль создан:");
            Console.WriteLine(newCar.ToString());
        }
    }
}