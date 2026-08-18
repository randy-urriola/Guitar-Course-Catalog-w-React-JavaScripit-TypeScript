namespace BackendGuitar.Models
{
    public class Guitar
    {
        public int Id { get; set; }
        string Name { get; set; } = string.Empty;
        string Image { get; set; } = string.Empty;
        string Description { get; set; } = string.Empty;
        double Price { get; set; }

    }
}
