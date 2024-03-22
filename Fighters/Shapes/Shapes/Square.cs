namespace Shapes.Shapes
{
    public class Square : IShape
    {
        private double Side;
        public Square(double side)
        {
            Side = side;
        }
        public double CalculateArea()
        {
            return Side * Side;
        }
        public double CalculatePerimeter()
        {
            return 4 * Side;
        }
    }
}