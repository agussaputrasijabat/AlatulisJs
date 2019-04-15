function Login(Email, Password, Timestamp) {
	eval("window.login_" + Timestamp + "='';");

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
			eval("window.login_" + Timestamp + "=" + IsAuthenticated);
		},
		error: function () {
			Login(Email, Password, Timestamp);
		}
	});
}

function Register(Gender, Firstname, Lastname, Email, Password, Timestamp) {
	eval("window.register_" + Timestamp + "=''");
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
			eval("window.register_" + Timestamp + "=" + IsAuthenticated);
		},
		error: function () {
			$.get('https://alatulis.com/akun-saya', function (res) {
				var IsAuthenticated = res.indexOf('"isLogged":true') >= 0 ? true : false;
				eval("window.register_" + Timestamp + "=" + IsAuthenticated);
			});
		}
	});
}

function Cart(Timestamp) {
	eval("window.cart_" + Timestamp + "=''");

	$.post('https://alatulis.com/keranjang-belanja', {
		"ajax": 1,
		"action": "update"
	}, function (res) {
		var result = JSON.parse(res);
		eval("window.cart_" + Timestamp + "=" + JSON.stringify(result.cart));
	});
}

function AddToCart(ProductId, Quantity, Timestamp) {
	eval("window.cart_" + Timestamp + "=''");
	$.ajax({
		url: "https://alatulis.com/keranjang-belanja",
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
			eval("window.cart_" + Timestamp + "=" + JSON.stringify(result.cart));
		}
	});
}

function QuantityUp(ProductId, Timestamp) {
	eval("window.cart_qty_" + Timestamp + "=''");
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
			eval("window.cart_qty_" + Timestamp + "=" + JSON.stringify(result.cart));
		}
	});
}

function QuantityDown(ProductId, Timestamp) {
	eval("window.cart_qty_" + Timestamp + "=''");
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
			eval("window.cart_qty_" + Timestamp + "=" + JSON.stringify(result.cart));
		}
	});
}

function DeleteFromCart(ProductId, Timestamp) {
	eval("window.cart_qty_" + Timestamp + "=''");
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
			eval("window.cart_qty_" + Timestamp + "=" + JSON.stringify(result.cart));
		}
	});
}

function GetCustomerPoint() {
	if (window.customer_point === null || window.customer_point === undefined)
		window.customer_point = "";

	$.get("https://alatulis.com/module/loyaltyrewardpoints/customeraccount", function (res) {
		var Point = $(res).find('#lrp-customer-account .points-card span:first').text();
		window.customer_point = Point;
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


console.log("alatulis.js is loaded.");