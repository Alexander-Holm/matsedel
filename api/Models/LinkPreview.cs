using HtmlAgilityPack;

namespace api.Models
{
    // Open Graph meta data
    // https://ogp.me/
    public class LinkPreview
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }

        public LinkPreview(HtmlDocument htmlDocument)
        {
            Title = GetTitle(htmlDocument);
            Description = GetDescription(htmlDocument);
            ImageUrl = GetImage(htmlDocument);
        }

        private string? GetTitle(HtmlDocument doc)
        {
            string? title = GetOpenGraphProperty("title", doc);
            if(title == null)
            {
                // fallbacks 
                HtmlNode node = doc.DocumentNode.Descendants("h1").First(); // h1 har bättre titel än head/title på koket.se
                node ??= doc.DocumentNode.SelectSingleNode("//title");
                title = node?.InnerHtml; // Både <h1> och <title> använder InnerHtml
            }
            return title;
        }
        private string? GetDescription(HtmlDocument doc)
        {
            string? description = GetOpenGraphProperty("description", doc);
            if(description == null)
            {
                HtmlNode node = doc.DocumentNode.SelectSingleNode("//meta[@name='description']");
                description = node?.Attributes["content"].Value;
            }
            return description;
        }
        private string? GetImage(HtmlDocument doc)
        {
            string? imageUrl = GetOpenGraphProperty("image", doc);
            if(imageUrl == null)
            {
                HtmlNode node = doc.DocumentNode.SelectSingleNode("//link[@type='image/jpeg']"); // koket.se
                imageUrl = node?.GetAttributeValue("href", null);
            }
            return imageUrl;
        }

        private string? GetOpenGraphProperty(string property, HtmlDocument htmlDocument)
        {
            HtmlNode node = htmlDocument.DocumentNode.SelectSingleNode($"//meta[@name='og:{property}']");
            node ??= htmlDocument.DocumentNode.SelectSingleNode($"//meta[@property='og:{property}']");
            string? value = node?.GetAttributeValue("content", "");
            return value;
        }
    }
}
