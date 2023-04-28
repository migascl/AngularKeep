using AngularKeep.Models;

namespace AngularKeep.Repositories
{
    public interface INoteRepository
    {
        Task<IEnumerable<NoteModel>> GetNotes();
        Task<NoteModel> GetNoteById(int NoteId);
        Task<NoteModel> PostNote(NoteModel note);
        Task<NoteModel> PutNote(NoteModel note);
        bool DeleteNote(int NoteId);
    }
}
