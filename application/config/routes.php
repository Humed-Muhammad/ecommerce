<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/

//user product routes
$route['api/add-cart'] = 'api/EcommersController/addCartItems';
$route['api/delete-cart'] = 'api/EcommersController/deleteCart';
$route['api/delete-all-cart'] = 'api/EcommersController/deleteAllCart';
$route['api/home'] = 'api/EcommersController/home';
$route['api/category'] = 'api/EcommersController/category';
$route['api/get-all-category'] = 'api/EcommersController/getAllCategory';


//orders routes
$route['api/order'] = 'api/EcommersController/order';
$route['api/check-product-quantity'] = 'api/EcommersController/checkProductQuantity';

//cart routes
$route['api/quantity-cart'] = 'api/EcommersController/cartQuantity';
$route['api/price-cart'] = 'api/EcommersController/cartPrice';
$route['api/get-cart'] = 'api/EcommersController/getAllCart';


//admin routes
$route['api/add_major'] = 'api/AdminController/majorCategory';
$route['api/get-product-price'] = 'api/AdminController/getProductPrice';
$route['api/delete-product'] = 'api/AdminController/deleteProduct';
$route['api/get-all-products'] = 'api/AdminController/getAllProducts';
$route['api/add-product'] = 'api/AdminController/add';
$route['api/edit-product'] = 'api/AdminController/editProduct';
$route['api/get-order-by-type'] = 'api/AdminController/get_orderByType';
$route['api/get-all-order'] = 'api/AdminController/getAllOrders';
$route['api/get-user-order'] = 'api/AdminController/getUserOrders';
$route['api/add_category'] = 'api/AdminController/addcategories';
$route['api/change-order-status'] = 'api/AdminController/changeOrderStatus';



//user routes
$route['api/signup'] = 'api/UserController/signup';
$route['api/login'] = 'api/UserController/login';
$route['api/change-profile'] = 'api/UserController/changeProfile';
$route['api/pass_user'] = 'api/UserController/passUser';

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

