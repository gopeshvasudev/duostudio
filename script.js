//! This code is used for the smooth scrolling.

const loco = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.  
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};

loco();

//! This code is used for the custom cursor making.

const crs = document.querySelector('.cursor');

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  crs.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

//! This code is used for the Animations.

let tl1 = gsap.timeline({

  scrollTrigger: {
    trigger: ".page1 .page1Content h1",
    scroller: '.main',
    scrub: 1,
    start: 'top o%',
    end: "top 0%"
  }
});

const page1Animation = () => {
  gsap.from(".page1 .page1Content h1,h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1,
    rotate: 10,
    rotateX: 80
  })

  tl1.to(".page1 .page1Content h1", {
    x: -100,
    opacity: 0
  }, "anim")

  tl1.to(".page1 .page1Content h2", {
    x: 100,
    opacity: 0
  }, "anim")

  tl1.to(".page1 .page1Content p", {
    opacity: 0
  }, "anim")

  tl1.to(".page1 video", {
    width: "90%",
    y: -250,
    zIndex: 9,
  }, "anim")

};
page1Animation();

//! page 2 Animation

let tl2_0 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    scroller: ".main",
    start: "top 10%",
    end: "top 0%",
    scrub: 2
  }
})
let tl2_1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    scroller: ".main",
    start: "top 20%",
    end: "top 30%",
    scrub: 2
  }
})

let tl2_2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    scroller: ".main",
    start: "top -15%",
    end: "top -20%",
    scrub: 2
  }
})

const page2Animation = () => {
  tl2_0.to(".main", {
    backgroundColor: "#FEFCFF",
    duration: 1
  }, "page2");

  tl2_0.to(".page2 .sectionTop h2,span", {
    opacity: 1,
    y: -20,
    duration: 1

  }, "page2")

  tl2_1.to(".sectionRight", {
    y: -50,
    opacity: 1
  }, "page2");

  tl2_1.to(".sectionRight img", {
    y: -100,
    duration:1,
    opacity: 1
  }, "page2");

  tl2_2.to("nav ul li", {
    color: "#111"
  });

  tl2_2.to("nav #navRight .circle", {
    backgroundColor: "#111"
  }, "page2Nav");

  tl2_2.to("nav #navRight .circle", {
    backgroundColor: "#111"
  }, "page2Nav")
}

page2Animation();

//! Page 3 Animation

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3 h1",
    scroller: ".main",
    start: "top 80%",
    end: "top 70%",
    scrub: 2
  }
});

let tl3_2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3 h1",
    scroller: ".main",
    start: "top 50%",
    end: "top 0%",
    scrub: 4
  }
});

let tl3_3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3 h1",
    scroller: ".main",
    start: "top -80%",
    end: "top -130%",
    scrub: 4
  }
});

let tl3_4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3 h1",
    scroller: ".main",
    start: "top -150%",
    end: "top -200%",
    scrub: 4
  }
});

const page3Animation = () => {
  tl3.from(".page3 h1", {
    y: 100,
    opacity: 0,
  });

  tl3_2.from(".sections .leftSectionFirst", {
    y: 100,
    opacity: 0,
  });

  tl3_3.from(".sections .rightSectionSecond", {
    y: 100,
    opacity: 0,
  });

  tl3_4.from(".sections .leftSectionThird", {
    y: 100,
    opacity: 0,
  });

};

page3Animation();

//! Page 4 Animation

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: '.page4',
    scroller: ".main",
    start: "top 40%",
    end: "top 50%",
    scrub: 2
  }
})

const page4Animation = () => {
  tl4.to(".main", {
    duration: 1,
    backgroundColor: "#0F0D0D"
  })

  tl4.to("nav #navCenter ul li", {
    color: "white"
  })

  tl4.to("nav #navRight .circle", {
    backgroundColor: "white"
  })

}

page4Animation();

// !This code is used for the magnetic ball. 

const Box = document.querySelector(".magBall");

Box.addEventListener('mousemove', (e) => {
  let x = e.offsetX;
  let y = e.offsetY;
  let boxWidth = Box.clientWidth;
  let boxHeight = Box.clientHeight;
  let moveX = (x - boxWidth / 2);
  let moveY = (y - boxHeight / 2);
  Box.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
});

Box.addEventListener('mouseout', (e) => {
  Box.style.transform = ``;
});

//! This code is used for custom cursor.

document.addEventListener('mouseleave', () => {
  crs.style.display = "none"
});

document.addEventListener('mouseenter', () => {
  crs.style.display = "initial"
});

//! This code is used for hovering effects on elements.

const navElem = document.querySelectorAll(" #navCenter>ul>li,#navRight>.circle,.page3>.magBall");

navElem.forEach((elems) => {
  elems.addEventListener('mouseenter', () => {
    crs.style.width = "40px"
    crs.style.height = "40px"
    crs.style.backgroundColor = "transparent"
    crs.style.border = '2px solid white'
  });

  elems.addEventListener('mouseout', () => {
    crs.style.width = "20px"
    crs.style.height = "20px"
    crs.style.backgroundColor = "#fff"
    crs.style.border = 'none'
  });
});

const elems = document.querySelectorAll('.sectionLeftElems,.page5 header button,nav>#navLeft>img');

elems.forEach((elems) => {
  elems.addEventListener('mouseenter', () => {
    crs.style.width = "40px"
    crs.style.height = "40px"
  });
  elems.addEventListener('mouseleave', () => {
    crs.style.width = "20px"
    crs.style.height = "20px"
  });
});

//! This code is used for hovering effect on page 5 elements.

const pg5Elem = document.querySelectorAll(".page5 .elems");


pg5Elem.forEach((elems) => {
  elems.addEventListener('mousemove',() => {
    let att = elems.getAttribute("data-image");
    crs.style.width = "400px"
    crs.style.height = "300px"
    crs.style.borderRadius = "3px"
    crs.style.backgroundImage = `url(${att})`
  });

  elems.addEventListener('mouseleave',() => {
    crs.style.width = "20px"
    crs.style.height = "20px"
    crs.style.backgroundImage = `none`
    crs.style.borderRadius = "50%"
  });

});

//! This code is used for hovering effect on video.

const video = document.querySelector(".page1>video");

video.addEventListener('mouseenter', () => {
  crs.innerHTML = "Sound On"
  crs.style.width = "auto"
  crs.style.height = "auto"
  crs.style.color = "#000"
  crs.style.padding = "2px 5px"
});

video.addEventListener('mouseleave', () => {
  crs.innerHTML = null;
  crs.style.width = "20px"
  crs.style.height = "20px"
  crs.style.padding = "none"
  crs.style.color = "#fff"
  video.muted = true
});


video.addEventListener('click', () => {
  if (crs.innerHTML == "Sound On"){
    video.muted = false
    crs.innerHTML = "Sound Off"
  }

  else if (crs.innerHTML == "Sound Off"){
    video.muted = true 
    crs.innerHTML = "Sound On"
  }

});
