window.onload = function() {
    // Your code here
    let product_name, filter, product_card;
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const product_list = document.getElementById("product_list").getElementsByClassName("col")
    // const children1 = product_list.children[0];
    

    searchButton.addEventListener('click', function() {
        filter = searchInput.value.toUpperCase();
        console.log(filter);
        for (i = 0; i < product_list.length; i++) {
            product_card = product_list[i];
            product_name = product_list[i].getElementsByTagName("p")[0].innerText.toUpperCase();
            // console.log(product_card);
            

            
            if (product_name.includes(filter)) {
                product_card.style.display = "block";
            } else {
                product_card.style.display = "none";
            }
    
            
            // console.log(product_list[i].innerHTML);
        }
    })
};