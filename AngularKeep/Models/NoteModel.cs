using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularKeep.Models
{
    [Table("Note")]
    public class NoteModel
    {
        [Key]
        public int NoteId { get; set; }

        public DateTime Date { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }
    }
}
