var dataLoaderRunnerArticle = ['dataLoaderArticle', function (dataLoaderArticle) {
    return dataLoaderArticle();
  }
];

var dataLoaderRunnerUsers = ['dataLoaderUsers', function (dataLoaderUsers) {
    return dataLoaderUsers();
  }
];

var dataLoaderRunnerRoles = ['dataLoaderRoles', function (dataLoaderRoles) {
    return dataLoaderRoles();
  }
];

var dataLoaderRunnerComment = ['dataLoaderComment', function (dataLoaderComment) {
    return dataLoaderComment();
  }
];

var dataLoaderRunnerContact = ['dataLoaderContact', function (dataLoaderContact) {
    return dataLoaderContact();
  }
];

var dataLoaderRunnerCategories = ['dataLoaderCategories', function (dataLoaderCategories) {
    return dataLoaderCategories();
  }
];
var dataLoaderRunnerSign = ['dataLoaderSign', function (dataLoaderSign) {
    return dataLoaderSign();
  }
];
var login={};

angular.module('app_synth', ['ngRoute','ui.router','ui.bootstrap','ngCkeditor','ngSanitize'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('article', {
        url: '/article',
        templateUrl: '/html/article/getIndex.html',
        controller: 'articleCtrl'
      })
      .state('postArticle', {
        url: '/postArticle',
        templateUrl: '/html/article/postArticle.html',
        controller: 'addArticleCtrl'
      })
      .state('sign_up', {
        url: '/sign_up',
        templateUrl: 'html/login/sign_up.html',
        controller: 'sign_upCtrl',
        resolve: {
          data_users: dataLoaderRunnerUsers,
          data_sign: dataLoaderRunnerSign
        }
      })
      .state('moderation', {
        url: '/moderation',
        templateUrl: '/html/admin/moderation.html',
        controller: 'moderationCtrl'
      })
      .state('log_in', {
        url: '/',
        templateUrl: '/html/login/login.html',
        controller: 'loginCtrl'
      })
      .state('user', {
        url: '/user',
        templateUrl: '/html/login/user.html',
        controller: 'userCtrl'
      })
      .state('contact', {
        url:'/contact',
        templateUrl: 'html/contact.html',
        controller: 'contactCtrl'
      })
      .state('infos', {
        url:'/infos',
        templateUrl: '/html/info.html',
        controller: 'infoCtrl'
      })
      .state('admin', {
        url:'/admin',
        templateUrl: 'html/admin/admin.html',
        controller: 'adminGlobalCtrl',
        resolve: {
          data_articles: dataLoaderRunnerArticle,
          data_users: dataLoaderRunnerUsers,
          data_roles: dataLoaderRunnerRoles,
          data_comment: dataLoaderRunnerComment,
          data_contact: dataLoaderRunnerContact,
          data_categories: dataLoaderRunnerCategories,
          data_sign: dataLoaderRunnerSign
        }
      });
/*
    $routeProvider
    .when('/', {
      templateUrl: '/html/login/login.html',
      controller: 'loginCtrl'
    })
    .when('/moderation', {
      templateUrl: '/html/admin/moderation.html',
      controller: 'moderationCtrl'
    })
    .when('/infos', {
      templateUrl: '/html/info.html',
      controller: 'infoCtrl'
    })
    .when('/user', {
      templateUrl: '/html/login/user.html',
      controller: 'userCtrl'
    })
    .when('/article', {
      templateUrl: '/html/article/getIndex.html',
      controller: 'articleCtrl'
    })
    .when('/postArticle', {
      templateUrl: '/html/article/postArticle.html',
      controller: 'addArticleCtrl'
    })

    .when('/contact', {
      templateUrl: 'html/contact.html',
      controller: 'contactCtrl'
    })
    .when('/sign_up', {
      templateUrl: 'html/login/sign_up.html',
      controller: 'sign_upCtrl',
      resolve: {
        data_users: dataLoaderRunnerUsers,
        data_sign: dataLoaderRunnerSign
      }
    })
    .when('/admin', {
      templateUrl: 'html/admin/admin.html',
      controller: 'adminGlobalCtrl',
      resolve: {
        data_articles: dataLoaderRunnerArticle,
        data_users: dataLoaderRunnerUsers,
        data_roles: dataLoaderRunnerRoles,
        data_comment: dataLoaderRunnerComment,
        data_contact: dataLoaderRunnerContact,
        data_categories: dataLoaderRunnerCategories,
        data_sign: dataLoaderRunnerSign
      }
    })
    .otherwise('/');
    
    $locationProvider.html5Mode(true);*/
  })

.service('dataLoaderArticle', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/article' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderSign', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/sign_up' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderUsers', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get('/api/login').then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderComment', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/comment/All' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderContact', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/contact' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderCategories', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/categories' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderRoles', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/roles' ).then(function (res) {
        return res.data;
      });
    }
  };
});