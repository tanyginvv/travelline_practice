namespace CarFactory.Models.Transmission
{
    public interface ITransmission
    {
        public string Name { get;}
        public int MaxSpeed { get;}
        public int MinGears { get;}
    }
}