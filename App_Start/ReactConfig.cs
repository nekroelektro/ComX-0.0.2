using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ComX_0._0._2.ReactConfig), "Configure")]

namespace ComX_0._0._2
{
	public static class ReactConfig
	{
		public static void Configure()
		{
		    ReactSiteConfiguration.Configuration
		        .SetReuseJavaScriptEngines(true)
		        .AddScript("~/Views/Shared/Scripts/Components/Global/SearchPanel.jsx")
		        .AddScript("~/Views/Shared/Scripts/Components/Global/SubCategoryPanel.jsx")

                .AddScript("~/Views/Shared/Scripts/Components/SideBar.jsx")
		        .AddScript("~/Views/Shared/Scripts/Components/IndexSlider.jsx")
		        .AddScript("~/Views/Shared/Scripts/Components/NavigationMenu.jsx")

                .AddScript("~/Views/Articles/Scripts/Components/IndexMain.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/Details.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/LastFromCategory.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/Comments.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/Diaries.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/Categories.jsx")
                .AddScript("~/Views/Articles/Scripts/Components/SearchResults.jsx")
		        .AddScript("~/Views/Articles/Scripts/Components/Edit.jsx")

                .AddScript("~/Views/Account/Scripts/Components/LoginPanel.jsx")
                .AddScript("~/Views/Account/Scripts/Components/RegisterPanel.jsx")
                .AddScript("~/Views/Account/Scripts/Components/UserPanel.jsx")
                .AddScript("~/Views/Account/Scripts/Components/PrivateMessages.jsx");

        }
    }
}