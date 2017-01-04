namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class np0201 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "IsDiary", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Images", "IsDiary");
        }
    }
}
