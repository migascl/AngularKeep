using AngularKeep.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AngularKeep.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _dataContext;

        public TaskRepository(DataContext context)
        {
            _dataContext = context ??
                throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<TaskModel>> GetTasks(TaskParameters taskParams)
        {
            return await _dataContext.Set<TaskModel>().Skip((taskParams.PageNumber - 1) * taskParams.PageSize).Take(taskParams.PageSize).ToListAsync();
        }

        public async Task<TaskModel> GetTaskById(int TaskId)
        {
            return await _dataContext.Tasks.FindAsync(TaskId);
        }

        public async Task<TaskModel> PostTask(TaskModel task)
        {
            _dataContext.Tasks.Add(task);
            await _dataContext.SaveChangesAsync();
            return task;
        }

        public async Task<TaskModel> PutTask(TaskModel task)
        {
            _dataContext.Entry(task).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return task;
        }

        public bool DeleteTask(int TaskId)
        {
            var task = _dataContext.Tasks.Find(TaskId);
            if (task != null)
            {
                _dataContext.Entry(task).State = EntityState.Deleted;
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
