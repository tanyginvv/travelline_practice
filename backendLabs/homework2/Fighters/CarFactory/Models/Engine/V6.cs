namespace CarFactory.Models.Engine
{
    public class V6 : IEngine
    {
        public string Name { get; } = "V6";
        public int MaxSpeed { get; } = 80;
        public int MinGears { get; } = 3;
    }
}