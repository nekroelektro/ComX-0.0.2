function NekroSlidingBars(config) {
    config.ElementClicked.on('click',
        function () {
            var activeItem = $('.activeSlideItem');
            if (activeItem.length > 0) {
                if (activeItem.is($(this))) {
                    $(this).find(config.ElementForToggle).slideUp('slow');
                    activeItem.removeClass('activeSlideItem', function () {
                        if (config.IsSticky) {
                            $(this).find(config.ElementToStick).unstick();
                        }
                    });
                } else {
                    activeItem.find(config.ElementForToggle).slideUp('slow');
                    activeItem.removeClass('activeSlideItem', function(){
                        if (config.IsSticky) {
                            $(this).find(config.ElementToStick).unstick();
                        }               
                    });

                    $(this).find(config.ElementForToggle).slideDown('slow');
                    $(this).addClass('activeSlideItem', function () {
                        if (config.IsSticky) {
                            $("html, body").animate({ scrollTop: $(this).offset().top - 58 }, 'slow');
                            $(this).find(config.ElementToStick).sticky({ topSpacing: 58, zIndex: 4, widthFromWrapper: true });
                            onStickEvents(activeItem, $(this).find(config.ElementToStick));
                        }                       
                    });
                }
            } else {
                $(this).find(config.ElementForToggle).slideDown('slow');
                $(this).addClass('activeSlideItem', function () {
                    if (config.IsSticky) {
                        $("html, body").animate({ scrollTop: $(this).offset().top - 58 }, 'slow');
                        $(this).find(config.ElementToStick).sticky({ topSpacing: 58, zIndex: 4, widthFromWrapper: true });
                        onStickEvents(activeItem, $(this).find(config.ElementToStick));
                    }
                });
            }
        });

    function onStickEvents(activeItem, element) {
        element.on("sticky-start",
        function () {
            activeItem.find('#sticky-wrapper').css('width', element.width() + 30);
        });
        element.on("sticky-end",
        function () {
            activeItem.find('#sticky-wrapper').css('width', element.width() - 30);
        });
    }
};