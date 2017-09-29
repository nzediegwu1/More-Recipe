/// <reference path="jquery.js" />
/// <reference path="bootstrap.js" />
$(document).ready(() => {
    const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer posuere erat a ante...Functionally, class is little more than syntactic
        sugar over the prototype-based behavior delegation capabilities we've had all along.
        This article will take a close look at the basic use of ES2015's class keyword, from
        the perspective of its relation to prototypes.
        We'll cover: Defining and instantiating classes; Creating subclasses with extends
        super calls from subclasses; and Examples of important symbol methods.
        Along the way, we'll pay special attention to how class maps to prototype-based`;

    $('.edit').click(() => {
        $('#modalTitle').text('Edit Recipe');
        $('#recipeName').val('African Royal Dish');
        $('#ingredients').val('Oil, Beans, Potato, Plantain, Maggi, Vegetable');
        $('#description').val(description);
    });

    $('#createRecipe').click(() => {
        $('#modalTitle').text('Create Recipe');
        $('#recipeName,#ingredients,#description').val('');
    });
    $('.uploader').click(() => {
        $('.file-upload').click();
    });
});
