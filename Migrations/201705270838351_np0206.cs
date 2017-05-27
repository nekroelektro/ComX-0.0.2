namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class np0206 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "Thread", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Comments", "Thread");
        }
    }
}
