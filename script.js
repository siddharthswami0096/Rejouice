function locoJS(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


}
locoJS();

function loaderAnime(){
    gsap.to("#loader",{
        transform:"translateY(-100%)",
        duration:1.5,
        delay:0.5
    },"anim")

    gsap.from("#loader h1",{
        y:-200,
        opacity:0,
        duration:0.5,
        delay:0.05
    },"anim")
}
loaderAnime();

function cursoreffect() {
    var page1 = document.querySelector("#page1-content");
    var cursor = document.querySelector("#cursor");

    page1.addEventListener("mouseenter", function () {
        cursor.style.scale = 1;
    })

    page1.addEventListener("mousemove", function (dets) {

        cursor.style.top = dets.y + "px";
        cursor.style.left = dets.x + "px";

        // gsap.to(cursor,{
        //     x:dets.x,
        //     y:dets.y
        // })
    })

    page1.addEventListener("mouseleave", function () {
        cursor.style.scale = 0;
    })

}
cursoreffect();

function page1Anime() {
    gsap.from("#nav h3", {
        x: 200,
        duration: 2,
        opacity: 0,
        ease: "expo.out"
    })

    var head = document.getElementById("head");
    var splittedh1 = head.textContent.split("");
    var clutter = "";

    splittedh1.forEach(function (e) {
        clutter += `<span>${e}</span>`
    })
    head.innerHTML = clutter;


    gsap.from("#head span", {
        y: 100,
        duration: 2,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.3,
    })
}
page1Anime();

function menuAnime() {


    var menu = document.getElementById("menu")
    var menubtn = document.getElementById("menubtn")
    var close = document.getElementById("closebtn")

    menubtn.addEventListener("click", function () {
        gsap.to("#menu", {
            opacity: 1,
            duration: 1,
            transform: "translateY(0)"
        })
    })

    close.addEventListener("click", function () {
        gsap.to("#menu", {
            opacity: 0,
            duration: 1,
            transform: "translateY(-100%)"
        })
    })


    menu.addEventListener("wheel", function (dets) {
        if (dets.deltaY > 0) {
            gsap.to(menu, {
                transform: "translateY(-100%)",
                duration: 1,
            })
        }
    })
}
menuAnime();

function page2Anime() {


    gsap.from("#page2-top h3", {
        opacity: 0,
        duration: 0.2,
        transform: "translateX(-100%)",
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2-top",
            start: "top 80%",
            end: "top 75%",
            scrub: 2,
        }
    })



    gsap.from(".line", {
        width: 0,
        duration: 0.2,
        delay: 0.2,
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2-top",
            start: "top 80%",
            end: "top 75%",
            scrub: 2,
        }
    })

    gsap.from("#page2-text h2", {
        y: 40,
        opacity: 0,
        duration: 0.2,
        delay: 0.2,
        stagger: 0.5,
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2-top",
            start: "top 70%",
            end: "top 55%",
            scrub: 2,
        }
    })


}
page2Anime();

function page3Anime() {
    gsap.from("#page3-title h2", {
        y: 40,
        opacity: 0,
        duration: 0.2,
        stagger: 0.5,
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page3-text",
            start: "top 70%",
            end: "top 55%",
            scrub: 2,
        }
    })
}
page3Anime();

function swipperAnime() {
    var swiper = new Swiper(".mySwiper", {
        watchSlidesProgress: true,
        slidesPerView: 3,
    });
}
swipperAnime();

function svgAnime() {
    gsap.registerPlugin(MotionPathPlugin);

    gsap.to("#movingCircle", {
        duration: 5,
        ease: "none",
        motionPath: {
            path: "#circlePath",
            align: "#circlePath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 80%"
        }
    });
    var spans = document.querySelectorAll("#span");

    spans.forEach((elem) => {
        gsap.to(elem, {
            y: -300,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            scrollTrigger: {
                scroller: "#main",
                trigger: "#page4",
                start: "top 40%",
                end: "top 0%"
            }
        })

    })
}
svgAnime();

function page5Anime() {

    gsap.to("#page5 h1", {
        transform: "translateX(-65%)",
        duration: 1,
        ease: Power4,
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page5",
            start: "top top",
            end: "top -20%",
            pin: true,
            scrub: 1
        }
    })
}
page5Anime();


function footerAnime() {
    var footerh1 = document.querySelector("#footer h1");
    var footertext = footerh1.textContent.split("");

    var footerclutter = "";
    footertext.forEach(function (elem) {
        footerclutter += `<span>${elem}</span>`
    })

    footerh1.innerHTML = footerclutter;
    gsap.from("#footer span", {
        y: -100,
        duration: 0.5,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.3,
        scrollTrigger: {
            scroller: "#main",
            trigger: "#footer",
            start: "top 80%",
            end: "top 20%",
            scrub:3
        }
    })
}
footerAnime();

// gsap.to("#loader",{
//     height:"0vh",
//     opacity:0
// })