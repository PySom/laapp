using AutoMapper;
using LAAPI.Data;
using LAAPI.Models;
using LAAPI.Repositories;
using LAAPI.Repositories.Generics.Classes;
using LAAPI.Repositories.Generics.Interfaces;
using LAAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Text;

namespace LAAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration[AppConstant.Secret]));
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //Validate credentials
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true,
                        //set valid params
                        ValidIssuer = Configuration[AppConstant.Issuer],
                        ValidAudience = Configuration[AppConstant.Audience],
                        IssuerSigningKey = securityKey
                    };
                });

            services.AddTransient<IModelManager<ApplicationUser>, ModelManager<ApplicationUser>>();
            services.AddTransient<IModelManager<Confession>, ModelManager<Confession>>();
            services.AddTransient<IModelManager<Deanery>, ModelManager<Deanery>>();
            services.AddTransient<IModelManager<Donation>, ModelManager<Donation>>();
            services.AddTransient<IModelManager<Donor>, ModelManager<Donor>>();
            services.AddTransient<IModelManager<Mass>, ModelManager<Mass>>();
            services.AddTransient<IModelManager<News>, ModelManager<News>>();
            services.AddTransient<IModelManager<Occasion>, ModelManager<Occasion>>();
            services.AddTransient<IModelManager<Parish>, ModelManager<Parish>>();
            services.AddTransient<IModelManager<Quote>, ModelManager<Quote>>();
            services.AddTransient<IModelManager<Reflection>, ModelManager<Reflection>>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<IEmailSenderCustom, EmailSender>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<AuthRepository>();
            services.AddTransient<AccountRepository>();

            services.AddAutoMapper(typeof(Startup));
            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",  new Info { Title = "GovCheck API", Version = "v1" });
            });
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
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
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "GovCheck API V1");
            });
            app.UseAuthentication();
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
