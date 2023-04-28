using AngularKeep.Models;
using AngularKeep.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AngularKeep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _note;

        public NoteController(INoteRepository note)
        {
            _note = note ??
                throw new ArgumentNullException(nameof(note));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get()
        {
            var result = await _note.GetNotes();
            if (result == null) {
                return NotFound();
            }
            if (!result.Any())
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("{NoteId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(int NoteId)
        {
            var result = await _note.GetNoteById(NoteId);

            if (result == null)
            {
                return NotFound("Note not found!");
            }

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(NoteModel note)
        {
            var result = await _note.PostNote(note);
            return CreatedAtAction(nameof(Get), result);
        }

        // Update Notes
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(NoteModel note)
        {
            var result = await _note.PutNote(note);
            return Ok(result);
        }

        [HttpDelete("{NoteId}")]
        public JsonResult Delete(int NoteId)
        {
            var result = _note.DeleteNote(NoteId);
            return new JsonResult(result);
        }
    }
}
