using Practica2023.Business.Domain;
using System.Xml.Linq;

namespace Practica2023.Models
{
    public class AdminModel
    {
        public AdminModel() { }
        public AdminModel(Admin entity)
        {

            AdminId = entity.AdminId;
            Username = entity.Username;
            Password = entity.Password;
        }
        public int AdminId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
