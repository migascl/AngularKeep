using AngularKeep.Models;
using AngularKeep.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AngularKeep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _task;

        public TaskController(ITaskRepository task)
        {
            _task = task ??
                throw new ArgumentNullException(nameof(task));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get([FromQuery] TaskParameters taskParams)
        {
            var result = await _task.GetTasks(taskParams);
            if (result == null)
            {
                return NotFound();
            }
            if (!result.Any())
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("{TaskId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(int TaskId)
        {
            var result = await _task.GetTaskById(TaskId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(TaskModel task)
        {
            var result = await _task.PostTask(task);
            return CreatedAtAction(nameof(Get), result);
        }

        // Update Notes
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(TaskModel task)
        {
            var result = await _task.PutTask(task);
            return Ok(result);
        }

        [HttpDelete("{TaskId}")]
        public JsonResult Delete(int TaskId)
        {
            var result = _task.DeleteTask(TaskId);
            return new JsonResult(result);
        }
    }
}
