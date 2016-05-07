namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init15 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "Source", c => c.Binary());
            AddColumn("dbo.Images", "FileName", c => c.String());
            AddColumn("dbo.Images", "FileFormat", c => c.String());
            AddColumn("dbo.Images", "FileSize", c => c.Int(nullable: false));
            AddColumn("dbo.Images", "OriginalWidth", c => c.Int(nullable: false));
            AddColumn("dbo.Images", "OriginalHeight", c => c.Int(nullable: false));
            DropColumn("dbo.Images", "Caption");
            DropColumn("dbo.Images", "ImageUrl");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Images", "ImageUrl", c => c.String());
            AddColumn("dbo.Images", "Caption", c => c.String());
            DropColumn("dbo.Images", "OriginalHeight");
            DropColumn("dbo.Images", "OriginalWidth");
            DropColumn("dbo.Images", "FileSize");
            DropColumn("dbo.Images", "FileFormat");
            DropColumn("dbo.Images", "FileName");
            DropColumn("dbo.Images", "Source");
        }
    }
}
