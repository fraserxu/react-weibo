// Adds filters to app
angular.module('hn', ['filters']);


// Controller for displaying top 30 HN Posts

function TopListCtrl($scope, $http) {
  $http.jsonp('https://api.weibo.com/2/statuses/friends_timeline.json?callback=JSON_CALLBACK&access_token=').success(function(data) {
    $scope.statuses = data.data.statuses;
  });
}



// This filters module takes a URL and splits it up into its hostname

angular.module('filters', []).
filter('userURL', function() {
  return function(text, length, end) {
    return 'http://weibo.com/' + text
  };
}).
filter('fromDate', function() {
  return function(text, length, end) {
    return moment(text).fromNow()
  };
}).
filter('userSource', function() {
  return function(text, length, end) {
    return text.replace(/<[^>]+?>/g,"")
  };
});