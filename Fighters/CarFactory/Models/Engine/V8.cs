namespace CarFactory.Models.Engine
{
    public class V8 : IEngine
    {
        public string Name { get; } = "V8";
        public int MaxSpeed { get; } = 120;
        public int MinGears { get; } = 4;
    }
}