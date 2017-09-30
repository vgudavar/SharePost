var app = angular.module('flapperNews',['ui.router']);
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })

      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });
    $urlRouterProvider.otherwise('home');
  }
]);
app.factory('posts', [function(){
      var o = {
        posts: [{title:'Sachin',link:'Dravid',upvotes:100}]
      };
      return o;
}]);
app.controller('MainCtrl',[
  '$scope',
  'posts',
   function($scope, posts){
    $scope.posts = posts.posts;

    $scope.addPost = function(){
       if(!$scope.title || $scope.title===''){ return; }
       $scope.posts.push({
         title: $scope.title,
         link : $scope.link,
         upvotes:0,
         comments:[
           {author: 'Joe', body: 'Cool post!', upvotes: 0},
           {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
         ]
       });
       $scope.link='';
       $scope.title='';
    }

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    }
   }]);
 app.controller('PostsCtrl',[
   '$scope',
   'posts',
   '$stateParams',
   function($scope, posts, $stateParams){
      $scope.post = posts.posts[$stateParams.id];
      $scope.body='';
      $scope.addComment = function(){
         if($scope.body === ''){return;}
         $scope.post.comments.push({
           body: $scope.body,
           author:'user',
           upvotes: 0
         });
         $scope.body='';
      };
   }]);
