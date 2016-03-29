/**
 * Created by mingzhexu on 3/28/16.
 */
(function(){
    angular
        .module("formSortable", [])
        .directive("formSortable", formSortable);

    function formSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var formAxis = attributes.formAxis;
            $(element).sortable({
                axis: formAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                    scope.model.updateOrder(scope.model.formId,scope.model.fields);
                }
            });
        }
        return {
            link: link
        }
    }
})();
