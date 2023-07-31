
using System.Xml.Linq;
using Practica2023.Business.Domain;
namespace Practica2023.Models
{
    public class ProductModel
    {
        public ProductModel() { }
        public ProductModel(Product entity)
        {

            ProductId = entity.ProductId;
            ProductName = entity.ProductName;
            ProductPrice = entity.ProductPrice;
            CategoryId= entity.CategoryId;
        }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int CategoryId { get; set; }

    }
}
