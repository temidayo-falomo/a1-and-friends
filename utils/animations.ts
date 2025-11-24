import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2")
  const bannerThree = document.getElementById("banner-3")
  const bannerFour = document.getElementById("banner-4")
  const bannerFive = document.getElementById("banner-5")
  const bannerSix = document.getElementById("banner-6")
  const icon = document.getElementById("icon")

  if (bannerOne && bannerTwo && bannerThree && bannerFour && bannerFive && bannerSix && icon) {
    const tl = gsap.timeline();
  
    // Initial state setup
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix], {
      yPercent: 0,
    })
    .set(icon, {
      opacity: 1
    })
    // Animate iconBlack height (optional to adjust duration and easing)
    .to(icon, {
      duration: 0.3,
      opacity: 0,
      // ease: "power3.out",  // Ease In effect, if desired
    })
     // Animate banners with ease-out effect
     .to([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix], {
      yPercent: -100,
      stagger: 0.05,
      ease: "power3.out",  // Ease Out effect
      duration: 0.6,
    });
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2")
  const bannerThree = document.getElementById("banner-3")
  const bannerFour = document.getElementById("banner-4")
  const bannerFive = document.getElementById("banner-5")
  const bannerSix = document.getElementById("banner-6")
  const icon = document.getElementById("icon")


  if (bannerOne && bannerTwo && bannerThree && bannerFour && bannerFive && bannerSix && icon) {
    const tl = gsap.timeline()

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix], {
      yPercent: -100,
    }) 
    .set(icon, {
      opacity: 0,
    })
    .to([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix], {
      yPercent: 0,
      stagger: 0.05,
      ease: "power3.out", // Stage 1: Ease Out (Starts fast and slows down)
      duration: 0.6,
      onComplete: () => {
        router.push(href)
      },
    })
     // Animate iconBlack height (optional to adjust duration and easing)
     .to(icon, {
      duration: 1,
      opacity: 1,
      // ease: "power3.out",  // Ease In effect, if desired
    })  
  }
}