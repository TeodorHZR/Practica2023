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
    public class CategoryRepository : ICategoryRepository
    {
        private IConnectionString connectionString;

        public CategoryRepository(IConnectionString connectionString) {

            this.connectionString = connectionString;
        }

        public List<Category> GetAll(int offset, int limit, string sortOrder)
        {
            using var db = new SqlDataContext(connectionString);


            var validSortOrders = new[] { "ASC", "DESC" };
            if (!validSortOrders.Contains(sortOrder.ToUpper()))
            {
                throw new ArgumentException("Invalid sortOrder.");
            }

            var sql = $"SELECT CategoryId, [Name], [Description] FROM Category ORDER BY [Name] {sortOrder} OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;";
            var list = db.Connection.Query<Category>(sql, new { offset, limit }).ToList();
            return list;
        }


        public Category GetById(int id) {

            using var db = new SqlDataContext(connectionString);
            var sql = "Select CategoryId, [Name], [Description] from Category where CategoryId = @id";
            return db.Connection.Query<Category>(sql, new {id}).FirstOrDefault();
            
        }

        public int Insert(Category category)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "INSERT INTO Category(Name, Description) VALUES (@Name, @Description); SELECT SCOPE_IDENTITY()";
            var categoryId = db.Connection.ExecuteScalar<int>(sql, category);
            return categoryId;

        }

        public void Update(Category category)
        {
            using var db = new SqlDataContext(connectionString);
            var sql = "UPDATE Category set Name = @Name, Description = @Description where CategoryId = @CategoryId";
            db.Connection.Execute(sql, category);
        }
        public void Delete(int id)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "Delete from Category where CategoryId = @id";
            db.Connection.Execute(sql, new { id });

        }
        public int GetId(string name)
        {

            using var db = new SqlDataContext(connectionString);
            var sql = "Select CategoryId from Category where Name = @name";
            var categoryId = db.Connection.ExecuteScalar<int>(sql, new {name});
            return categoryId;

        }
        public List<Category> GetCategoriesPaginated(int page, int itemsPerPage, string sortOrder)
        {
            using var db = new SqlDataContext(connectionString);
            if (page <= 0 || itemsPerPage <= 0)
            {
                throw new ArgumentException("Invalid page or itemsPerPage values. They should be positive integers.");
            }

            var offset = (page - 1) * itemsPerPage;
            var sql = $"SELECT CategoryId, [Name], [Description] FROM Category ORDER BY [Name] {sortOrder} OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;";
            var list = db.Connection.Query<Category>(sql, new { offset, limit = itemsPerPage }).ToList();
            return list;
        }

    }
}
