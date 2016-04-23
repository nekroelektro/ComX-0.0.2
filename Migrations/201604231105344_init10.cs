namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init10 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Articles", "UserId", c => c.Guid(nullable: false));
            AddColumn("dbo.Articles", "CategoryId", c => c.Guid(nullable: false));
            AddColumn("dbo.Articles", "Category_CategoryId", c => c.Guid(nullable: false));
            AddColumn("dbo.Articles", "Category_Name", c => c.String());
            AddColumn("dbo.Articles", "Category_Description", c => c.String());
            CreateIndex("dbo.Articles", "UserId");
            AddForeignKey("dbo.Articles", "UserId", "dbo.Users", "Id", cascadeDelete: true);
            DropColumn("dbo.Articles", "Category");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Articles", "Category", c => c.String());
            DropForeignKey("dbo.Articles", "UserId", "dbo.Users");
            DropIndex("dbo.Articles", new[] { "UserId" });
            DropColumn("dbo.Articles", "Category_Description");
            DropColumn("dbo.Articles", "Category_Name");
            DropColumn("dbo.Articles", "Category_CategoryId");
            DropColumn("dbo.Articles", "CategoryId");
            DropColumn("dbo.Articles", "UserId");
        }
    }
}
