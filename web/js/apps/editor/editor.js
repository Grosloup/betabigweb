var app = angular.module("app", []);
app.value("THEMES",[
    {name:"ambiance", id:"ace/theme/ambiance"},
    {name:"chaos", id:"ace/theme/chaos"},
    {name:"chrome", id:"ace/theme/chrome"},
    {name:"clouds", id:"ace/theme/clouds"},
    {name:"clouds midnight", id:"ace/theme/clouds_midnight"},
    {name:"cobalt", id:"ace/theme/cobalt"},
    {name:"crimson editor", id:"ace/theme/crimson_editor"},
    {name:"dawn", id:"ace/theme/dawn"},
    {name:"dreamweaver", id:"ace/theme/dreamweaver"},
    {name:"eclipse", id:"ace/theme/eclipse"},
    {name:"github", id:"ace/theme/github"}

]);
app.factory('EditSession', function() {
    return ace.require("ace/edit_session").EditSession;
});
app.factory("ace", function(){
    return ace.edit("editor");
});

app.factory("editor", function(ace){
    ace.setTheme("ace/theme/solarized_dark");
    ace.setShowInvisibles(true);
    ace.setShowFoldWidgets(true);
    ace.getSession().setMode("ace/mode/html");
    return {
        _editor:ace
    };
});

app.controller("MainCtrl",function($scope,EditSession, editor,THEMES){
    $scope.THEMES = THEMES;
    $scope.settings = {theme:{name:"github", id:"ace/theme/github"}};

    $scope.test = "";
    editor._editor.on("change", function(e){
        $scope.$apply(function(){
            $scope.test = editor._editor.getValue();
        });
    });
    $scope.$watch("test", function(val){
        document.getElementById("editor-result").innerHTML = val;
    });
    $scope.$watch("settings.theme", function(val){
        editor._editor.setTheme(val.id);
    });

    $scope.clear = function(){
        //editor._editor.setValue("");
        editor._editor.setSession(new EditSession(""));
        $scope.test = "";
    };
});
