using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practica2023.Business.Contracts;
using Practica2023.Business.Domain;
using Practica2023.Models;

namespace Practica2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpGet("{offset?}/{limit?}")]
        public List<CategoryModel> Get([FromRoute] int offset = 0, [FromRoute] int limit = 100, [FromQuery] string sortOrder = "ASC")
        {
            var validSortOrders = new[] { "ASC", "DESC" };
            if (!validSortOrders.Contains(sortOrder.ToUpper()))
            {
                     throw new ArgumentException("Invalid sortOrder.");
            }

            var categories = categoryRepository.GetAll(offset, limit, sortOrder);
            return categories.Select(x => new CategoryModel(x)).ToList();
        }


        [HttpGet("{id}")]

        public CategoryModel? GetById([FromRoute] int id)
        {
            var category = categoryRepository.GetById(id);


            return new CategoryModel(category);
        }
        [HttpGet("name/{name}")]

        public int GetId([FromRoute] string name)
        {
            var categoryId = categoryRepository.GetId(name);


            return categoryId;
        }

        [HttpPost("")]
        public void Insert([FromBody] CategoryModel category)
        {
            var cat = new Category(category.CategoryId, category.Name, category.Description);

            category.CategoryId = categoryRepository.Insert(cat);
            

        }
        [HttpPut("{categoryId}")]
        public void Update([FromRoute] int categoryId, [FromBody] CategoryModel categoryModel)
        {
            
            var existingCategory = categoryRepository.GetById(categoryId);
            if (existingCategory == null)
            {
                throw new Exception("Categoria nu exista.");
            }

            existingCategory.Name = categoryModel.Name;
            existingCategory.Description = categoryModel.Description;

            categoryRepository.Update(existingCategory);
        }

        [HttpDelete("{categoryId}")]
        public void Delete([FromRoute] int categoryId)
        {
            categoryRepository.Delete(categoryId);
        }
        [HttpGet("paginated")]
        public ActionResult<IEnumerable<CategoryModel>> GetPaginated([FromQuery] int page = 1, [FromQuery] int itemsPerPage = 100, [FromQuery] string sortOrder = "ASC")
        {
            try
            {
                var validSortOrders = new[] { "ASC", "DESC" };
                if (!validSortOrders.Contains(sortOrder.ToUpper()))
                {
                    return BadRequest("Invalid sortOrder.");
                }

                if (page <= 0 || itemsPerPage <= 0)
                {
                    return BadRequest("Invalid page or itemsPerPage values. They should be positive integers.");
                }

                var categories = categoryRepository.GetCategoriesPaginated(page, itemsPerPage, sortOrder);

                return categories.Select(x => new CategoryModel(x)).ToList();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving paginated categories.");
            }
        }
    }
}
