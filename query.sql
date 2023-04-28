CREATE TABLE Note (
	NoteId int IDENTITY (0,1) NOT NULL,
	Date datetime NOT NULL,
	Title varchar(100) NULL,
	Content text NOT NULL,
	PRIMARY KEY  (NoteId)
)

CREATE TABLE Task (
	TaskId int IDENTITY (0,1) NOT NULL,
	Date datetime NOT NULL,
	Name varchar(100) NOT NULL,
	DueDate datetime NULL,
	Completed bit NOT NULL,
	PRIMARY KEY (TaskId),
)