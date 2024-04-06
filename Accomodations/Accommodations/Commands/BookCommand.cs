using Accommodations.Dto;
using Accommodations.Models;

namespace Accommodations.Commands;

public class BookCommand(IBookingService bookingService, BookingDto bookingDto) : ICommand
{
    private Booking? _executedBookingDto;

    public void Execute()
    {
        Currency currency = bookingDto.Currency switch
        {
            CurrencyDto.Usd => Currency.Usd,
            CurrencyDto.Rub => Currency.Rub,
            CurrencyDto.Cny => Currency.Cny,
            _ => throw new ArgumentOutOfRangeException()
        };
        _executedBookingDto = bookingService.Book(bookingDto.UserId, bookingDto.Category, bookingDto.StartDate,
            bookingDto.EndDate, currency);
        Console.WriteLine($"Booking successful: ID {_executedBookingDto!.Id}");
    }

    public void Undo()
    {
        bookingService.CancelBooking(_executedBookingDto.Id);
        //I removed the calculation of the fine, because this is a system cancellation,
        //we calculate the cancellation of the fine only with the cancelBooking command
        Console.WriteLine(
            $"Booking {_executedBookingDto.Id} was canceled.");
    }
}
