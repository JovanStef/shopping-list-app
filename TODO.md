create redux store
connect to firebase database
build UI with static data

I need to create models and api services for the following enteties:
shoping-list , shoping-item, group, category.
Models:
Models should contain interface and a class that will implement it
Shopping-list:
id:number,
name:string,
items:number[] // ids of items
Shopping-item:
id:number,
name:string,
active:boolean
Group:
id:name,
items:number[] // ids of items
Category:
id:name,
items:number[] // ids of items
Services:
Generic API service in the shared folder with basic crud operations
Api service for each entity that inherits from the generic api service with endpoint url override
Util service with sort, filter, find and transform methods for each entity

        {

"shoppingList": [{
"id": 1,
"name": "Weekly Groceries",
"items": [1, 2, 3, 4, ..., 40]
}],
"shoppingItems": [
{ "id": 1, "name": "Milk", "active": true },
{ "id": 2, "name": "Bread", "active": false },
{ "id": 3, "name": "Eggs", "active": true },
{ "id": 4, "name": "Apples", "active": true },
{ "id": 5, "name": "Cheese", "active": false },
{ "id": 6, "name": "Butter", "active": true },
{ "id": 7, "name": "Yogurt", "active": false },
{ "id": 8, "name": "Bananas", "active": true },
{ "id": 9, "name": "Chicken Breast", "active": true },
{ "id": 10, "name": "Rice", "active": false },
{ "id": 11, "name": "Pasta", "active": true },
{ "id": 12, "name": "Tomatoes", "active": true },
{ "id": 13, "name": "Potatoes", "active": false },
{ "id": 14, "name": "Onions", "active": true },
{ "id": 15, "name": "Carrots", "active": false },
{ "id": 16, "name": "Lettuce", "active": true },
{ "id": 17, "name": "Cereal", "active": true },
{ "id": 18, "name": "Orange Juice", "active": false },
{ "id": 19, "name": "Coffee", "active": true },
{ "id": 20, "name": "Tea", "active": false },
{ "id": 21, "name": "Sugar", "active": true },
{ "id": 22, "name": "Salt", "active": true },
{ "id": 23, "name": "Pepper", "active": false },
{ "id": 24, "name": "Ketchup", "active": true },
{ "id": 25, "name": "Mustard", "active": false },
{ "id": 26, "name": "Cooking Oil", "active": true },
{ "id": 27, "name": "Flour", "active": false },
{ "id": 28, "name": "Baking Powder", "active": true },
{ "id": 29, "name": "Chocolate", "active": true },
{ "id": 30, "name": "Cookies", "active": false },
{ "id": 31, "name": "Chips", "active": true },
{ "id": 32, "name": "Frozen Pizza", "active": false },
{ "id": 33, "name": "Ice Cream", "active": true },
{ "id": 34, "name": "Water Bottles", "active": true },
{ "id": 35, "name": "Soda", "active": false },
{ "id": 36, "name": "Beer", "active": true },
{ "id": 37, "name": "Wine", "active": false },
{ "id": 38, "name": "Toilet Paper", "active": true },
{ "id": 39, "name": "Paper Towels", "active": false },
{ "id": 40, "name": "Dish Soap", "active": true }
],

"groups": [
{ "id": 1, "name": "Dairy & Eggs", "items": [1, 3, 5, 7, 9, 11, 13, 15] },
{ "id": 2, "name": "Bakery", "items": [2, 6, 10, 14, 18, 22, 26, 30] },
{ "id": 3, "name": "Produce", "items": [4, 8, 12, 16, 20, 24, 28, 32] },
{ "id": 4, "name": "Pantry", "items": [17, 19, 21, 23, 25, 27, 29, 31] },
{ "id": 5, "name": "Beverages", "items": [33, 34, 35, 36, 37, 38, 39, 40] }
],
"categories": [
{ "id": 1, "name": "Organic", "items": [4, 8, 12, 16, 20] },
{ "id": 2, "name": "Frozen", "items": [5, 9, 13, 17, 21] },
{ "id": 3, "name": "Snacks", "items": [2, 6, 10, 14, 18] },
{ "id": 4, "name": "Drinks", "items": [33, 34, 35, 36, 37, 38, 39, 40] },
{ "id": 5, "name": "Household", "items": [19, 23, 27, 31] }
]
}
itemId:groupId
1:1,
3:1,
5:1

1. I need to create a floating side menu (bottom right corner) that when clicked will have options for creating: shopping list , shopping item, group, category that will invoke the respective modal.

2. i need to create a modal/component for creating a shopping list that will consist of a form with inputs for: name. this component needs to live in the shopping list domain.

3. i need to create a modal/component for creating a category that will consist of a form with inputs for: name. this component needs to live in the category domain.

4. i need to create a modal/component for creating a group that will consist of a form with inputs for: name. this component needs to live in the group domain

5. i need to create a modal/component for creating a shopping item that will consist of a form with inputs for: name and a dropdown for group listing all groups , and a dropdown for category listing all the categories. For both group and categories there should be an option "Add new" in the dropdown that will invoke the respective modal. this component needs to live in the shopping item domain.

6. There should be a reusable modal component in the shared domain that will be used by the domain modal components and controlled by a shared modal service that will also live in the shared domain.

The implementation of the modals should be on the layout level and the invocation should be through a dedicated shared service
