namespace FonsionHotel.Models
{
    public class ReservationData
    {
        public int SelectedRoomId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string Email { get; set; }
        public string GuestNumber { get; set; }
        public  string? DiscountCode { get; set; }
        public decimal PricePerNight { get; set; }
    }
}
