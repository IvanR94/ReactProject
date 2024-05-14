using FonsionHotel.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Data;
using System.Data.SqlClient;

namespace FonsionHotel.DBBroker
{
    public class Broker : IBroker
    {
        #region BrokerSuff
        private SqlConnection connection;
        private SqlTransaction transaction;

        public Broker()
        {
            connection = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=FPIS_projekat;Integrated Security=True;");
        }

        public void OpenConnection()
        {
            connection.Open();
        }
        public void CloseConnection()
        {
            connection.Close();
        }

        public void BeginTransaction()
        {
            transaction = connection.BeginTransaction();
        }

        public void Commit()
        {
            transaction.Commit();
        }

        public void Rollback()
        {
            transaction.Rollback();
        }
        #endregion

        public List<Room> GetRoomsData()
        {
            List<Room> list = new List<Room>();
            SqlCommand sqlCommand = connection.CreateCommand();
            sqlCommand.Transaction = transaction;
            sqlCommand.CommandText = "SELECT * FROM Soba";
            var reader = sqlCommand.ExecuteReader();
            while (reader.Read())
            {
                Room room = new Room()
                {
                    RoomID = (int)reader["SobaID"],
                    PricePerNight = Convert.ToDecimal(reader["CenaPoNoci"]),
                    Description = Convert.ToString(reader["Opis"])!,
                    RoomName = Convert.ToString(reader["Naziv"])!,
                    Capacity = Convert.ToInt32(reader["Kapacitet"])
                };
                list.Add(room);
            }
            reader.Close();
            return list;
        }

        public List<ReservationRoom> GetReservationRoomsData(string email, string token)
        {
            List<ReservationRoom> list = new List<ReservationRoom>();
            SqlCommand sqlCommand = connection.CreateCommand();
            sqlCommand.Transaction = transaction;
            sqlCommand.CommandText = $"SELECT * FROM DetaljiRezervacije INNER JOIN Rezervacija ON Rezervacija.RezervacijaID = DetaljiRezervacije.RezervacijaID INNER JOIN Gost ON Rezervacija.GostID = Gost.GostID INNER JOIN Soba ON Soba.SobaID = DetaljiRezervacije.SobaID WHERE Rezervacija.Token = '{token}' AND Gost.Email = '{email}' AND Rezervacija.StatusRezervacije = 1";
            var reader = sqlCommand.ExecuteReader();
            while (reader.Read())
            {
                ReservationRoom room = new ReservationRoom()
                {
                    ReservationDetailsID = (int)reader["DetaljiRezervacijeID"],
                    RezervationID = (int)reader["RezervacijaID"],
                    DateFrom = Convert.ToDateTime(reader["DatumOd"]),
                    DateTo = Convert.ToDateTime(reader["DatumDo"]),
                    Price = Convert.ToDecimal(reader["CenaRezervacije"]),
                    RoomID = (int)reader["SobaID"],
                    RoomName = Convert.ToString(reader["Naziv"])!
                };
                list.Add(room);
            }
            reader.Close();
            return list;
        }

        public void CancelReservation(string email, string token)
        {
            SqlCommand sqlCommand = connection.CreateCommand();
            sqlCommand.Transaction = transaction;

            sqlCommand.CommandText = "CancelReservation";
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@Email", email);
            sqlCommand.Parameters.AddWithValue("@Token", token);

            try
            {
                sqlCommand.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                // Handle exceptions
                throw;
            }
        }

        public void MakeReservation(ReservationDataConvert reservationData)
        {
            SqlCommand sqlCommand = connection.CreateCommand();
            sqlCommand.Transaction = transaction;

            sqlCommand.CommandText = "SaveReservation";
            sqlCommand.CommandType = CommandType.StoredProcedure;

            sqlCommand.Parameters.AddWithValue("@RoomID", reservationData.SelectedRoomId);
            sqlCommand.Parameters.AddWithValue("@FirstName", reservationData.FirstName);
            sqlCommand.Parameters.AddWithValue("@LastName", reservationData.LastName);
            sqlCommand.Parameters.AddWithValue("@DateFrom", reservationData.DateFrom.Date);
            sqlCommand.Parameters.AddWithValue("@DateTo", reservationData.DateTo.Date);
            sqlCommand.Parameters.AddWithValue("@Email", reservationData.Email);
            sqlCommand.Parameters.AddWithValue("@GuestNumber", reservationData.GuestNumber);
            sqlCommand.Parameters.AddWithValue("@Token", reservationData.Token);
            sqlCommand.Parameters.AddWithValue("@PricePerNight", reservationData.PricePerNight);
            if (!String.IsNullOrEmpty(reservationData.DiscountCode))
            {
                sqlCommand.Parameters.AddWithValue("@DiscountCode", reservationData.DiscountCode);
            }

            try
            {
                sqlCommand.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                // Handle exceptions
                throw;
            }
        }
    }
}
