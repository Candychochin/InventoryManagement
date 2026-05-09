let items = [
    // {
        
    //     name: 'Apple',
    //     image: 'https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg' ,
    //     price: 400,
    //     quantity: 2,
        
    // } ,
    

]

function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }
}

// Load items when the script is loaded
loadItems();
