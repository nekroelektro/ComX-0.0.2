namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial9 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Comics");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Comics",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                        Completed = c.Boolean(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Series = c.String(),
                        Distributor = c.String(nullable: false),
                        Language = c.String(nullable: false),
                        Rating = c.Int(),
                        DateModified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
