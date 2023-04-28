using AngularKeep.Models;

namespace AngularKeep.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskModel>> GetTasks(TaskParameters taskParams);
        Task<TaskModel> GetTaskById(int TaskId);
        Task<TaskModel> PostTask(TaskModel task);
        Task<TaskModel> PutTask(TaskModel task);
        bool DeleteTask(int TaskId);
    }
}
