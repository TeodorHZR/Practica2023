using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practica2023.Business.Contracts;
using Practica2023.Business.Domain;
using Practica2023.Data.Repositories;
using Practica2023.Models;

namespace Practica2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }


        [HttpGet("api/products/{offset?}/{limit?}")]
        public List<ProductModel> Get([FromRoute] int offset = 0, [FromRoute] int limit = 100)
        {
            var products = productRepository.GetAll(offset, limit);
            return products.Select(x => new ProductModel(x)).ToList();
        }


        [HttpGet("api/products/{id}")]

        public ProductModel GetById([FromRoute] int id)
        {
            var product = productRepository.GetById(id);

            return new ProductModel(product);
        }

        [HttpGet("category/{id}")]

        public List<ProductModel> Get([FromRoute] int id)
        {
            var products = productRepository.GetByCategoryId(id);
            return products.Select(x => new ProductModel(x)).ToList();
        }

        [HttpPost("")]
        public void Insert([FromBody] ProductModel product)
        {
            var prod = new Product(product.ProductId, product.ProductName, product.ProductPrice, product.CategoryId);

            product.ProductId = productRepository.Insert(prod);


        }


        [HttpPut("{productId}")]
        public void Update([FromRoute] int productId, [FromBody] ProductModel productModel)
        {

            var existingProduct = productRepository.GetById(productId);
            if (existingProduct == null)
            {
                throw new Exception("Produsul nu exista.");
            }

            existingProduct.ProductName = productModel.ProductName;
            existingProduct.ProductPrice = productModel.ProductPrice;
            existingProduct.CategoryId = productModel.CategoryId;
            productRepository.Update(existingProduct);
        }

        [HttpDelete("{productId}")]
        public void Delete([FromRoute] int productId)
        {
            productRepository.Delete(productId);
        }

    }
}
