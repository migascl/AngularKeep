public class TaskParameters
{
    public int PageSize = 25;
    public int PageNumber { get; set; } = 1;
    /*
    const int maxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10; // Default page size
    public int PageSize
    {
        get
        {
            return _pageSize;
        }
        set
        {
            _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
    }
    */
}