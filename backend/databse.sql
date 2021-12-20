just text

-- \c move into a database  here you can use the CREATE...see line 3 onwards don't forget the ;
-- \l show all tables in that database
-- \dt show tables
-- \x expanded display is on ( after the user pw is created with salt)
-- \d lists the tables with the name of the table ie Login_page
-- \d+ shows the table and the column information used as above. 
-- Adding a new column  ALTER TABLE table_name
--ADD COLUMN column_name data_type constraint ,
--ALTER [ COLUMN ] column_name { SET | DROP } NOT NULL
--postgreSQL adds the column to the end, you cannot specify.
-- uuid-ossp to be installed into postgreSQL  


--to install UUID Functionality into your psql server 
-- login as postgres -> psql -U postgres
-- see if uuid-ossp is installed -> SELECT * FROM pg_extension; if not 
-- CREATE EXTENSION "uuid-ossp";  and verify  (see last command above)
--https://medium.com/@willcbarnes/adding-uuid-functionality-to-your-psql-server-uuid-ossp-e92abb6ba496 valid DEC16 2021

--i dropped the not null in username, password and email inorder to find this problem.