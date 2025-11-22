window.addEventListener("load", (event) => {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  const customEase = CustomEase.create("custom", ".87,0,.13,1");
  const counter = document.getElementById("counter");

  gsap.set(".hero-container", {
    scale: 0,
    rotation: -20,
  });

  const tl = gsap.timeline();

  tl.to(".hero", {
    clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
    duration: 1.5,
    ease: customEase,
  })
    .to(".hero", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      onStart: () => {
        gsap.to(".progress-bar", {
          width: "100vw",
          duration: 2,
          ease: customEase,
        });
        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: { innerHTML: 1 },
        });
      },
    })
    .to(".hero", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      onStart: () => {
        gsap.to(".hero-container", {
          scale: 1,
          rotation: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: customEase,
        });
        gsap.to(".progress-bar", {
          opacity: 0,
          duration: 0.3,
        });
        gsap.to(".logo", {
          left: "0%",
          transform: "translateX(0%)",
          duration: 1.25,
          ease: customEase,
        });
      },
    })
    .to(".header span", {
      y: "0%",
      duration: 1,
      stagger: 0.125,
      ease: "power3.out",
      opacity: 1,
    })
    .to(".animated-cards", { display: "block" })
    .to(".boton-container", {
      display: "flex",
    })
    .to("footer", { display: "flex" });

  gsap.delayedCall(6, cards);

  gsap.delayedCall(6, () => {
    gsap.from(".lema, .informacion-empresa,.copyrigth", {
      scrollTrigger: {
        trigger: ".boton-container",
        start: "top 30%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 100,
      duration: 2,
      stagger: 0.4,
    });
  });

  gsap.to(".boton", {
    y: -8,
    scale: 1.4,
    ease: "sine.inOut",
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    delay: 6.75,
  });

  document.getElementById("hero").addEventListener("mousemove", (e) => {
    const vm = document.querySelector(".img-mask");
    if (!vm) return;
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    // animar clip-path (usa GSAP para suavizar)
    gsap.to(vm, {
      // tamaño del círculo en px; ajusta 120px al tamaño deseado
      webkitClipPath: `circle(40px at ${x}% ${y}%)`,
      clipPath: `circle(40px at ${x}% ${y}%)`,
    });
  });
});

function cards() {
  const cardHeadings = gsap.utils.toArray(".card h1");
  const splits = [];
  cardHeadings.forEach((heading) => {
    const split = SplitText.create(heading, {
      type: "chars",
      charsClass: "char",
    });
    splits.push(split);
    split.chars.forEach((char, i) => {
      const charInitialY = i % 2 === 0 ? -150 : 150;
      gsap.set(char, { y: charInitialY });
    });
  });
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card, index) => {
    const cardContainer = card.querySelector(".card-container");
    const cardContainerInitialX = [1, 3].includes(index) ? -100 : 100;
    const split = splits[index];
    const charCount = split.chars.length;
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom",
      end: "top 20%",
      scrub: 1,
      onUpdate: (self) => {
        const cardContainerX =
          cardContainerInitialX - self.progress * cardContainerInitialX;
        gsap.set(cardContainer, { x: `${cardContainerX}%` });
        split.chars.forEach((char, i) => {
          let charStaggerIndex;
          if (index === 1) {
            charStaggerIndex = charCount - 1 - i;
          } else {
            charStaggerIndex = i;
          }
          const charStartDelay = 0.1;
          const charTimelinespan = 1 - charStartDelay;
          const staggerFactor = Math.min(0.75, charTimelinespan * 0.75);
          const delay =
            charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
          const duration =
            charTimelinespan - (staggerFactor * (charCount - 1)) / charCount;
          const start = delay;
          let charProgress = 0;
          if (self.progress >= start) {
            charProgress = Math.min(1, (self.progress - start) / duration);
          }
          const charInitialY = i % 2 === 0 ? -150 : 150;
          const charY = charInitialY - charProgress * charInitialY;
          gsap.set(char, { y: charY });
        });
      },
    });
  });
}
