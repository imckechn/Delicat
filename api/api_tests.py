import unittest
from test_db import prime_db
from flyering import *

#### UNIT TESTS FOR FLYERING ALGORITHM
# This test suite primes the test db then performs
# tests on the flyering algorithm. It tests some of the
# important internal functions, as well as the final
# user-facing function that is called when hitting
# the corresponding "optimize" endpoint
class TestFlyeringAlgorithm(unittest.TestCase):
    # Make sure we have a DB
    @classmethod
    def setUpClass(cls):
        prime_db()

    # Make sure the same stores actually get grouped together
    def test_group_by_store(self):
        records = []
        for x in range(0, 15):
            temp = Record({"store":x%3, "amount":"15"})
            records.append(temp)

        records = group_by_store(records)

        for group in records:
            for i in range(0, len(group)):
                self.assertEqual(group[0].store, group[i].store)

    # Make sure the best value items are chosen, and we choose the right amount
    def test_filter_by_value(self):
        filters = Filter({})
        records = []
        for i in range(0, 100):
            for j in range(0, 100):
                temp = Record({"amount": i, "price":100-j, "store": "Walmart"})
                records.append(temp)
        
        records = filter_by_value(records, filters)

        for i in range(0, len(records)):
            self.assertEqual(records[i].amount, 99 - i)
            self.assertEqual(records[i].price, 1)
        
        self.assertEqual(len(records), filters.items_per_store)

    # Make sure the final result is sensible json
    def test_records_to_JSON_list(self):
        
        temp = Record({"fullName":"bob"})
        jstring = records_to_JSON_list([temp, temp])
        records = json.loads(jstring)
        self.assertEqual(records[0]["full_name"],"bob")
        self.assertEqual(records[1]["full_name"],"bob")

    # Make sure we can make sensible queries to the DB
    def test_query_item(self):
        item= List_Item({"name":"eggs"})
        filters= Filter({})
        rows = query_db(item, filters)
        for row in rows:
            self.assertEqual(row.common_name, "eggs")

    # Test the user-facing functionality
    def test_get_flyer(self):
        item_1 = {"name":"eggs","brands":["Selection"]}
        item_2 = {"name":"ground beef","brands":["Average Farms"]}
        response = get_flyer({"filters":{"excluded_stores":["Walmart"]}, "list_items":[item_1,item_2]})
        response = json.loads(response)

        for item in response:
            self.assertNotEqual(item["store"], "Walmart")
            self.assertTrue(item["common_name"] == "eggs" or item["common_name"]  == "ground beef")

            if(item["common_name"] == "ground beef"):
                self.assertEqual(item["brand"], "Average Farms")
            else:
                self.assertEqual(item["brand"],"Selection")

if __name__ == '__main__':
    unittest.main()
