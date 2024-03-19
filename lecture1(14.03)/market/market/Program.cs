Console.WriteLine("Введите название товара");
var productName = Console.ReadLine();
Console.WriteLine("Введите количество товара");
var productQuantity = Console.ReadLine();
Console.WriteLine("Введите свое имя");
var userName = Console.ReadLine();
Console.WriteLine("Введите адрес доставки");
var address = Console.ReadLine();
Console.WriteLine($"Здравствуйте, {userName}, вы заказали {productQuantity} {productName} на адрес {address}, все верно?");
Console.WriteLine("y/n");
var date = DateTime.Now;
date = date.AddDays(3);
if (Console.ReadLine() == "y")
{
    Console.WriteLine($"{userName}! \n Ваш заказ {productName} в количестве  {productQuantity} оформлен! \n" +
        $" Ожидайте доставку по адресу {address} к {date.Day} {date.ToString("MMMM")}.");
}
else
{
    Console.WriteLine("error");
}