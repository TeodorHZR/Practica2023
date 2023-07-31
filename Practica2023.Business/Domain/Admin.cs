using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023.Business.Domain
{
    public class Admin
    {
        public Admin() // Constructorul fără parametri (default constructor)
        {
        }
        public Admin(int adminId, string username, string password)
        {
            AdminId = adminId;
            Username = username;
            Password = password;
        }

        public int AdminId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
