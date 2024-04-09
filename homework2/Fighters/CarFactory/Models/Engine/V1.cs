namespace CarFactory.Models.Engine
{
    public class V1 : IEngine
    {
        public string Name { get; } = "V1";
        public int MaxSpeed { get; } = 40;
        public int MinGears { get; } = 2;
    }
}