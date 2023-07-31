// AdminRepository.cs

using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Practica2023.Business;
using Practica2023.Business.Contracts;
using Practica2023.Business.Domain;

namespace Practica2023.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private IConnectionString connectionString;

        public AdminRepository(IConnectionString connectionString)
        {

            this.connectionString = connectionString;
        }
        public Admin GetAdminByUsername(string username)
        {
               using var db = new SqlDataContext(connectionString);
                string query = "SELECT username, password FROM Admins WHERE Username = @Username";
                var parameters = new { Username = username };
                var result = db.Connection.Query<Admin>(query, parameters).FirstOrDefault();

                return result;
        }
    }
}
