namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mig4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SiteSettings",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        IsMaintenance = c.Boolean(nullable: false),
                        Quote = c.String(),
                        Playlist = c.String(),
                        JumboIndexText = c.String(),
                        CommentsAvailable = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SiteSettings");
        }
    }
}
