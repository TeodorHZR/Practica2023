using Practica2023.Business;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023.Data
{
    public class SqlDataContext : IDisposable
    {
        private IConnectionString connectionString;
        public SqlConnection Connection { get; }
        public SqlDataContext(IConnectionString connectionString)
        {

            Connection = new SqlConnection(connectionString.SqlConnectionString);
            Connection.Open();
        }
            public void Dispose()
        {
            if (connectionString != null) { return; }
            Connection.Close();
            Connection.Dispose();
        }

    }
}
