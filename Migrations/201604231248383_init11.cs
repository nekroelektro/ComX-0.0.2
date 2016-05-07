namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init11 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Articles", "UserId", "dbo.Users");
            DropIndex("dbo.Articles", new[] { "UserId" });
            CreateTable(
                "dbo.ArticleCategories",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropColumn("dbo.Articles", "Category_CategoryId");
            DropColumn("dbo.Articles", "Category_Name");
            DropColumn("dbo.Articles", "Category_Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Articles", "Category_Description", c => c.String());
            AddColumn("dbo.Articles", "Category_Name", c => c.String());
            AddColumn("dbo.Articles", "Category_CategoryId", c => c.Guid(nullable: false));
            DropTable("dbo.ArticleCategories");
            CreateIndex("dbo.Articles", "UserId");
            AddForeignKey("dbo.Articles", "UserId", "dbo.Users", "Id", cascadeDelete: true);
        }
    }
}
