namespace Centuri.Demo.Models;

public enum DeviationSeverity { Low, Medium, High, Critical }
public enum DeviationStatus { Open, InProgress, Resolved, Closed }

public class Deviation
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public DeviationSeverity Severity { get; set; } = DeviationSeverity.Low;
    public DeviationStatus Status { get; set; } = DeviationStatus.Open;
    public string ReportedBy { get; set; } = "";
    public string AssignedTo { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}
