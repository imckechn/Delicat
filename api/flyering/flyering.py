
import json

### REPRESENTATIONS ###################################################
# Data recieved from the frontend
# will be converted into the following
# internal classes for easier handling,
# in case the frontend's representation
# ever changes. That way, updates only
# need to be made in each classes' constructor.

# Internal representation of the filters
# applied druing list creation.
class Filter:
    def __init__(self, fronted_filter):
        self.favourite_stores = fronted_filter.favourite_stores or []
        self.excluded_stores = fronted_filter.excluded_stores or []
        self.distance_km = fronted_filter.distance_km or -1.0
        self.location = fronted_filter.location or ""


# Internal representation of the items
# added to a list.
class List_Item:
    def __init__(self, frontend_item):
        self.name = frontend_item.name or ""
        self.amount = frontend_item.amount or ""
        self.brands = frontend_item.brands or []
        self.tags = frontend_item.tags or []

# Internal representation of the items
# added to a list.
class Shopping_List:
    def __init__(self, frontend_list):
        self.filters = frontend_list.filters
        self.list_items = frontend_list.list_items or []
        convert_filters()
        convert_items()

    def convert_filters():
        self.filters = Filter(self.filters)

    def convert_items():
        for item in self.list_items:
            item = List_Item(item)

# Internal representation of the records
# from the database.
class Record:
    def __init__(self, db_record):
        self.common_name = getattr(db_record, "commonName", "")
        self.brand = getattr(db_record, "brand", "")
        self.full_name = getattr(db_record, "fullName", "")
        self.price = getattr(db_record, "price", float('inf'))
        self.store = getattr(db_record, "store", "")
        self.tags = getattr(db_record, "tags", [])
        self.location = getattr(db_record, "location", "")

    def test(self):
        print("NOPE")

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
        records = query_db(item)
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

def query_db(item):
    # FIXME
    return []

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
    records.sort(key=lambda item: item.amount/item.price, reverse=True)
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
    temp = Record(Empty())
    records = records_to_JSON_list([temp, temp])
    print(records)

run_tests()
### END TESTS ############################################################