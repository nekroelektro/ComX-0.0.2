using System;
using System.Linq.Expressions;
using System.Net;
using System.Web.Mvc;
using ComX_0._0._2.Models;
using GridMvc.Html;
using GridMvc.Sorting;

namespace ComX_0._0._2.Helpers
{
    public static class ControlsHelper{
        public static MvcHtmlString Custom_DivFor<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression, string additionalViewData)
        {
            var fieldName = ExpressionHelper.GetExpressionText(expression);
            var fieldBindingName = helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(fieldName);
            var fieldId = TagBuilder.CreateSanitizedId(fieldBindingName);

            var metadata = ModelMetadata.FromLambdaExpression(expression, helper.ViewData);
            var value = metadata.Model;

            TagBuilder constructedOutput = new TagBuilder("div");
            constructedOutput.Attributes.Add("name", fieldBindingName);
            constructedOutput.Attributes.Add("id", fieldId);
            constructedOutput.Attributes.Add("class", additionalViewData);
            constructedOutput.Attributes.Add("value", value == null ? "" : WebUtility.HtmlDecode(value.ToString()));

            var validationAttributes = helper.GetUnobtrusiveValidationAttributes(fieldBindingName, metadata);
            foreach (var key in validationAttributes.Keys)
            {
                constructedOutput.Attributes.Add(key, validationAttributes[key].ToString());
            }

            return new MvcHtmlString(constructedOutput.ToString());
        }
    }
}