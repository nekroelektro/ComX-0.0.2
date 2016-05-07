namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init13 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ArticleId = c.Guid(nullable: false),
                        ImageUrl = c.String(),
                        DateOfChange = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Images");
        }
    }
}
