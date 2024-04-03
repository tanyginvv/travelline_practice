using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class Priora : IModel
    {
        public IBrand Brand { get; } = new Lada();
        public string Name { get; } = "Priora";
    }
}