function getSlider (container, {
    pagination: showPagination = true,
    arrows = true,
    timer = true,
    modal = true,

} = {}) {;
    let slides = container.children();
    
    
    let slidesAmount = slides.length;
    let pic = container.find('img:first');
    let oneSlideWidth = pic.width();
    
    let currentSlideIndex = 0;
    let pagination = null;
    
    

    let sliderTrack = $('<div>');
    sliderTrack.addClass('slider-track');
    let sliderTrackWidth = slidesAmount * oneSlideWidth;
    sliderTrack.css('width', sliderTrackWidth);

    
    slides.each(function (slide, el) {
        sliderTrack.append(el);
        
    });

    container.append(sliderTrack);

    if (arrows) {
    createArrows();
    }

    if (showPagination) {
    createPagination();
    }

    if (modal) {
    createModal();
    }

    goToSlide(currentSlideIndex);

    if (timer) {
    createTimer();
    }


    function goToSlide(index) {
        
        currentSlideIndex = (index+slidesAmount)%slidesAmount;

        sliderTrack.css('transform', 'translateX(-'+oneSlideWidth * currentSlideIndex+'px)');
        
        if (showPagination) {
            
            for (i=0;i<pagination.children().length;i++) {
            let el = pagination.children()[i];
            
            if (i === currentSlideIndex) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }

            }
        }

        
    };

    function createArrows() {

        let leftArrow = $('<div>');
        leftArrow.text('<');
        leftArrow.addClass("arrow arrow-left"); 
        container.append(leftArrow);

        let rightArrow = $('<div>', slides);
        rightArrow.text('>');
        rightArrow.addClass("arrow arrow-right"); 
        container.append(rightArrow);

        leftArrow.on('click', function() {
            goToSlide(currentSlideIndex-1);
            
        }); 

        rightArrow.on('click', function() {
            goToSlide(currentSlideIndex+1);
        }); 
    };


    function createPagination() {

        pagination = $('<div>');
        pagination.addClass('pagination');

       slides.each(function (ind,el) {

            let newDot = $('<div>');
            if (ind === currentSlideIndex) {
                newDot.addClass('active');    
            }
            
            newDot.addClass('dot');
            newDot.attr('id', ind);
            pagination.append(newDot);
            

        });
    
        container.append(pagination);
        
        pagination.on('click', function(event) {
    
        let target = Number(event.target.id);

        goToSlide(target);        
});
    }

    function createModal() {

        let modal = $('.modal');

        modal.on('click', function(event) {
    
        let closeBtn = event.target.closest('.modal-close');
        let overlay = event.target.closest('.modal-overlay');
        let modalContent = event.target.closest('.modal-content');

        if (closeBtn) {
            modal.removeClass('open'); 
        }
    
        if (!modalContent && overlay) {
            modal.removeClass('open');
        
        }
    })

        let slider = $('.slider-track');
               
        slider.each(function (ind,el) {

            el.addEventListener('click', function (event) {
    
                let target = event.target;
                let modalBody = $('#modal-body');
        
                    if (target.tagName = 'img') {
                    modal.addClass('open');
        
                    clearBox(modalBody);
                
                    let img = event.target;
                    let clone = img.cloneNode(false)
        
                    modalBody.append(clone);
                }
            });
            
                function clearBox() {
           
                    let modalBody = $('#modal-body');
                    modalBody.text("");
                }

        })
    }

    function createTimer() {
        
        function nextSlide() {
            goToSlide(currentSlideIndex+1);   
        }
        let timer = setInterval(nextSlide,4000);

        let arrows = $('.arrow');
            
            arrows.each(function (i,el) {
                el.addEventListener('click', function() {
                    clearInterval(timer);
                    timer = setInterval(nextSlide,4000);    
                });
            })
        
        let pagination = $('.pagination');
        
            if (showPagination) {
                pagination.on('click', function() {
                clearInterval(timer);
                timer = setInterval(nextSlide,4000);
                });
            }   
        }

}

getSlider($('.slider'));

getSlider($('.slider-two'));



























































