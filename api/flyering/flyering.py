
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
    return "FIXME"
### END IMPLEMENTATION ###################################################