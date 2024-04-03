using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public class M8 : IModel
    {
        public IBrand Brand { get; } = new BMW();
        public string Name { get; } = "M8";
    }
}