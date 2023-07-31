using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023.Business.Domain
{
    public class Category
    {
        public Category(int categoryId, string name, string description)
        {
            CategoryId = categoryId;
            Name = name;
            Description = description;
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
