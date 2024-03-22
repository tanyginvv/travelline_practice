namespace Shapes.Shapes
{
    public class Triangle : IShape
    {
        private Point vertex1;
        private Point vertex2;
        private Point vertex3;

        public Triangle(Point vertex1, Point vertex2, Point vertex3)
        {
            this.vertex1 = vertex1;
            this.vertex2 = vertex2;
            this.vertex3 = vertex3;
        }

        public double CalculateArea()
        {
            return 0.5 * (vertex1.x * (vertex2.y - vertex3.y) + vertex2.x * (vertex3.y - vertex1.y) + vertex3.x * (vertex1.y - vertex2.y));
        }

        public double CalculatePerimeter()
        {
            double side1 = Distance(vertex1, vertex2);
            double side2 = Distance(vertex2, vertex3);
            double side3 = Distance(vertex3, vertex1);

            double perimeter = side1 + side2 + side3;

            return perimeter;
        }

        private double Distance(Point p1, Point p2)
        {
            double deltaX = p2.x - p1.x;
            double deltaY = p2.y - p1.y;

            double distanceSquared = deltaX * deltaX + deltaY * deltaY;

            double distance = Math.Sqrt(distanceSquared);

            return distance;
        }
    }
}