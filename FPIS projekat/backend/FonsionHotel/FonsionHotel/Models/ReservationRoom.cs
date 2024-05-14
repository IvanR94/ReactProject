namespace FonsionHotel.Models
{
    public class ReservationRoom
    {
        public int ReservationDetailsID { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public decimal Price { get; set; }
        public int RoomID { get; set; }
        public int RezervationID { get; set; }
        public string RoomName { get; set; }
    }
}
