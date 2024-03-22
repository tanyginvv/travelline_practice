namespace CarFactory.Models.Engine
{
    public class V12 : IEngine
    {
        public string Name { get; } = "V12";
        public int MaxSpeed { get; } = 140;
        public int MinGears { get; } = 5;
    }
}