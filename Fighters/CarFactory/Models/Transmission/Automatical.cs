namespace CarFactory.Models.Transmission
{
    public class Automatical : ITransmission
    {
        public string Name { get; } = "Автоматическая";
        public int MaxSpeed { get; } = 30;
        public int MinGears { get; } = 2;
    }
}