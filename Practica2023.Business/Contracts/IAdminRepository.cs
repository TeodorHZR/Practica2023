// IAdminRepository.cs

using Practica2023.Business.Domain;
using System.Collections.Generic;

namespace Practica2023.Business.Contracts
{
    public interface IAdminRepository
    {
        Admin GetAdminByUsername(string username);
    }
}
