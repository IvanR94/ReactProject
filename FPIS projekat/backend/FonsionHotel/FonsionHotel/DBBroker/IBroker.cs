using FonsionHotel.Models;

namespace FonsionHotel.DBBroker
{
    public interface IBroker
    {
        void OpenConnection();
        void CloseConnection();
        void BeginTransaction();
        void Commit();
        void Rollback();
        List<Room> GetRoomsData();
        List<ReservationRoom> GetReservationRoomsData(string email, string token);
        void CancelReservation(string email, string token);
        void MakeReservation(ReservationDataConvert reservationData);
    }
}
