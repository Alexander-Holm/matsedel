using api.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkPreviewController : ControllerBase
    {
        private readonly HtmlWeb htmlFetcher = new HtmlWeb();

        // GET: api/LinkPreview/https://www.koket.se/pasta-salsiccia-classico
        [HttpGet("{url}")]
        public async Task<ActionResult<LinkPreview>> GetLinkPreview(string url)
        {
            // För att skicka url måste vissa tecken tas bort
            // https://www.koket.se/pasta-salsiccia-classico 
            // blir : "https:%2F%2Fwww.koket.se%2Fpasta-salsiccia-classico"
            // UrlDecode lägger tillbaka tecknen så att länken fungerar
            url = HttpUtility.UrlDecode(url);
            HtmlDocument htmlDocument = await htmlFetcher.LoadFromWebAsync(url);
            return new LinkPreview(htmlDocument);
        }        
    }
}
