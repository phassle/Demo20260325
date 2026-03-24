namespace Centuri.Demo.Models;

public enum AuditType { Internal, External }
public enum AuditStatus { Planned, InProgress, Completed }

public class Audit
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public AuditType Type { get; set; } = AuditType.Internal;
    public AuditStatus Status { get; set; } = AuditStatus.Planned;
    public string AuditorName { get; set; } = "";
    public string Department { get; set; } = "";
    public DateTime ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public int Findings { get; set; }
}
