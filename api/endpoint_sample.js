// Here is an example of how to hit the /optimize-list endpoint
// This will be implemented in some sort of utility class on the
// frontend in a future branch. For now, it's here.

let item_1 = {name:"eggs",brands:["Selection"]};
let item_2 = {name:"ground beef",brands:["Average Farms"]};
let params = {filters:{excluded_stores:["Walmart"]}, list_items:[item_1,item_2]};
let data = {shopping_list: params}

fetch('/optimize-list', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});