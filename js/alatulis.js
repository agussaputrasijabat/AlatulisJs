function RedeemPoint(Point) {
	localStorage.redeempoint = `{IsLoading: true, Success: false}`;
	$.post(`https://alatulis.com/modules/loyaltyrewardpoints/ajax.php?route=lrpfrontcheckoutcontroller&rand=` + Date.now(), {
		action: "processredeempoints",
		points: Point
	}).done(function (res) {
		localStorage.redeempoint = `{IsLoading: false, Success: true}`;
	})
		.fail(function (res) {
			localStorage.redeempoint = `{IsLoading: false, Success: false}`;
		})
}

function ClearRedeemPoint() {
	localStorage.clearredeempoint = `{IsLoading: true, Success: false}`;
	$.post(`https://alatulis.com/modules/loyaltyrewardpoints/ajax.php?route=lrpfrontcheckoutcontroller&rand=` + Date.now(), {
		action: "processclearpoints"
	}).done(function (res) {
		localStorage.clearredeempoint = `{IsLoading: false, Success: true}`;
	})
		.fail(function (res) {
			localStorage.clearredeempoint = `{IsLoading: false, Success: false}`;
		})
}

function Login(Email, Password) {
	localStorage.login = `{IsLoading: true, Success: false}`;

	$.ajax({
		url: `https://alatulis.com/login`,
		data: {
			'email': Email,
			'password': Password,
			submitLogin: 1
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`upgrade-insecure-requests`, `1`);
			xhr.setRequestHeader(`accept`, `text/html,application/xhtml+xml,application/xml;`);
			xhr.setRequestHeader(`content-type`, `application/x-www-form-urlencoded`);
		},
		success: function (res) {
			var IsAuthenticated = res.indexOf(`"isLogged":true`) >= 0 ? true : false;
			localStorage.login = `{IsLoading: false, Success: ${IsAuthenticated}}`;
		},
		error: function () {
			Login(Email, Password);
		}
	});
}

function Register(Gender, Firstname, Lastname, Email, Password) {
	localStorage.register = `{IsLoading: true, Success: false}`;
	$.ajax({
		url: "https://alatulis.com/login?create_account=1",
		data: {
			"id_customer": "",
			"id_gender": Gender,
			"firstname": Firstname,
			"lastname": Lastname,
			"email": Email,
			"password": Password,
			"submitCreate": "1"
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`ContentType`, `application/x-www-form-urlencoded`);
		},
		success: function (res) {
			var IsAuthenticated = res.indexOf(`"isLogged":true`) >= 0 ? true : false;
			localStorage.register = `{IsLoading: false, Success: ${IsAuthenticated}}`;
		},
		error: function () {
			$.get(`https://alatulis.com/akun-saya`, function (res) {
				var IsAuthenticated = res.indexOf(`"isLogged":true`) >= 0 ? true : false;
				localStorage.register = `{IsLoading: false, Success: ${IsAuthenticated}}`;
			});
		}
	});
}

function Cart() {
	localStorage.cart = ``;

	$.post(`https://alatulis.com/keranjang-belanja?rand=${Date.now()}`, {
		"ajax": 1,
		"action": "update"
	}, function (res) {
		var result = JSON.parse(res);
		result.cart.products.forEach(product => {
			product.name = product.name.replaceAll('"', "'")
			delete product.embedded_attributes;
		});
		localStorage.cart = `${JSON.stringify(result.cart)}`;
	});
}

function AddToCart(ProductId, Quantity) {
	localStorage.cart = ``;
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?rand=" + Date.now(),
		data: {
			"token": prestashop.static_token,
			"id_product": ProductId,
			"id_customization": "0",
			"qty": Quantity,
			"add": "1",
			"action": "update"
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`accept`, `application/json`);
		},
		success: function (res) {
			var result = JSON.parse(res);
			result.cart.products.forEach(product => {
				product.name = product.name.replaceAll('"', "'")
				delete product.embedded_attributes;
			});
			localStorage.cart = `${JSON.stringify(result.cart)}`;
		}
	});
}

