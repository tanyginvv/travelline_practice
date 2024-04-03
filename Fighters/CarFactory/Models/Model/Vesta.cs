using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class Vesta : IModel
    {
        public IBrand Brand { get; } = new Lada();
        public string Name { get; } = "Vesta";
    }
}