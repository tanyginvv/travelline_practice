

namespace CarFactory
{
    public class Program
    {
        static void Main()
        {
            Console.WriteLine("Добро пожаловать на фабрику машин! Давайте соберем ее для вас!");

            while (true)
            {
                CarOptions carOptions = CarFactory.BuildCarOptions();

                if (carOptions != null)
                {
                    Car newCar = CarFactory.CreateCar(
                        carOptions.Brand,
                        carOptions.Model,
                        carOptions.BodyType,
                        carOptions.Engine,
                        carOptions.Transmission,
                        carOptions.Steering,
                        carOptions.Color);

                    Console.WriteLine("Новый автомобиль создан:");
                    Console.WriteLine(newCar.ToString());
                    return;
                }
                else
                {
                    Console.WriteLine("Ошибка при сборке автомобиля.");
                }
            }
        }
    }
}