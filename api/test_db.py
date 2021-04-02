import sqlite3
from sqlite3 import Error
import json
import os
from pathlib import Path

def get_dir_path():
    return os.path.dirname(os.path.realpath(__file__))

def get_purrdev_path():
    return Path(get_dir_path() + "/purrdev.db")

def get_data_path():
    return Path(get_dir_path() + "/data.json")

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)

    return conn

def create_purrdev_connection():
    return create_connection(get_purrdev_path())

def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def db_test():
    # create a database connection
    database = r"C:\sqlite\db\pythonsqlite.db"
    conn = create_connection(database)

    sql_create_projects_table = """ CREATE TABLE IF NOT EXISTS projects (
                                        id integer PRIMARY KEY,
                                        name text NOT NULL,
                                        begin_date text,
                                        end_date text
                                    ); """

    sql_create_tasks_table = """CREATE TABLE IF NOT EXISTS tasks (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    priority integer,
                                    status_id integer NOT NULL,
                                    project_id integer NOT NULL,
                                    begin_date text NOT NULL,
                                    end_date text NOT NULL,
                                    FOREIGN KEY (project_id) REFERENCES projects (id)
                                );"""

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_projects_table)

        # create tasks table
        create_table(conn, sql_create_tasks_table)

        conn.close()
    else:
        print("Error! cannot create the database connection.")

def insert_product(conn, product):
    sql = ''' INSERT INTO products(commonName,brand,fullName,price,store,tags)
              VALUES(?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, product)
    conn.commit()
    return cur.lastrowid

def prime_db():
    # Delete the DB if it already exists
    database = get_purrdev_path()

    if os.path.exists(database):
        os.remove(database)
    conn = create_connection(database)

    sql_create_products_table = """ CREATE TABLE IF NOT EXISTS products (
                                        id integer PRIMARY KEY,
                                        commonName text NOT NULL,
                                        brand text NOT NULL,
                                        fullName text NOT NULL,
                                        price real NOT NULL,
                                        store text NOT NULL,
                                        tags text
                                    ); """
    # create tables
    if conn is not None:
        create_table(conn, sql_create_products_table)
        prime_file = get_data_path()

        with open(prime_file, 'r') as myfile:
            data = myfile.read()
            obj = json.loads(data)
            
            for product in obj:
                json_list = (product['commonName'], product['brand'], product['fullName'], product['price'] ,product['store'], json.dumps(product['tags']))
                insert_product(conn, json_list)

        conn.close()

    else:
        print("Error! cannot create the database connection.")

def ensure_db():
    database = get_purrdev_path()

    if (not os.path.exists(database)):
        prime_db()

# Note, :memory: as the directory to create in RAM
if __name__ == '__main__':
    prime_db()

"""
Traceback (most recent call last):
  File "/Users/annie/Documents/react-projects/delicat-clone/Delicat/api/api_tests.py", line 15, in setUpClass
    prime_db()
  File "/Users/annie/Documents/react-projects/delicat-clone/Delicat/api/test_db.py", line 102, in prime_db
    with open(prime_file, 'r') as myfile:
FileNotFoundError: [Errno 2] No such file or directory: '/Users/annie/Documents/react-projects/delicat-clone/Delicat/api\\..\\data.json'
"""