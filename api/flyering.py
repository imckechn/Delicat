
import json
import os
import sys
import sqlite3
from test_db import create_purrdev_connection, ensure_db
### REPRESENTATIONS ###################################################
# Data recieved from the frontend
# will be converted into the following
# internal classes for easier handling,
# in case the frontend's representation
# ever changes. That way, updates only
# need to be made in each classes' constructor.

# Internal representation of the filters
# applied druing list creation. Expects a dict.
class Filter:
    def __init__(self, fronted_filter):
        self.favourite_stores = fronted_filter.get("favourite_stores", [])
        self.excluded_stores = fronted_filter.get("excluded_stores", [])
        self.distance_km = fronted_filter.get("distance_km", -1.0)
        self.location = fronted_filter.get("location", "")
        self.items_per_store = fronted_filter.get("items_per_store", 1)
        self.items_fav_store = fronted_filter.get("items_fav_store", 3)


# Internal representation of the items
# added to a list. Expects a dict.
class List_Item:
    def __init__(self, frontend_item):
        self.name = frontend_item.get("name", "")
        self.amount = frontend_item.get("amount", "")
        self.brands = frontend_item.get("brands", [])
        self.tags = frontend_item.get("tags", [])

# Internal representation of the items
# added to a list. Expects a dict.
class Shopping_List:
    def __init__(self, frontend_list):
        self.filters = frontend_list.get("filters", {})
        self.list_items = frontend_list.get("list_items", [])
        self.convert_filters()
        self.convert_items()

    def convert_filters(self):
        self.filters = Filter(self.filters)

    def convert_items(self):
        converted_items = []
        for item in self.list_items:
            converted_items.append(List_Item(item))
        self.list_items = converted_items

# Internal representation of the records
# from the database. Expects a dict input.
class Record:
    def __init__(self, db_record):
        #Must convert from tuple, but tuple may vary...
        # always get full row?
        # convert tuple to dict?
        self.common_name = db_record.get("commonName", "")
        self.brand = db_record.get("brand", "")
        self.full_name = db_record.get("fullName", "")
        self.price = db_record.get("price", float('inf'))
        self.store = db_record.get("store", "")
        self.tags = db_record.get("tags", [])
        self.location = db_record.get("location", "")
        self.amount = db_record.get("amount", 1.0)

### END REPRESENTATIONS #################################################

### ALGORITHM ###########################################################
# Get List from frontend
# Convert frontend list to internal list
# for each list item
    # Query DB by name, excluded stores, brand, tags
    # Filter by distance / location
    # Group by store
    # For each store
        # find "m" cheapest items based on price/amount
    # Combine results from each store
# combine results from each list item
# return list
### END ALGORITHM ########################################################

### IMPLEMENTATION #######################################################
def get_flyer(frontend_list):
    ensure_db()
    internal_list = Shopping_List(frontend_list)
    flyer = []
    for item in internal_list.list_items:
        records = query_db(item, internal_list.filters)
        records = filter_by_distance(records)
        store_records = group_by_store(records)
        records = []

        for store_set in store_records:
            records = records + filter_by_value(store_set, internal_list.filters)
        
        flyer = flyer + records
    
    flyer = records_to_JSON_list(flyer)

    return flyer

def build_condition(general_condition,filter_list):
    condition = ""
    if (filter_list):
        condition = general_condition
        for i in range(1, len(filter_list)):
            condition = condition + "OR" + general_condition
        condition = "AND (" + condition + ") "

    return condition

def query_db(item, filters):
    conn = create_purrdev_connection()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    #name, excluded stores, brand, tags, amount?
    select_statment = "SELECT * FROM products WHERE (commonName=?"
    select_statment = select_statment + build_condition("brand=?", item.brands) + build_condition("store!=?", filters.excluded_stores) + build_condition("tags=?", item.tags) + ")"
    params = tuple([item.name] + item.brands + filters.excluded_stores + item.tags)

    cur.execute(select_statment, params)

    rows = cur.fetchall()
    result = []

    for row in rows:
        result.append(Record(dict(row)))

    conn.close

    return result

def filter_by_distance(records):
    return records

def group_by_store(records):
    store_map = set(map(lambda x:x.store, records))
    new_list = []
    for store in store_map:
        new_list.append([item for item in records if item.store == store])

    return new_list

def filter_by_value(records, filters):
    max = filters.items_per_store
    if (len(records) and records[0].store in filters.favourite_stores ):
        max = filters.items_fav_store

    records.sort(key=lambda item: item.price/item.amount if (item.price != 0 and item.amount != 0) else float('inf'))

    if(len(records) > max):
        records = records[:max]

    return records

def records_to_JSON_list(flyer):
    json_list = []
    for item in flyer:
        json_list.append(item.__dict__)

    return json.dumps(json_list)

### END IMPLEMENTATION ###################################################
