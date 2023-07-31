using Microsoft.Extensions.DependencyInjection;
using Practica2023.Business.Contracts;
using Practica2023.Data.Repositories;
using System.Runtime.CompilerServices;

namespace Practica2023.Data
{
    public static class DataConfig
    {
        public static void ApplyServices(this IServiceCollection services)
        {
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
        }
    }
}