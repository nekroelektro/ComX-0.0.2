namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class np0202 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "IsDiary", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Comments", "IsDiary");
        }
    }
}