function QuantityUp(ProductId) {
	localStorage.cart_qty = ``;
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?update=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token + "&op=up",
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`accept`, `application/json`);
		},
		success: function (res) {
			var result = JSON.parse(res);
			result.cart.products.forEach(product => {
				product.name = product.name.replaceAll('"', "'")
				delete product.embedded_attributes;
			});
			localStorage.cart_qty = `${JSON.stringify(result.cart)}`;
		}
	});
}

function QuantityDown(ProductId) {
	localStorage.cart_qty = ``;
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?update=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token + "&op=down",
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`accept`, `application/json`);
		},
		success: function (res) {
			var result = JSON.parse(res);
			result.cart.products.forEach(product => {
				product.name = product.name.replaceAll('"', "'")
				delete product.embedded_attributes;
			});
			localStorage.cart_qty = `${JSON.stringify(result.cart)}`;
		}
	});
}

function DeleteFromCart(ProductId) {
	localStorage.cart_qty = ``;
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?delete=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token,
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: `POST`,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(`accept`, `application/json`);
		},
		success: function (res) {
			var result = JSON.parse(res);
			result.cart.products.forEach(product => {
				product.name = product.name.replaceAll('"', "'")
				delete product.embedded_attributes;
			});
			localStorage.cart_qty = `${JSON.stringify(result.cart)}`;
		}
	});
}

function GetCustomerPoint() {
	if (localStorage.customer_point === null || localStorage.customer_point === undefined)
		localStorage.customer_point = "";

	$.get("https://alatulis.com/module/loyaltyrewardpoints/customeraccount", function (res) {
		var Point = $(res).find(`#lrp-customer-account .points-card span:first`).text();
		localStorage.customer_point = Point;
	});
}

function InitCustomerPoint() {
	if (config_wishlist.isLogged) {
		GetCustomerPoint();
		setInterval(function () {
			GetCustomerPoint();
		}, 30 * 1000);
	}
}

function GetWishlists() {
	localStorage.wishlist = ``;
	$.get(`https://alatulis.com/module/blockwishlist/mywishlist`, function (res) {
		var wishlist = [];
		var $table = $(res).find(`#block-history table`);
		$table.find(`tbody tr`).each(function (i, tr) {
			var id = parseInt($(tr).attr(`id`).split(`_`)[1]);
			var name = $(tr).find(`td`).eq(0).text().trim();
			var quantity = parseInt($(tr).find(`td`).eq(1).text().trim());
			var seen = parseInt($(tr).find(`td`).eq(2).text().trim());
			var created_at = $(tr).find(`td`).eq(3).text().trim();
			var is_default = $(tr).find(`td`).eq(5).find(`.is_wish_list_default`).length > 0;

			wishlist.push({
				id: id,
				name: name,
				quantity: quantity,
				seen: seen,
				created_at: created_at,
				is_default: is_default
			});
		});

		localStorage.wishlist = JSON.stringify(wishlist);
	}).fail(function () {
		localStorage.wishlist = `[]`;
	});
}

function GetWishlistDetail(WishlistId) {
	localStorage.wishlist_detail = ``;
	$.get(`https://alatulis.com/modules/blockwishlist/managewishlist.php?rand=${Date.now()}&id_wishlist=${WishlistId}&refresh=false&`, function (res) {
		var products = [];
		var $ul = $(res).find(`ul.wlp_bought_list`);
		$ul.find(`li`).each(function (i, li) {
			var $id = parseInt($(li).attr(`id`).split(`_`)[1]);
			var $qty = parseInt($(li).find('input:first').val());
			products.push({ id: $id, minimal_quantity: $qty });
		});

		localStorage.wishlist_detail = `${JSON.stringify(products)}`;
	}).fail(function () {
		localStorage.wishlist_detail = `[]`;
	});
}

