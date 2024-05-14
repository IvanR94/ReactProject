namespace FonsionHotel.Models
{
    public class ReservationDataConvert
    {
        public int SelectedRoomId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string Email { get; set; }
        public int GuestNumber { get; set; }
        public string? DiscountCode { get; set; }
        public string Token { get; set; }
        public decimal PricePerNight { get; set; }
    }
}
