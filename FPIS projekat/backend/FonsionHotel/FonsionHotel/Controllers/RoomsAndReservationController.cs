using FonsionHotel.DBBroker;
using FonsionHotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace FonsionHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsAndReservationController : ControllerBase
    {
        private readonly IBroker _broker;
        public RoomsAndReservationController()
        {
            _broker = new Broker();
        }

        [HttpGet("GetAllRooms")]
        public IActionResult GetAllRooms()
        {
            try
            {
                _broker.OpenConnection();
                _broker.BeginTransaction();
                var roomsList = _broker.GetRoomsData();
                _broker.Commit();

                return Ok(roomsList);
            }
            catch (Exception ex)
            {
                _broker.Rollback();
                _broker.CloseConnection();
                return StatusCode(500, ex.Message);
            }
            finally
            {
                _broker.CloseConnection();
            }
        }

        [HttpPost("MakeReservation")]
        public IActionResult MakeReservation([FromBody] ReservationData data)
        {
            var guid = Guid.NewGuid();
            var reservationData = new ReservationDataConvert
            {
                SelectedRoomId = data.SelectedRoomId,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                GuestNumber = Convert.ToInt32(data.GuestNumber),
                DiscountCode = data.DiscountCode,
                DateFrom = Convert.ToDateTime(data.DateFrom),
                DateTo = Convert.ToDateTime(data.DateTo),
                PricePerNight = Convert.ToDecimal(data.PricePerNight),
                Token = guid.ToString()
            };

            try
            {
                _broker.OpenConnection();
                _broker.BeginTransaction();
                _broker.MakeReservation(reservationData);
                _broker.Commit();

                return new JsonResult("Uspesno rezervisano!");
            }
            catch (Exception ex)
            {
                _broker.Rollback();
                _broker.CloseConnection();
                return new JsonResult(ex.Message);
            }
            finally
            {
                _broker.CloseConnection();
            }
        }
    }
}
