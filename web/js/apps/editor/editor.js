var app = angular.module("app", []);
app.factory('EditSession', function() {
    return ace.require("ace/edit_session").EditSession;
});
app.factory("ace", function(){
    return ace.edit("editor");
});

app.factory("editor", function(ace){
    ace.setTheme("ace/theme/github");
    ace.getSession().setMode("ace/mode/html");
    return {
        _editor:ace
    };
});

app.controller("MainCtrl",function($scope,EditSession, editor){
    //editor._editor.setValue("blabla!");
    $scope.test = "";
    editor._editor.on("change", function(e){
        $scope.$apply(function(){
            $scope.test = editor._editor.getValue();
        });
    });
    $scope.$watch("test", function(val){
        document.getElementById("editor-preview").innerHTML = val;
    });

    $scope.clear = function(){
        //editor._editor.setValue("");
        editor._editor.setSession(new EditSession(""));
        $scope.test = "";
    };
});

