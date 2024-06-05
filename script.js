document.addEventListener("DOMContentLoaded", function() {

    function init() {
        gsap.registerPlugin(ScrollTrigger);
    
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true
        });
        locoScroll.on("scroll", ScrollTrigger.update);
    
        ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
        });
    
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
        ScrollTrigger.refresh();
    }

    function setupCursorInteractions() {
        const cursor = document.querySelector("#cursor");
        const video = document.querySelector(".video");
        const main = document.querySelector(".main");

        if (video) {
            video.addEventListener("mouseenter", () => {
                gsap.to(cursor, { backgroundColor: "yellow" });
            });

            video.addEventListener("mouseleave", () => {
                gsap.to(cursor, { backgroundColor: "black" });
            });
        }

        if (main) {
            main.addEventListener("mousemove", (e) => {
                gsap.to(cursor, { x: e.x, y: e.y, duration: -1 });
            });
        }
    }

    function setupBackpic() {
        
            const center = document.querySelector(".center");
        
            function throttleFunction(func, delay) {
                let prev = 0;
                return (...args) => {
                    let now = new Date().getTime();
                    if (now - prev > delay) {
                        prev = now;
                        return func(...args);
                    }
                };
            }
        
            async function getRandomImageUrl() {
                
                const imageFiles = ['imgs1.jpg', 'imgs2.jpg', 'imgs3.jpg','imgs4.jpg', 'imgs5.jpg', 'imgs6.jpg','imgs7.jpg', 'imgs8.jpg', 'imgs9.jpg','imgs10.jpg', 'imgs11.jpg', 'imgs12.jpg','imgs13.jpg', 'imgs14.jpg', 'imgs15.jpg','imgs16.jpg', 'imgs17.jpg', 'imgs18.jpg','imgs19.jpg', 'imgs20.jpg', ];
            
                
                const randomFilename = imageFiles[Math.floor(Math.random() * imageFiles.length)];
            
               
                const imageUrl = `randomimgs/${randomFilename}`;
            
                return imageUrl;
            }
            
        
            if (center) {
                center.addEventListener("mousemove", throttleFunction(async (dets) => {
                    const div = document.createElement("div");
                    div.classList.add('imagediv');
                    div.style.left = `${dets.clientX}px`;
                    div.style.top = `${dets.clientY}px`;
                    document.body.appendChild(div);
        
                    const img = document.createElement("img");
                    const imageUrl = await getRandomImageUrl();
                    img.setAttribute("src", imageUrl);
                    div.appendChild(img);
        
                    gsap.to(img, { y: "0", ease: Power1, duration: 0.6 });
                    gsap.to(img, { y: "100%", ease: Power2, delay: 0.6 });
        
                    setTimeout(() => div.remove(), 1000);
                }, 200));
            }
        
        
    }

    function setupScrollAnimations() {
        const videoTrigger = {
            trigger: ".page2 .video",
            scroller: ".main",
            start: "top 70%",
            end: "top 0%",
            scrub: 2
        };

        gsap.to(".page2 .video", {
            height: "100vh",
            width: "100vw",
            y: "160",
            borderRadius: "0",
            scrollTrigger: videoTrigger
        });

        gsap.to(".page2 .video h1", {
            fontSize: "2.5em",
            opacity: 1,
            scrollTrigger: videoTrigger
        });

        gsap.to(".page2 .video h3", {
            fontSize: "1em",
            opacity: 1,
            scrollTrigger: videoTrigger
        });

        gsap.to(".page2 .btn", {
            fontSize: "3em",
            opacity: 1,
            scrollTrigger: videoTrigger
        });

        gsap.to(".page2 video", {
            borderRadius: "0",
            scrollTrigger: videoTrigger
        });
    }

    function setupTextMovement() {
        const sections = [
            { trigger: ".sapration", target: ".sapdiv h1" },
            { trigger: ".sapration2", target: ".sapdiv1 h1" },
            { trigger: ".sapration3", target: ".sapdiv2 h1" }
        ];

        sections.forEach(({ trigger, target }) => {
            const section = document.querySelector(trigger);
            const rect = document.querySelector(target);

            if (section && rect) {
                section.addEventListener("mousemove", (dets) => {
                    const xval = gsap.utils.mapRange(0, window.innerWidth, 300 + rect.getBoundingClientRect().width / 2, window.innerWidth - (300 + rect.getBoundingClientRect().width / 2), dets.clientX);
                    gsap.to(target, { left: `${xval}px`, ease: Power3 });
                });

                section.addEventListener("mouseleave", () => {
                    gsap.to(target, { left: "50%", ease: Power3 });
                });

                section.addEventListener("mouseenter", () => {
                    gsap.to("#cursor", { backgroundColor: "white" });
                });

                section.addEventListener("mouseleave", () => {
                    gsap.to("#cursor", { backgroundColor: "black" });
                });
            }
        });
    }
   
    function setupFixedImageHover() {
        var elemC = document.querySelector("#elem-container")
        var fixed = document.querySelector("#fixed-image")
        elemC.addEventListener("mouseenter", function () {
            fixed.style.display = "block"
        })
        elemC.addEventListener("mouseleave", function () {
            fixed.style.display = "none"
        })
    
        var elems = document.querySelectorAll(".elem")
        elems.forEach(function (e) {
            e.addEventListener("mouseenter", function () {
                var image = e.getAttribute("data-image")
                fixed.style.backgroundImage = `url(${image})`
            })
        })
    }
    function cards() {
        
         

        if (window.matchMedia("(min-width: 1000px)").matches) {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".page5",
                    scroller: ".main",
                    // markers: true,
                    start: "2600", // Adjust the start point as needed
                    end: "-10%", // Adjust the end point as needed
                    scrub: 2
                }
            });
        
            tl.from(".page5 .box1", {
                left: "-10%",
                opacity: 0,
                rotate: -50,
                duration: 1
            })
            .from(".page5 .box2", {
                left: "63%",
                opacity: 0,
                rotate: 50,
                duration: 1
            }, "+=0.5") 
            .from(".page5 .box3", {
                // top: "0%",
                left: "-10%",
                opacity: 0,
                rotate: -50,
                duration: 1
            }, "+=0.5")
            .from(".page5 .box4", {
                // top: "0%",
                left: "63%",
                opacity: 0,
                rotate: 50,
                duration: 1
            }, "+=0.5");
        }
    }
        
    function shoessection() {
    const leftButton = document.querySelector(".btn1x");
    const rightButton = document.querySelector(".btn2x");

    

    leftButton.addEventListener("click", function () {
        moveBoxesLeft();
    });

    rightButton.addEventListener("click", function () {
        moveBoxesRight();
    });



function moveBoxesLeft() {
    const boxes = document.querySelectorAll(".block");
   

    
    
    
    for (let i = boxes.length - 1; i > 0; i--) {
         
        // document.querySelector('.box6').classList.add('scaled');
        
        boxes[i].style.left = window.getComputedStyle(boxes[i - 1]).left;
        boxes[i].style.top = window.getComputedStyle(boxes[i - 1]).top;
    }
    

   
    const lastBox = boxes[boxes.length - 1];
    boxes[0].style.left = window.getComputedStyle(lastBox).left;
    boxes[0].style.top = window.getComputedStyle(lastBox).top;
    

   
}

function moveBoxesRight() {
    const boxes = document.querySelectorAll(".block");
  
    for (let i = 0; i < boxes.length - 1; i++) {
        boxes[i].style.left = window.getComputedStyle(boxes[i + 1]).left;
        boxes[i].style.top = window.getComputedStyle(boxes[i + 1]).top;
    }

  
    const firstBox = boxes[0];
    boxes[boxes.length - 1].style.left = window.getComputedStyle(firstBox).left;
    boxes[boxes.length - 1].style.top = window.getComputedStyle(firstBox).top;

   

    }}
    function infoboxitems() {
        const items = [
            {
                title: "ENGLEWOOD SHOES",
                price: "₹10,000",
                description: "Are YOU ready to take your style up a notch? The Adidas reimagines an icon of sportswear, combining soft suedes, smooth leather, and partially floating logos to deliver skillfully crafted luxury."
            },
            {
                title: "OZWEEGO SHOES",
                price: "₹8,500",
                description: "Step into the spotlight with the iconic Adidas Superstar, blending classic style with modern comfort."
            },
            {
                title: "GAZELLE SHOES",
                price: "₹12,000",
                description: "Experience unmatched comfort and performance with the Adidas Ultraboost, featuring responsive cushioning and a sleek design."
            },
            {
                title: "SAMBA OG SHOES",
                price: "₹7,500",
                description: "Embrace timeless style with the Adidas Stan Smith, a true classic in sneaker culture."
            },
            {
                title: "STAN SMITH SHOES",
                price: "₹11,000",
                description: "Revolutionize your street style with the Adidas NMD, combining futuristic design with everyday comfort."
            },
            {
                title: "COURT SUPER SHOES",
                price: "₹9,000",
                description: "Capture the essence of retro style with the Adidas Gazelle, a versatile and stylish addition to any wardrobe."
            }
        ];
    
        let currentIndex = 0;
    
        const titleElement = document.getElementById('item-title');
        const priceElement = document.getElementById('item-price');
        const descriptionElement = document.getElementById('item-description');
        const infoboxElement = document.querySelector('.infobox');
    
        function updateInfobox(index) {
            // Remove the slide-in class to reset the animation
            infoboxElement.classList.remove('slide-in');
    
            // Update content after a short delay to allow the animation to reset
            setTimeout(() => {
                titleElement.textContent = items[index].title;
                priceElement.textContent = items[index].price;
                descriptionElement.textContent = items[index].description;
                
                // Trigger reflow to restart the animation
                void infoboxElement.offsetWidth;
    
                // Add the slide-in class to start the animation
                infoboxElement.classList.add('slide-in');
            }, 10);
        }
    
        document.querySelector('.btn1x').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateInfobox(currentIndex);
        });
    
        document.querySelector('.btn2x').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateInfobox(currentIndex);
        });
    
        // Initial display
        updateInfobox(currentIndex);
    }
    
    // function buttonhover() {
    //     const hoverbtn = document.querySelector(".hoverbtn")
        
    
    //     hoverbtn.onmousemove = function name(e) {
    
    //     const x = e.pageX - btn.offsetLeft;
    //     const y = e.pageY - btn.offsetTop;
    
    //     hoverbtn.style.setProperty('--x', x + 'px');
    //     hoverbtn.style.setProperty('--y', y + 'px');
        
    // }
    
        
    // }

    function menufunction() {
       let menu1 = document.querySelector(".menu1");
       let menubtn = document.querySelector(".menubutton");
       let sidebar = document.querySelector(".sidebar");
       menubtn.addEventListener("click",() =>{
          sidebar.style.display = "none";
        //   sidebar.classList.add('slideout');
       })
       menu1.addEventListener("click",() =>{
         sidebar.style.display = "block";
         sidebar.classList.add('slide');
        
       })
        
    }

    function  loadervideo() {
        const loader = document.querySelector(".loadervideo")
        gsap.to(loader, {
            y:"-100%",
            // opacity:0,
            duration:1,
            delay:5
            // display:"hidden"
        })
        
    }
    
    
    

    init();
    loadervideo();
    infoboxitems();
    menufunction();
    cards();
    shoessection();
    setupCursorInteractions();
    setupBackpic();
    setupScrollAnimations();
    setupTextMovement();
    setupFixedImageHover();
});


  
    

    