namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init12 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Body = c.String(),
                        UserId = c.Guid(nullable: false),
                        ArticleId = c.Guid(nullable: false),
                        DateOfCreation = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Comments");
        }
    }
}
