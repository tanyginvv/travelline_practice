namespace CarFactory.Models.Transmission
{
    public class Mechanical : ITransmission
    {
        public string Name { get;} = "Механическая";
        public int MaxSpeed { get; } = 50;
        public int minGears { get; } = 3;
    }
}