using CarFactory.Models.BodyType;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Model;
using CarFactory.Models.SteeringPosition;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class CarOptions
    {
        public IBrand Brand { get; set; }
        public IModel Model { get; set; }
        public IBodyType BodyType { get; set; }
        public IEngine Engine { get; set; }
        public ITransmission Transmission { get; set; }
        public ISteeringPosition Steering { get; set; }
        public IColor Color { get; set; }
    }
}
