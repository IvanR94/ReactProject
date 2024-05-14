using FonsionHotel.DBBroker;
using FonsionHotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace FonsionHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReservationsController : ControllerBase
    {
        private readonly IBroker _broker;
        public UserReservationsController()
        {
            _broker = new Broker();
        }

        [HttpGet("GetReservationRooms")]
        public IActionResult GetReservationRooms(
            [FromHeader(Name = "Email")] string email, 
            [FromHeader(Name = "Token")] string token)
        {
            try
            {
                _broker.OpenConnection();
                _broker.BeginTransaction();
                var roomsList = _broker.GetReservationRoomsData(email, token);
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

        [HttpPost("CancelReservation")]
        public IActionResult CancelReservation([FromBody]CancellationData cancellationData)
        {
            try
            {
                _broker.OpenConnection();
                _broker.BeginTransaction();
                _broker.CancelReservation(cancellationData.Email, cancellationData.Token);
                _broker.Commit();

                return new JsonResult("Uspesno otkazana rezervacija!");
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
