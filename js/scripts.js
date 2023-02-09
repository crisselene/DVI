const speed = 20

$(document).on("keypress", function(event){
    console.log(event.keyCode)

    let elem = $("#ghost")
    let position = elem.position()

    switch(event.keyCode){
        case 119:
            if (position.top >= speed)
                elem.css("top", position.top - speed)
            break
        case 97:
            elem.removeClass("right")
            elem.addClass("left")
            if (position.left >= 10)
                elem.css("left", position.left - speed)
          
            break
        case 115:
            if (position.top <= $(window).height() - 50)
                elem.css("top", position.top + 10)
            break
        case 100:
            elem.removeClass("left")
            elem.addClass("right")
            if (position.left <= $(window).width() - 50)
                elem.css("left", position.left + speed)
            break
        default:
            //None
    }
})