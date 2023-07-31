using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Practica2023.Business.Domain
{
    public class Product
    {
        public Product(int productId, string name, double price, int categoryId)
        {
            ProductId = productId;
            ProductName = name;
            ProductPrice = price;
            CategoryId = categoryId;
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int CategoryId { get; set; }
    }
}
