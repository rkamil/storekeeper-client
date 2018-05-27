var apiURL = 'http://127.0.0.1:5000';

// wczytanie wszystkich produktów
function fetchAll(cb, err) {
	
	fetch(apiURL + '/all')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			cb(data)
		})
		.catch(function (error) {
			if (err != null)
				return err(error);
		});
	
}

// wczytanie jednego produktu
function fetchOne(product, cb, err) {
	
	fetch(apiURL + '/product/' + product)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			cb(data)
		})
		.catch(function (error) {
			if (err != null)
				return err(error);
		});
	
}

// wczytanie wszystkich kategorii
function fetchCategories(cb, err) {
	
	fetch(apiURL + '/category')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			cb(data)
		})
		.catch(function (error) {
			if (err != null)
				return err(error);
		});
		
}

// wczytanie produktów z danej kategorii
function fetchCategory(category, cb, err) {
	
	fetch(apiURL + '/category/products/' + category)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			cb(data)
		})
		.catch(function (error) {
			if (err != null)
				return err(error);
		});
		
}



// wczytanie wszystkich produktów
fetchAll(viewProducts, function (err) {
	console.log(err);
});

// wczytanie kategorii
fetchCategories(viewCategories, function (err) {
	console.log(err);
});



// wyświetlenie kategorii
function viewCategories(categories) {
	var el = document.getElementById('categories');
	el.innerHTML = '';
	
	// dodanie "wszystkie produkty"
	var li = document.createElement('li'),
		a = document.createElement('a');
		
	li.classList.add('category');
	a.href = '#';
	a.innerText = 'Wszystkie produkty';
	
	a.addEventListener('click', function (e) {
		hideHighlight();
		li.classList.add('choosed');
		
		fetchAll(viewProducts, function (err) {
			console.log(err);
		});
	});
	
	li.appendChild(a);
	el.appendChild(li);
	
	var categoriesEl = categories.map(function (category) {
		var li = document.createElement('li'),
			a = document.createElement('a');
		
		li.classList.add('category');
		a.href = '#';
		a.innerText = category.name;
		
		a.addEventListener('click', function (e) {
			hideHighlight();
			li.classList.add('choosed');
			
			fetchCategory(category.id, viewProducts, function (err) {
				console.log(err);
			});
		});
		
		li.appendChild(a);
		
		return li;
		
	});
	
	categoriesEl.forEach(function (categoryEl) {
		el.appendChild(categoryEl);
	});
}

// wyświetlenie podanych produktów
function viewProducts(products) {
	var el = document.getElementById('products');
	el.innerHTML = '';
	
	var productsEl = products.map(function (product) {
		
		var a = document.createElement('a'),
			div = document.createElement('div'),
			img = document.createElement('img'),
			p = document.createElement('p');
			
		a.href = '#';
		div.classList.add('each-product');
		img.src = "assets/product.jpg";
		img.alt = product.name;	
		p.innerText = product.name;
		
		div.appendChild(img);
		div.appendChild(p);
		a.appendChild(div);
		
		var productInfo = '<h1 class="product-name">' + product.name + '</h1><p class="product-info">' + product.desc + '</p>';
		
		a.addEventListener('click', function (e) {
			
			uglipop({class: 'product-modal',
					source: 'html',
					content: productInfo
			});
			
		});
		
		return a;
	});
	
	productsEl.forEach(function (productEl) {
		el.appendChild(productEl);
	});
}

function hideHighlight() {
	var categories = document.getElementsByClassName('category');
	
	for (var i = 0; i < categories.length; i++) {
		categories[i].classList.remove('choosed');
	}
}
