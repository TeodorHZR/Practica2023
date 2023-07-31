using Practica2023.Business;
using System.Data.SqlClient;

namespace Practica2023.Helpers
{
    public class ConnectionString : IConnectionString
    {

        public ConnectionString(string connectionString)
        {
            SqlConnectionString = connectionString;
        }

        public string SqlConnectionString { get; private set; }
    }

}
