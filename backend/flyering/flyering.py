print("Hello world")

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
    def __init__(self):
        self.favourite_stores = []
        self.excluded_stores = []
        self.distance_km = -1.0
        self.location = ""

# Internal representation of the items
# added to a list.
class List_Item:
    def __init__(self):
        self.name = ""
        self.amount = ""
        self.brands = []
        self.tags = []

# Internal representation of the items
# added to a list.
class Shopping_List:
    def __init__(self):
        self.filters = Filter()
        self.list_items = []

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