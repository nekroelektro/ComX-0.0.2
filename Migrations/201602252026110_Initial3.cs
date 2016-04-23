namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Comics", "Rating", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Comics", "Rating", c => c.Int(nullable: false));
        }
    }
}
