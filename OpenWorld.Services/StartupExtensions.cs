using Microsoft.Extensions.DependencyInjection;
using OpenWorld.Services.Interfaces.StateManagers;
using OpenWorld.Services.Services.StateManagers;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Services
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddOpenWorldServices(this IServiceCollection services)
        {
            services.AddSingleton<IPlayerStateManager, PlayerStateManager>();

            return services;
        }
    }
}
