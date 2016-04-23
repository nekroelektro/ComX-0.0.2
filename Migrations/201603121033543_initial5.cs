namespace ComX_0._0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Articles", "Category", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Articles", "Category");
        }
    }
}
