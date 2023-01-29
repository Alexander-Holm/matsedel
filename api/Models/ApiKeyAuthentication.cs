using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Models
{
    [AttributeUsage(AttributeTargets.Class |AttributeTargets.Method)]
    public class ApiKeyAuthentication : Attribute, IAsyncActionFilter
    {
        private const string headerAttribute = "api-key";
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            string? apiKey = Environment.GetEnvironmentVariable("ApiKey");
            var header = context.HttpContext.Request.Headers;
            bool foundKey = header.TryGetValue(headerAttribute, out var inputKey);
            if(foundKey == false || apiKey != inputKey)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            await next();
        }
    }
}
