$("#boton").on("mouseover", function(event){
       
    move(this)

})

function fade(t){
    $(t).prop("disabled", true)
    $(t).fadeOut(500)
}

function propagate(t){
    $(t).hide()

    const id  = setInterval(interval, 20)
    let i = 0
    function interval(){
        if (i == 100){
            clearInterval(id)
        }
        else{
            i++
            let elem = $('<button id="otro" class="btn btn-primary">SI</button>')
            $("#div").append(elem)
            move(elem)
        }
    }
}

function size(t){

    let elem = $(t)
    const id  = setInterval(interval, 20)
    let i = 0
    function interval(){
        if (i == 17){
            clearInterval(id)
            elem.hide()
        }
        else{
            i++
            let width = elem.css("width")
            let height = elem.css("height")

            let x = Number(width.slice(0, width.length - 2)) - 2
            let y = Number(height.slice(0, height.length - 2)) - 1

            elem.css("width", x)
            elem.css("height", y)
        }
    }
}

function move(t){
    let elem = $(t)
    let position = elem.offset()

    let x = Math.random() * ($(window).width() - 50) + 20
    let y = Math.random() * ($(window).height() - 50) + 20

    elem.css("position", "absolute")
    elem.css("top", y)
    elem.css("left", x)
}

function fall(t){

    let elem = $(t)
    let bottom = $(window).height()

    let offset = elem.offset()
    
    elem.css("position", "absolute").css("left", offset.left).css("top", offset.top)
    
    const id  = setInterval(interval, 20)

    function interval(){
        if (offset.top >= bottom){
            clearInterval(id)
            elem.hide()
        }
        else{
            offset.top += 10
            elem.css("top", offset.top)
        }
    }

    

}

$("#div").on("click", "#otro", function(event){
    alert("Ahora ya somos novios!!!")
})