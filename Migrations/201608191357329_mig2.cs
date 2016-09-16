namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mig2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Series",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Articles", "IndexDescription", c => c.String());
            AddColumn("dbo.Articles", "Series", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Articles", "Series");
            DropColumn("dbo.Articles", "IndexDescription");
            DropTable("dbo.Series");
        }
    }
}
