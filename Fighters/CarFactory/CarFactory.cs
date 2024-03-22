using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class CarFactory
    {
        public Car CreateCar(IBrand brand, IModel model, IBodyType bodyType, IEngine engine, ITransmission transmission, ISteeringPosition steering, IColor color)
        {
            return new Car(brand, model, bodyType, engine, transmission, steering, color);
        }
    }
}   