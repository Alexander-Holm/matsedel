namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string? Notes { get; set; }
        public int Day { get; set; }
        // Använder bara WeekId utan referens till något Week-objekt.
        // Behöver aldrig skicka något objekt så det räcker med id.
        public int WeekId { get; set; }
    }
}
