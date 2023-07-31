using Practica2023.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023.Business.Contracts
{
    public interface IProductRepository
    {
        List<Product> GetAll(int offset, int limit);
        Product GetById(int id);
        List<Product> GetByCategoryId(int id);
        int Insert(Product product);
        void Update(Product category);
        void Delete(int id);

    }
}
