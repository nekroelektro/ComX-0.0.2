using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using ComX_0._0._2.Helpers.SmtpHelpers;

namespace ComX_0._0._2.App_Start
{
    public class AutofacConfig
    {
        public static void RegisterDependencies()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(typeof(mvcappl).Assembly);
            builder.RegisterFilterProvider(); //Inject Properties Into FilterAttributes section of MvcIntegration
            builder.RegisterSource(new ViewRegistrationSource());
            builder.RegisterType<EmailService>().As<IEmailService>();
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

    }
}
