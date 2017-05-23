namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class np0205 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserMessages", "Thread", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserMessages", "Thread");
        }
    }
}
