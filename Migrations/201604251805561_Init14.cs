namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init14 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "Caption", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Images", "Caption");
        }
    }
}
