using System.Data.Entity.Migrations;
using ComX_0._0._2.Database;

namespace ComX_0._0._2.Migrations.DatabaseMigrations {
    internal sealed class Configuration : DbMigrationsConfiguration<SiteDbContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Migrations/DatabaseMigrations";
        }

        protected override void Seed(SiteDbContext context) {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}