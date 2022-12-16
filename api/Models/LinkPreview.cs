using HtmlAgilityPack;

namespace api.Models
{
    public class LinkPreview
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public LinkPreview(HtmlDocument htmlDocument)
        {
            Title = GetTitle(htmlDocument);
            Description = GetDescription(htmlDocument);
            ImageUrl = GetImage(htmlDocument);
        }

        private string GetTitle(HtmlDocument doc)
        {
            HtmlNode node = doc.DocumentNode.SelectSingleNode("//meta[@name='og:title']");
            // fallbacks            
            node ??= doc.DocumentNode.Descendants("h1").First(); // h1 har bättre titel än head/title på koket.se
            node ??= doc.DocumentNode.SelectSingleNode("//title");
            string title = node.InnerHtml;
            return title;
        }
        private string GetDescription(HtmlDocument doc)
        {
            HtmlNode node = doc.DocumentNode.SelectSingleNode("//meta[@name='og:description']");
            node ??= doc.DocumentNode.SelectSingleNode("//meta[@name='description']");
            string description = node.Attributes["content"].Value;
            return description;
        }
        private string GetImage(HtmlDocument doc)
        {
            HtmlNode node = doc.DocumentNode.SelectSingleNode("//meta[@name='og:image']");
            node ??= doc.DocumentNode.SelectSingleNode("//link[@type='image/jpeg']"); // koket.se
            string imageUrl = node.Attributes["href"].Value;
            return imageUrl;
        }
    }

}
