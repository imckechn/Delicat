
import json
import os
import sys
import sqlite3
from test_db import create_purrdev_connection, ensure_db

# Function to get all the unique stores from the database
# Returns a list of all the elements
def list_all_stores():
    ensure_db
    conn = create_purrdev_connection()
    conn.row_factory = sqlite3.row
    cur = conn.cursor()
    select_statement = "SELECT DISTINCT store FROM products;"
    
    cur.execute(select_statement)

    rows = cur.fetchall()
    result = []

    for row in rows:
        result.append(Record(dict(row)))
    
    conn.close()

    json_returns = stores_to_JSON(result)

    return json_returns

def stores_to_JSON(store_list):
    json_list = []
    for item in store_list:
        json_list.append(item.__dict__)
    
    return json.dumps(json_list)