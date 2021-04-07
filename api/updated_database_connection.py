import mysql.connector
from mysql.connector import Error
import pandas as pd


# Making the server connection
def create_server_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection

#Make a query to the database
def read_query(query):
    connection = create_server_connection("35.193.28.6", "root", "1234", "products")
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as err:
        print(f"Error: '{err}'")


question = """SELECT * FROM foods"""

results = read_query(question)

try:
    for result in results:
        print(result)

    print("Completed")
except:
    print("FAILED")