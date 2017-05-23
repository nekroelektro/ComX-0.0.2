namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class np0204 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserMessages",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        UserFrom = c.Guid(nullable: false),
                        UserTo = c.Guid(nullable: false),
                        Title = c.String(),
                        Body = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        IsReceived = c.Boolean(nullable: false),
                        IsSystem = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserMessages");
        }
    }
}
