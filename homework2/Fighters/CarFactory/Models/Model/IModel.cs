using CarFactory.Models.Brand;

namespace CarFactory.Models.Model
{
    public interface IModel
    {
        IBrand Brand { get; }
        string Name { get; }
    }
}