namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mig3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Series", "Description", c => c.String());
            AddColumn("dbo.Series", "SortCode", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Series", "SortCode");
            DropColumn("dbo.Series", "Description");
        }
    }
}
