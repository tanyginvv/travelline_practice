using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class Camry : IModel
    {
        public IBrand Brand { get; } = new Toyota();
        public string Name { get; } = "Camry";
    }
}