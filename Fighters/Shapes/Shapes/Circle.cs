namespace Shapes.Shapes
{
    public class Circle : IShape
    {
        private Point Center;
        private double Radius;
        public Circle(Point center, double radius)
        {
            Center = center;
            Radius = radius;
        }

        public double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }

        public double CalculatePerimeter()
        {
            return 2 * Math.PI * Radius;
        }
    }
}