let animItems = document.querySelectorAll('.bio, .photo, .friend, .social-medias, .video-fragments, .belch, .bullying, .games');

if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(){
        for(let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top; 
            const animStart = 6;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('block_active');
            } else {
                animItem.classList.remove('block_active');
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}
