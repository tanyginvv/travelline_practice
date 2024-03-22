using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class Car
    {
        private IBrand Brand { get; set; }
        private IModel Model { get; set; }
        private IBodyType BodyType { get; set; }
        private ISteeringPosition SteeringPosition{get; set;}
        private IEngine Engine { get; set; }
        private int MaxSpeed  => Engine.MaxSpeed + Tramsmission.MaxSpeed;
        private int GearsCount => Engine.MinGears + Tramsmission.minGears;
        private ITransmission Tramsmission { get; set; }
        private IColor Color { get; set; }
        public Car( IBrand brand, IModel model, IBodyType bodyType, IEngine engine, ITransmission transmission, ISteeringPosition steering, IColor color) 
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