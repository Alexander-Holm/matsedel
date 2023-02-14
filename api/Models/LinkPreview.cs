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
            // Använder h1 istället för og:title.
            // De flesta sidorna lägger till sitt namn efter titeln i og:title,
            // t.ex: Namn På Recept | Hemsida.com
            string? title = doc.DocumentNode.Descendants("h1").FirstOrDefault()?.InnerText;
            // Fallbacks
            title ??= GetOpenGraphProperty("title", doc);
            title ??= doc.DocumentNode.SelectSingleNode("//title").InnerText;
            return title;
        }
        private string? GetDescription(HtmlDocument doc)
        {
            string? description = GetOpenGraphProperty("description", doc);
            // Fallbacks
            if (description == null)
            {
                HtmlNode node = doc.DocumentNode.SelectSingleNode("//meta[@name='description']");
                description = node?.GetAttributeValue("content", "");
            }
            return description;
        }
        private string? GetImage(HtmlDocument doc)
        {
            // Inga fallbacks
            // Det går att loopa genoma alla bilder och gissa vilken som hör till receptet,
            // men det är bättre med ingen bild än fel bild.
            string? imageUrl = GetOpenGraphProperty("image", doc);
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