function SetDefaultWishlist(WishlistId) {
	localStorage.default_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/wishlist?rand=${Date.now()}&default=1&id_wishlist=${WishlistId}&myajax=1&action=setdefault`)
		.done(function (res) {
			localStorage.default_wishlist = `{ IsLoading: false, Success: true }`;
		})
		.fail(function (res) {
			localStorage.default_wishlist = `{ IsLoading: false, Success: false }`;
		})
}

function DeleteWishlist(WishlistId) {
	localStorage.delete_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/wishlist?rand=${Date.now()}&deleted=1&myajax=1&id_wishlist=${WishlistId}&action=deletelist`)
		.done(function (res) {
			localStorage.delete_wishlist = `{ IsLoading: false, Success: true }`;
		})
		.fail(function (res) {
			localStorage.delete_wishlist = `{ IsLoading: false, Success: false }`;
		})
}

function CreateWishlist(Name) {
	var Token = prestashop.token;
	localStorage.create_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/module/blockwishlist/mywishlist`, {
		token: Token,
		name: Name,
		submitWishlist: `Simpan`
	}, function (res) {
		var $table = $(res).find(`#block-history table`);
		var isNameFound = false;
		$table.find(`tbody tr`).each(function (i, tr) {
			var name = $(tr).find(`td`).eq(0).text().trim();
			if (name == Name) isNameFound = true;
		});

		localStorage.create_wishlist = `{ IsLoading: false, Success: ${isNameFound}}`;
	}).fail(function () {
		localStorage.create_wishlist = `{ IsLoading: false, Success: false }`;
	});
}

function DeleteProductFromWishlist(WishlistId, ProductId) {
	localStorage.delete_product_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/modules/blockwishlist/managewishlist.php?rand=${Date.now()}&action=delete&id_wishlist=${WishlistId}&id_product=${ProductId}&id_product_attribute=0&quantity=1&priority=1&refresh=true`)
		.done(function (res) {
			var isSuccess = true;
			var $ul = $(res).find(`ul.wlp_bought_list`);
			$ul.find(`li`).each(function (i, li) {
				var id = $(li).attr(`id`).split(`_`)[1];
				if (id == ProductId) isSuccess = false;
			});
			localStorage.delete_product_wishlist = `{ IsLoading: false, Success: ${isSuccess}}`;
		})
		.fail(function (res) {
			localStorage.delete_product_wishlist = `{ IsLoading: false, Success: false }`;
		})
}

function AddProductToWishlist(WishlistId, ProductId) {
	localStorage.add_product_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/modules/blockwishlist/cart.php?rand=${Date.now()}&action=add&id_product=${ProductId}&quantity=1&token=15fda96f28bfc4864e137cfecb6cc8b3&id_product_attribute=false&id_wishlist=${WishlistId}`)
		.done(function (res) {
			var isSuccess = true;
			var $ul = $(res).find(`ul.wlp_bought_list`);
			$ul.find(`li`).each(function (i, li) {
				var id = $(li).attr(`id`).split(`_`)[1];
				if (id == ProductId) isSuccess = false;
			});
			localStorage.add_product_wishlist = `{ IsLoading: false, Success: ${isSuccess}}`
		})
		.fail(function (res) {
			localStorage.add_product_wishlist = `{ IsLoading: false, Success: false }`;
		})
}

function UpdateProductQuantityWishlist(WishlistId, ProductId, Quantity) {
	localStorage.add_product_wishlist = `{ IsLoading: true, Success: false }`;
	$.post(`https://alatulis.com/modules/blockwishlist/managewishlist.php?rand=${Date.now()}&action=update&id_wishlist=${WishlistId}&id_product=${ProductId}&id_product_attribute=0&quantity=${Quantity}&priority=1&refresh=true`)
		.done(function (res) {
			localStorage.add_product_wishlist = `{ IsLoading: false, Success: true}`;
		})
		.fail(function (res) {
			localStorage.add_product_wishlist = `{ IsLoading: false, Success: false }`;
		})
}

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

console.log("alatulis.js is loaded.");