using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class Supra : IModel
    {
        public IBrand Brand { get; } = new Toyota();
        public string Name { get; } = "Supra";
    }
}