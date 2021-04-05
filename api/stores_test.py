import unittest
from test_db import prime_db
from stores import *

class TestStoreAlgorithm(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        prime_db()
    
    def test_get_all_stores(self):
        returnList = list_all_stores()
        print(returnList)
        self.assertEqual(returnList, "[{\"store\": \"Zehrs\"}, {\"store\": \"Walmart\"}, {\"store\": \"Metro\"}]")

if __name__ == '__main__':
    unittest.main()