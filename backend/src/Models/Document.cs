namespace Centuri.Demo.Models;

public enum DocumentStatus { Draft, InReview, Approved, Archived }

public class Document
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string Category { get; set; } = "";
    public int Version { get; set; } = 1;
    public DocumentStatus Status { get; set; } = DocumentStatus.Draft;
    public string CreatedBy { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
