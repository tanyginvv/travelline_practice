using Shapes.Shapes;

namespace Shapes
{
    public class Program
    {
        static List<IShape> _shapes = new List<IShape>();

        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("Выберите тип фигуры:");
                Console.WriteLine("1. Круг");
                Console.WriteLine("2. Треугольник");
                Console.WriteLine("3. Квадрат");
                Console.WriteLine("Введите соответствующее число (1, 2, 3), или введите 'list' для просмотра списка фигур, или 'exit' для выхода:");
                string type = Console.ReadLine().ToLower();

                switch (type)
                {
                    case "1":
                        AddCircle();
                        break;
                    case "2":
                        AddTriangle();
                        break;
                    case "3":
                        AddSquare();
                        break;
                    case "list":
                        ShowShapes();
                        break;
                    case "exit":
                        Console.WriteLine("Выход из программы.");
                        return;
                    default:
                        Console.WriteLine("Неизвестный тип фигуры.");
                        break;
                }
            }
        }

        static void AddCircle()
        {
            Console.WriteLine("Введите координаты центра круга (x y) и радиус:");
            string[] parts = Console.ReadLine().Split(' ');

            if (parts.Length != 3)
            {
                Console.WriteLine("Неверное количество аргументов.");
                return;
            }

            if (!double.TryParse(parts[0], out double x) || !double.TryParse(parts[1], out double y) || !double.TryParse(parts[2], out double radius))
            {
                Console.WriteLine("Некорректные аргументы.");
                return;
            }

            Point center = new Point(x, y);
            _shapes.Add(new Circle(center, radius));
            Console.WriteLine("Круг добавлен.");
        }

        static void AddTriangle()
        {
            Console.WriteLine("Введите координаты вершин треугольника (x1 y1 x2 y2 x3 y3):");
            string[] parts = Console.ReadLine().Split(' ');

            if (parts.Length != 6)
            {
                Console.WriteLine("Неверное количество аргументов.");
                return;
            }

            if (!double.TryParse(parts[0], out double x1) || !double.TryParse(parts[1], out double y1) ||
                !double.TryParse(parts[2], out double x2) || !double.TryParse(parts[3], out double y2) ||
                !double.TryParse(parts[4], out double x3) || !double.TryParse(parts[5], out double y3))
            {
                Console.WriteLine("Некорректные аргументы.");
                return;
            }

            Point vertex1 = new Point(x1, y1);
            Point vertex2 = new Point(x2, y2);
            Point vertex3 = new Point(x3, y3);
            _shapes.Add(new Triangle(vertex1, vertex2, vertex3));
            Console.WriteLine("Треугольник добавлен.");
        }

        static void AddSquare()
        {
            Console.WriteLine("Введите длину стороны квадрата:");
            if (!double.TryParse(Console.ReadLine(), out double side))
            {
                Console.WriteLine("Некорректный аргумент.");
                return;
            }

            _shapes.Add(new Square(side));
            Console.WriteLine("Квадрат добавлен.");
        }

        static void ShowShapes()
        {
            if (_shapes.Count == 0)
            {
                Console.WriteLine("Нет фигур.");
                return;
            }

            for (int i = 0; i < _shapes.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {_shapes[i].GetType().Name}: Площадь: {Math.Round(_shapes[i].CalculateArea(),3)}. Периметр: {Math.Round(_shapes[i].CalculatePerimeter(),3)}.");
            }
        }
    }
}
