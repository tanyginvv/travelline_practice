using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory.Models.Car
{
    public class Car
    {
        public IBrand Brand { get; private set; }
        public IModel Model { get; private set; }
        public IBodyType BodyType { get; private set; }
        public ISteeringPosition SteeringPosition { get; private set; }
        public IEngine Engine { get; private set; }
        public int MaxSpeed => Engine.MaxSpeed + Tramsmission.MaxSpeed;
        public int GearsCount => Engine.MinGears + Tramsmission.MinGears;
        public ITransmission Tramsmission { get; private set; }
        public IColor Color { get; private set; }

        public Car(
            IBrand brand,
            IModel model,
            IBodyType bodyType,
            IEngine engine,
            ITransmission transmission,
            ISteeringPosition steering,
            IColor color)
        {
            Brand = brand;
            Model = model;
            BodyType = bodyType;
            Engine = engine;
            Tramsmission = transmission;
            Color = color;
            SteeringPosition = steering;
        }

        public override string ToString()
        {
            return $"Машина : {Brand.Name} {Model.Name}\nКоробка передач : {Tramsmission.Name}\nКоличество передач : {GearsCount}\nДвигатель : {Engine.Name}\nКузов : {BodyType.Name}" +
                $"\nМаксимальная скорость : {MaxSpeed}\nЦвет : {Color.Name}\nПозиция руля : {SteeringPosition.Name}";
        }
    }
}