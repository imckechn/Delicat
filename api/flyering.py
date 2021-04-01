
import json
import os
import sys
import sqlite3

dir_path = os.path.dirname(os.path.realpath(__file__)) + r"\..\\"
sys.path.append(dir_path)

from db_test import create_purrdev_connection
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
    internal_list = Shopping_List(frontend_list)
    flyer = []
    for item in internal_list.list_items:
        records = query_db(item, internal_list.filters)
        records = filter_by_distance(records)
        store_records = group_by_store(records)
        records = []

        for store_set in store_records:
            records = records + filter_by_value(store_set)
        
        flyer = flyer + records
        # TODO Add DB record class
    
        # get from DB by name, excluded stores, brand, tags
        # Filter by distance
        # group results by store
    
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
    # FIXME
    """
    Query tasks by priority
    :param conn: the Connection object
    :param priority:
    :return:
    """
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

def filter_by_value(records):
    max = 3
    records.sort(key=lambda item: item.price/item.amount if (item.price != 0 and item.amount != 0) else float('inf'))
    new_list = records[:max]
    return new_list

def records_to_JSON_list(flyer):
    json_list = []
    for item in flyer:
        json_list.append(item.__dict__)

    return json.dumps(json_list)

### END IMPLEMENTATION ###################################################

### TESTS ################################################################
class Empty:
    def __init__(self):
        self = self
    
    def print_self(self):
        print(self.__dict__)

def run_tests():
    print("STARTING TESTS")
    test_group_by_store()
    test_filter_by_value()
    test_records_to_JSON()
    test_query_item()
    test_get_flyer()
    print("FINISHED TESTS")

def test_group_by_store():
    records = []
    for x in range(0, 15):
        temp = Empty()
        temp.store = x % 3
        temp.other = x
        temp.print_self()
        print(temp)
        records.append(temp)

    records = group_by_store(records)

    for group in records:
        print("[")
        for item in group:
            item.print_self()
        print("],")

def test_filter_by_value():
    records = []
    for i in range(0, 100):
        for j in range(0, 100):
            temp = Empty()
            temp.amount = i
            temp.price = 100 - j
            records.append(temp)
    
    records = filter_by_value(records)
    for item in records:
        item.print_self()

def test_records_to_JSON():
    temp = Record({})
    temp = Record({"fullName":"bob"})
    records = records_to_JSON_list([temp, temp])
    print(records)

def test_query_item():
    item= List_Item({"name":"eggs"})
    filters= Filter({})
    rows = query_db(item, filters)
    for row in rows:
        print(row.__dict__)

def test_get_flyer():
    item_1 = {"name":"eggs","brands":["Selection"]}
    item_2 = {"name":"ground beef","brands":["Average Farms"]}
    response = get_flyer({"filters":{"excluded_stores":["Walmart"]}, "list_items":[item_1,item_2]})
    print(response)

#run_tests()
### END TESTS ############################################################