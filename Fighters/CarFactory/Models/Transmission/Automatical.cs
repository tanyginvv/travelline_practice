namespace CarFactory.Models.Transmission
{
    public class Automatical : ITransmission
    {
        public string Name { get; } = "Автоматическя";
        public int MaxSpeed { get; } = 30;
        public int minGears { get; } = 2;
    }
}