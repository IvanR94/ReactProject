namespace FonsionHotel.Models
{
    public class Room
    {
        public int RoomID { get; set; }
        public decimal PricePerNight { get; set; }
        public string Description { get; set; }
        public string RoomName { get; set; }
        public int Capacity { get; set; }
    }
}
