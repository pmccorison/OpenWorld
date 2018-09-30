using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Services
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddOpenWorldServices(this IServiceCollection services)
        {
            return services;
        }
    }
}
