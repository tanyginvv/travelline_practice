using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class X5 : IModel
    {
        public IBrand Brand { get; } = new BMW();
        public string Name { get; } = "X5";
    }
}