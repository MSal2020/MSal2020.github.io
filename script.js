gsap.registerPlugin(ScrollTrigger)
/*
gsap.from('.logo div',{
    opacity:0,
    delay:1,
    x:20
} )
*/
const menu_items = document.querySelector('.navigation__list')
gsap.from(menu_items.children ,{
    opacity:0,
    x:0,
    duration:1,
    delay:1.5,
    stagger:{
        amount:1
    }
})


gsap.utils.toArray('.star').forEach(star=>{
    gsap.fromTo(star,{
        rotation:450,
        opacity:0,
        y:100
    },{
        rotation:0,
        opacity:1,
        y:0,
        duration:1,
        delay:1.5,
        scrollTrigger:star
    })
})


gsap.utils.toArray('.title').forEach(title=>{
    gsap.fromTo(title,{
        letterSpacing:'10px',
        opacity:0,
        x:300,
        skewX:65
    },{
        letterSpacing:'0',
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:title
    })
})
//Make the list items appear one by one
const list_items = document.querySelectorAll('.skill-li')
list_items.forEach((item,index)=>{
    gsap.fromTo(item,{
        opacity:0,
        y:300,
        skewX:65
    },{
        opacity:1,
        y:0,
        skewX:0,
        duration:1,
        delay:.5 + index * .5,
        scrollTrigger:item
    })
})
gsap.utils.toArray('.course_list').forEach(course_list=>{
    gsap.fromTo(course_list,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:course_list

    })
})

gsap.utils.toArray('p').forEach(p=>{
    gsap.fromTo(p,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:p

    })
})
gsap.utils.toArray('h3').forEach(h3=>{
    gsap.fromTo(h3,{
        opacity:0,
        y:150,
        skewX:30
    },{
        opacity:1,
        y:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:h3

    })
})
gsap.utils.toArray('span').forEach(span=>{
    gsap.fromTo(span,{
        opacity:0,
        y:150,
        skewX:30
    },{
        opacity:1,
        y:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:span

    })
})
gsap.utils.toArray('h4').forEach(h4=>{
    gsap.fromTo(h4,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:h4

    })
})
gsap.utils.toArray('.twitter').forEach(twitter=>{
    gsap.fromTo(twitter,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:0.5,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:twitter

    })
})
gsap.utils.toArray('.instagram').forEach(instagram=>{
    gsap.fromTo(instagram,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:0.5,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:instagram

    })
})
gsap.utils.toArray('small').forEach(small=>{
    gsap.fromTo(small,{
        opacity:0,
        x:-150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:small

    })
})


gsap.utils.toArray('button').forEach(button=>{
    gsap.fromTo(button,{
        opacity:0,
    },{
        opacity:1,
        duration:1,
        delay:1,
        scrollTrigger:button

    })
})


gsap.from('.pyramid' ,{
    opacity:0,
    scale:.5,
    duration:1,
    delay:.5
})

gsap.fromTo('.hand',{
    scale:.2,
    opacity:0,
    skewY:30
},{
    scale:1,
    opacity:1,
    skewY:0,
    duration:1,
    delay:.5,
    scrollTrigger:'.hand'
})



gsap.utils.toArray('.line').forEach(line=>{
    gsap.fromTo(line,{
        opacity:0,
        width:'0%'
    },{
        opacity:1,
        width:'100%',
        duration:1,
        delay:1,
        scrollTrigger:line

    })
})


gsap.utils.toArray('.rotation').forEach(rotate=>{
    gsap.fromTo(rotate,{
        opacity:0,
        rotation:350,
        scale:.2
    },{
        opacity:1,
        rotation:0,
        scale:1,
        duration:1,
        delay:1,
        scrollTrigger:rotate

    })
})


gsap.fromTo('.card' ,{
    opacity:0,
    scale:.1,
},{
    opacity:1,
    scale:1,
    duration:1,
    delay:.5,
    stagger:{
        amount:1
    },
    scrollTrigger:'.card'
})

const menu = document.querySelector('.menu')


gsap.from(menu.children,{
    opacity:0,
    x:50,
    duration:1,
    delay:.5,
    stagger:{
        amount:1
    },
    scrollTrigger:{
        trigger:menu.children
    }
})