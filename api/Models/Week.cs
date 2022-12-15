using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Week
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Recipe> Recipes { get; set; }

        public Week(string name)
        {
            Name = name;
            Recipes = new List<Recipe>();
        }
    }
}
