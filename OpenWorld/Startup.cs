using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenWorld.Data.DataContext;
using OpenWorld.Services;
using OpenWorld.Services.Hubs;
using OpenWorld.Services.Interfaces.StateManagers;

namespace OpenWorld
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<OpenWorldDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultSqlConnection")));

            services.AddOpenWorldServices();

            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:8080"));

            app.UseHttpsRedirection();
            app.UseSignalR(routes =>
            {
                routes.MapHub<PlayerEventHub>("/PlayerEvents");
            });
            app.UseMvc();

            var serviceScope = app.ApplicationServices.CreateScope();
            var hub = serviceScope.ServiceProvider.GetRequiredService<IPlayerStateManager>();
        }
    }
}
