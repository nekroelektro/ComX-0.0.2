using System.Web.Optimization;

namespace ComX_0._0._2 {
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new StyleBundle("~/Content/customStyles").Include(
                "~/Content/Site.css",
                "~/Content/CustomControls.css",
                "~/Views/Shared/Styles/_Layout.css",
                "~/Views/Articles/Styles/Diary.css",
                "~/Content/horizontalMenu.css",
                "~/Views/Shared/Styles/_IndexSlider.css",
                "~/Views/Shared/Styles/_SideBar.css",
                "~/Views/Shared/Styles/_TopLogoPanel.css",
                "~/Views/Shared/Styles/_TopNavigationMenu.css",
                "~/Views/Account/Styles/Login.css",
                "~/Views/Account/Styles/Register.css",
                "~/Views/Account/Styles/UserPanel.css",
                "~/Views/Articles/Styles/_Articles.css",
                "~/Views/Articles/Styles/_Comments.css",
                "~/Views/Articles/Styles/_LastFromCategory.css",
                "~/Views/Articles/Styles/Index.css",
                "~/Views/Articles/Styles/Categories.css",
                "~/Views/Articles/Styles/Details.css",
                "~/Views/Articles/Styles/_TopDetailPanel.css",
                "~/Views/Articles/Styles/Diary.css",
                "~/Views/Articles/Styles/Edit.css"
                ));

            bundles.Add(new StyleBundle("~/Content/coreStyles").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/Gridmvc.css",
                "~/Content/slick-theme.css",
                "~/Content/slick.css",
                "~/Content/magnific-popup.css",
                "~/Content/jquery.fancybox.css",
                "~/Content/jquery-ui.min.css"));

            bundles.Add(new ScriptBundle("~/scripts/customScripts").Include(
                "~/Scripts/NekroSearch.js",
                "~/Scripts/NekroSub.js",
                "~/Views/Shared/Scripts/SharedLayout.js",
                "~/Views/Shared/Scripts/SharedTopNavigationMenu.js",
                "~/Views/Shared/Scripts/SharedIndexSlider.js",
                "~/Views/Shared/Scripts/SharedSideBar.js",
                "~/Views/Shared/Scripts/SharedTopLogoPanel.js",
                "~/Views/Account/Scripts/AccountUserPanel.js",
                "~/Views/Articles/Scripts/Articles.js",
                "~/Views/Articles/Scripts/ArticlesComments.js",
                "~/Views/Articles/Scripts/ArticlesIndex.js",
                "~/Views/Articles/Scripts/ArticlesDelete.js",
                "~/Views/Articles/Scripts/ArticlesDetails.js",
                "~/Views/Articles/Scripts/ArticlesTopDetailPanel.js",
                "~/Views/Articles/Scripts/ArticleDiary.js",
                "~/Views/Articles/Scripts/ArticlesSearchResults.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/coreScripts").Include(
                "~/Scripts/modernizr-2.8.3.js",
                "~/Scripts/jquery-3.1.1.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/jquery.validate.min.js",
                "~/Scripts/jquery.validate.unobtrusive.min.js",
                "~/Scripts/jquery.unobtrusive-ajax.min.js",
                "~/Scripts/gridmvc.min.js",
                "~/Scripts/jquery.pajinate.min.js",
                "~/Scripts/imagesloaded.pkgd.min.js",
                "~/Scripts/slick.min.js",
                "~/Scripts/jquery.magnific-popup.min.js",
                "~/Scripts/cbpHorizontalMenu.min.js",
                "~/Scripts/jquery.sticky.js",
                "~/Scripts/jquery.fancybox.pack.js",
                "~/Scripts/jquery-ui.min.js",
                "~/scripts/ckeditor.js"
                ));

            BundleTable.EnableOptimizations = true;
        }
    }
}