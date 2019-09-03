function RedeemPoint(Point, Timestamp) {
	eval(`localStorage.redeempoint_${Timestamp} = '{IsLoading: true, Success: false}'`);
	$.post('https://alatulis.com/modules/loyaltyrewardpoints/ajax.php?route=lrpfrontcheckoutcontroller&rand=' + Timestamp, {
		action: "processredeempoints",
		points: Point
	}).done(function (res) {
		eval(`localStorage.redeempoint_${Timestamp} = '{IsLoading: false, Success: true}'`);
	})
		.fail(function (res) {
			eval(`localStorage.redeempoint_${Timestamp} = '{IsLoading: false, Success: false}'`);
		})
}

function ClearRedeemPoint(Timestamp) {
	eval(`localStorage.clearredeempoint_${Timestamp} = '{IsLoading: true, Success: false}'`);
	$.post('https://alatulis.com/modules/loyaltyrewardpoints/ajax.php?route=lrpfrontcheckoutcontroller&rand=' + Timestamp, {
		action: "processclearpoints"
	}).done(function (res) {
		eval(`localStorage.clearredeempoint_${Timestamp} = '{IsLoading: false, Success: true}'`);
	})
		.fail(function (res) {
			eval(`localStorage.clearredeempoint_${Timestamp} = '{IsLoading: false, Success: false}'`);
		})
}

function Login(Email, Password, Timestamp) {
	eval(`localStorage.login_${Timestamp} = '{IsLoading: true, Success: false}'`);

	$.ajax({
		url: 'https://alatulis.com/login',
		data: {
			'email': Email,
			'password': Password,
			submitLogin: 1
		},
		type: "POST",
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('upgrade-insecure-requests', '1');
			xhr.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;');
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		},
		success: function (res) {
			var IsAuthenticated = res.indexOf('"isLogged":true') >= 0 ? true : false;
			eval(`localStorage.login_${Timestamp} = '{IsLoading: false, Success: ${IsAuthenticated}}'`);
		},
		error: function () {
			Login(Email, Password, Timestamp);
		}
	});
}

function Register(Gender, Firstname, Lastname, Email, Password, Timestamp) {
	eval("localStorage.register_" + Timestamp + " = '{IsLoading: true, Success: false}'");
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
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('ContentType', 'application/x-www-form-urlencoded');
		},
		success: function (res) {
			var IsAuthenticated = res.indexOf('"isLogged":true') >= 0 ? true : false;
			eval(`localStorage.register_${Timestamp} = '{IsLoading: false, Success: ${IsAuthenticated}}'`);
		},
		error: function () {
			$.get('https://alatulis.com/akun-saya', function (res) {
				var IsAuthenticated = res.indexOf('"isLogged":true') >= 0 ? true : false;
				eval(`localStorage.register_${Timestamp} = '{IsLoading: false, Success: ${IsAuthenticated}}'`);
			});
		}
	});
}

function Cart(Timestamp) {
	eval("localStorage.cart_" + Timestamp + "=''");

	$.post('https://alatulis.com/keranjang-belanja?rand=' + Timestamp, {
		"ajax": 1,
		"action": "update"
	}, function (res) {
		var result = JSON.parse(res);
		eval("localStorage.cart_" + Timestamp + "='" + JSON.stringify(result.cart) + "'");
	});
}

function AddToCart(ProductId, Quantity, Timestamp) {
	eval("localStorage.cart_" + Timestamp + "=''");
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?rand=" + Timestamp,
		data: {
			"token": prestashop.static_token,
			"id_product": ProductId,
			"id_customization": "0",
			"qty": Quantity,
			"add": "1",
			"action": "update"
		},
		type: "POST",
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('accept', 'application/json');
		},
		success: function (res) {
			var result = JSON.parse(res);
			eval("localStorage.cart_" + Timestamp + "='" + JSON.stringify(result.cart) + "'");
		}
	});
}

function QuantityUp(ProductId, Timestamp) {
	eval("localStorage.cart_qty_" + Timestamp + "=''");
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?update=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token + "&op=up",
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('accept', 'application/json');
		},
		success: function (res) {
			var result = JSON.parse(res);
			eval("localStorage.cart_qty_" + Timestamp + "='" + JSON.stringify(result.cart) + "'");
		}
	});
}

function QuantityDown(ProductId, Timestamp) {
	eval("localStorage.cart_qty_" + Timestamp + "=''");
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?update=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token + "&op=down",
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('accept', 'application/json');
		},
		success: function (res) {
			var result = JSON.parse(res);
			eval("localStorage.cart_qty_" + Timestamp + "='" + JSON.stringify(result.cart) + "'");
		}
	});
}

function DeleteFromCart(ProductId, Timestamp) {
	eval("localStorage.cart_qty_" + Timestamp + "=''");
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja?delete=1&id_product=" + ProductId + "&id_product_attribute=0&token=" + prestashop.static_token,
		data: {
			"ajax": "1",
			"action": "update"
		},
		type: "POST",
		method: 'POST',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('accept', 'application/json');
		},
		success: function (res) {
			var result = JSON.parse(res);
			eval("localStorage.cart_qty_" + Timestamp + "='" + JSON.stringify(result.cart) + "'");
		}
	});
}

