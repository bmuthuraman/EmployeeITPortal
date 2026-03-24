CREATE DATABASE EmployeeITPortal;
GO

USE EmployeeITPortal;
GO

CREATE TABLE Requests (
    Id INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(200),
    Description NVARCHAR(MAX),
    Category NVARCHAR(50),
    Priority NVARCHAR(50),
    Status NVARCHAR(50),
    CreatedBy NVARCHAR(100),
    CreatedAt DATETIME
);