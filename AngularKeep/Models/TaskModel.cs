using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularKeep.Models
{
    [Table("Task")]
    public class TaskModel
    {
        [Key]
        public int TaskId { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        public DateTime? DueDate { get; set; }

        public bool Completed { get; set; }

    }
}