function GetCustomerPoint() {
	if (localStorage.customer_point === null || localStorage.customer_point === undefined)
		localStorage.customer_point = "";

	$.get("https://alatulis.com/module/loyaltyrewardpoints/customeraccount", function (res) {
		var Point = $(res).find('#lrp-customer-account .points-card span:first').text();
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
	localStorage.wishlist = '';
	$.get('https://alatulis.com/module/blockwishlist/mywishlist', function (res) {
		var wishlist = [];
		var $table = $(res).find('#block-history table');
		$table.find('tbody tr').each(function (i, tr) {
			var name = $(tr).find('td').eq(0).text().trim();
			var quantity = parseInt($(tr).find('td').eq(1).text().trim());
			var seen = parseInt($(tr).find('td').eq(2).text().trim());
			var created_at = $(tr).find('td').eq(3).text().trim();
			var is_default = $(tr).find('td').eq(5).find('.is_wish_list_default').length > 0;

			wishlist.push({
				name: name,
				quantity: quantity,
				seen: seen,
				created_at: created_at,
				is_default: is_default
			});
		});

		localStorage.wishlist = JSON.stringify(wishlist);
	}).fail(function () {
		localStorage.wishlist = '[]';
	});
}

function GetWishlistDetail(WishlistId) {
	eval("localStorage.wishlist_" + WishlistId + " = ''");
	$.get(`https://alatulis.com/modules/blockwishlist/managewishlist.php?rand=${Date.now()}&id_wishlist=${WishlistId}&refresh=false&`, function (res) {
		var products = [];
		var $ul = $(res).find('ul.wlp_bought_list');
		$ul.find('li').each(function (i, li) {
			var $id = $(li).attr('id').split('_')[1];
			products.push({ id: $id });
		});

		eval("localStorage.wishlist_" + WishlistId + " = '" + JSON.stringify(products) + "'");
	}).fail(function () {
		eval("localStorage.wishlist_" + WishlistId + " = '[]'");
	});
}

function SetDefaultWishlist(WishlistId) {
	eval(`localStorage.default_wishlist_${WishlistId} = '{IsLoading: true, Success: false}'`);
	$.post(`https://alatulis.com/wishlist?rand=${Date.now()}&default=1&id_wishlist=${WishlistId}&myajax=1&action=setdefault`)
		.done(function (res) {
			eval(`localStorage.default_wishlist_${WishlistId} = '{IsLoading: false, Success: true}'`);
		})
		.fail(function (res) {
			eval(`localStorage.default_wishlist_${WishlistId} = '{IsLoading: false, Success: false}'`);
		})
}

function DeleteWishlist(WishlistId) {
	eval(`localStorage.delete_wishlist_${WishlistId} = '{IsLoading: true, Success: false}'`);
	$.post(`https://alatulis.com/wishlist?rand=${Date.now()}&deleted=1&myajax=1&id_wishlist=${WishlistId}&action=deletelist`)
		.done(function (res) {
			eval(`localStorage.delete_wishlist_${WishlistId} = '{IsLoading: false, Success: true}'`);
		})
		.fail(function (res) {
			eval(`localStorage.delete_wishlist_${WishlistId} = '{IsLoading: false, Success: false}'`);
		})
}

function CreateWishlist(Name) {
	var Token = prestashop.token;
	$.post('https://alatulis.com/module/blockwishlist/mywishlist', {
		token: Token,
		name: Name,
		submitWishlist: 'Simpan'
	}, function (res) {
		var $table = $(res).find('#block-history table');
		var isNameFound = false;
		$table.find('tbody tr').each(function (i, tr) {
			var name = $(tr).find('td').eq(0).text().trim();
			if (name == Name) isNameFound = true;
		});

		eval(`localStorage.create_wishlist_${Name} = '{IsLoading: false, Success: ${isNameFound}}'`);
	}).fail(function () {
		eval(`localStorage.create_wishlist_${Name} = '{IsLoading: false, Success: false}'`);
	});
}

function DeleteProductFromWishlist(WishlistId, ProductId) {
	eval(`localStorage.delete_product_wishlist_${WishlistId} = '{IsLoading: true, Success: false}'`);
	$.post(`https://alatulis.com/modules/blockwishlist/managewishlist.php?rand=${Date.now()}&action=delete&id_wishlist=${WishlistId}&id_product=${ProductId}&id_product_attribute=0&quantity=1&priority=1&refresh=true`)
		.done(function (res) {
			var isSuccess = true;
			var $ul = $(res).find('ul.wlp_bought_list');
			$ul.find('li').each(function (i, li) {
				var id = $(li).attr('id').split('_')[1];
				if (id == ProductId) isSuccess = false;
			});
			eval(`localStorage.delete_product_wishlist_${WishlistId} = '{IsLoading: false, Success: ${isSuccess}}'`);
		})
		.fail(function (res) {
			eval(`localStorage.delete_product_wishlist_${WishlistId} = '{IsLoading: false, Success: false}'`);
		})
}

function AddProductToWishlist(WishlistId, ProductId) {
	eval(`localStorage.add_product_wishlist_${WishlistId} = '{IsLoading: true, Success: false}'`);
	$.post(`https://alatulis.com/modules/blockwishlist/cart.php?rand=1567487066161&action=add&id_product=10&quantity=1&token=15fda96f28bfc4864e137cfecb6cc8b3&id_product_attribute=false&id_wishlist=null`)
		.done(function (res) {
			var isSuccess = true;
			var $ul = $(res).find('ul.wlp_bought_list');
			$ul.find('li').each(function (i, li) {
				var id = $(li).attr('id').split('_')[1];
				if (id == ProductId) isSuccess = false;
			});
			eval(`localStorage.add_product_wishlist_${WishlistId} = '{IsLoading: false, Success: ${isSuccess}}'`);
		})
		.fail(function (res) {
			eval(`localStorage.add_product_wishlist_${WishlistId} = '{IsLoading: false, Success: false}'`);
		})
}

console.log("alatulis.js is loaded.");