using Practica2023.Business.Domain;

namespace Practica2023.Models
{
    public class CategoryModel
    {
        public CategoryModel() { }  
        public CategoryModel(Category entity) {
        
            CategoryId= entity.CategoryId;
            Name = entity.Name;
            Description= entity.Description;
        }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
