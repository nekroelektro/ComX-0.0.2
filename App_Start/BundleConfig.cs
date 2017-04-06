using System.Web.Optimization;

namespace ComX_0._0._2 {
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new StyleBundle("~/Content/customStyles").Include(
                "~/Content/Site.css",
                "~/Content/CustomControls.css",
                "~/Views/Shared/Styles/_Layout.css",
                "~/Views/Articles/Styles/Diary.css",
                "~/Content/horizontalMenu.css"));

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
                "~/Views/Shared/Scripts/SharedTopNavigationMenu.js"
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
                "~/Scripts/jquery-ui.min.js"
                ));

            BundleTable.EnableOptimizations = true;
        }
    }
}