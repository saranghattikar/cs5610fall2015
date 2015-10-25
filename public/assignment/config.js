(function(){

	angular
	.module("FormBuilderApp")
	.config(FormBuilderRouteFunction)

	function FormBuilderRouteFunction($routeProvider){
		$routeProvider
		.when("/", {
			templateUrl : "/assignment/home/home.view.html"
			/*redirectTo : "/home"*/
		})
		.when("/home", {
			templateUrl : "/assignment/home/home.view.html"
		})
		.when("/register", {
        			templateUrl : "/assignment/register/register.view.html"
        		})
		.when("/profile", {
        			templateUrl : "/assignment/profile/profile.view.html"
        		})
		.when("/login", {
			templateUrl : "/assignment/login/login.view.html"
		})
		.when("/form", {
			templateUrl : "/assignment/form/form.view.html"
		})
		.when("/admin", {
			templateUrl : "/assignment/admin/admin.view.html"
		})
		.otherwise({
			redirectTo : "/"
		})
	};
})();