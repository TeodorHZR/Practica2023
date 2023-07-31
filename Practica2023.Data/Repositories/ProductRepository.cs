using Dapper;
using Practica2023.Business;
using Practica2023.Business.Contracts;
using Practica2023.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private IConnectionString connectionString;

        public ProductRepository(IConnectionString connectionString)
        {

            this.connectionString = connectionString;
        }

        public List<Product> GetAll(int offset, int limit)
        {
            using var db = new SqlDataContext(connectionString);
            var sql = "Select ProductId, [Name], [Price], CategoryId from Products order by ProductId offset @offset ROWS FETCH NEXT @limit ROWS ONLY;";
            var list = db.Connection.Query<Product>(sql, new { offset, limit, }).ToList();
            return list;
        }

        public Product GetById(int id)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "Select ProductId, [Name], [Price], CategoryId from Products where ProductId = @id";
            return db.Connection.Query<Product>(sql, new { id }).FirstOrDefault();

        }
        public List<Product> GetByCategoryId(int id)
        {
            using var db = new SqlDataContext(connectionString);
            var sql = "Select ProductId, [Name], [Price], CategoryId from Products where CategoryId = @id order by ProductId ";
            var list = db.Connection.Query<Product>(sql, new { id }).ToList();
            return list;
        }

        public int Insert(Product product)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "INSERT INTO Products(Name, Price, CategoryId) VALUES (@ProductName, @ProductPrice, @CategoryId); SELECT SCOPE_IDENTITY()";
            var productId = db.Connection.ExecuteScalar<int>(sql, product);
            return productId;

        }


        public void Update(Product product)
        {
            using var db = new SqlDataContext(connectionString);
            var sql = "UPDATE Products set Name = @ProductName, Price = @ProductPrice, CategoryId = @CategoryId where ProductId = @ProductId";
            db.Connection.Execute(sql, product);
        }
        public void Delete(int id)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "Delete from Products where ProductId = @id";
            db.Connection.Execute(sql, new { id });

        }
    }
}
