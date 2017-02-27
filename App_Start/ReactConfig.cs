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
		        .AddScript("~/Views/Shared/Scripts/Components/SideBar.jsx")
		        .AddScript("~/Views/Shared/Scripts/Components/IndexSlider.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/IndexMain.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/Details.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/LastFromCategory.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/Comments.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/Diaries.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/NavigationMenu.jsx")
                .AddScript("~/Views/Shared/Scripts/Components/Categories.jsx");

        }
    }
}