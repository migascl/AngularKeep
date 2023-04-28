using AngularKeep.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularKeep.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly DataContext _dataContext;

        public NoteRepository(DataContext context)
        {
            _dataContext = context ??
                throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<NoteModel>> GetNotes()
        {
            return await _dataContext.Notes.ToListAsync();
        }

        public async Task<NoteModel> GetNoteById(int NoteId)
        {
            return await _dataContext.Notes.FindAsync(NoteId);
        }

        public async Task<NoteModel> PostNote(NoteModel note)
        {
            _dataContext.Notes.Add(note);
            await _dataContext.SaveChangesAsync();
            return note;
        }

        public async Task<NoteModel> PutNote(NoteModel note)
        {
            _dataContext.Entry(note).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return note;
        }

        public bool DeleteNote(int NoteId)
        {
            var note = _dataContext.Notes.Find(NoteId);
            if (note != null)
            {
                _dataContext.Entry(note).State = EntityState.Deleted;
                _dataContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}
