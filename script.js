window.addEventListener("load", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const counter = document.getElementById("counter");

  gsap.set(".hero-container", {
    scale: 0,
    rotation: -20,
  });

  const tl = gsap.timeline();

  tl.to(".hero", {
    clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
    duration: 1.5,
    ease: "power2.inOut",
  })
    .to(".hero", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: "power2.inOut",
      onStart: () => {
        gsap.to(".progress-bar", {
          width: "100vw",
          duration: 2,
          ease: "power2.inOut",
        });
        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: "power2.inOut",
          snap: { innerHTML: 1 },
        });
      },
    })
    .to(".hero", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        gsap.to(".hero-container", {
          scale: 1,
          rotation: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: "power2.inOut",
        });
        gsap.to(".progress-bar", {
          opacity: 0,
          duration: 0.3,
        });
        gsap.to(".logo", {
          left: "0%",
          transform: "translateX(0%)",
          duration: 1.25,
          ease: "power2.inOut",
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

  gsap.delayedCall(6, () => {
    gsap.fromTo(
      ".animated-card-1",
      { x: 700 },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );
    gsap.fromTo(
      "#card-1 h2",
      { x: -900 },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );
    gsap.fromTo(
      ".animated-card-2",
      { x: -700 },
      {
        scrollTrigger: {
          trigger: "#card-1",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );
    gsap.fromTo(
      "#card-2 h2",
      { x: 900 },
      {
        scrollTrigger: {
          trigger: "#card-1",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );

    gsap.fromTo(
      ".animated-card-3",
      { x: 700 },
      {
        scrollTrigger: {
          trigger: "#card-2",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );
    gsap.fromTo(
      "#card-3 h2",
      { x: -900 },
      {
        scrollTrigger: {
          trigger: "#card-2",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );

    gsap.fromTo(
      ".animated-card-4",
      { x: -700 },
      {
        scrollTrigger: {
          trigger: "#card-3",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );
    gsap.fromTo(
      "#card-4 h2",
      { x: 900 },
      {
        scrollTrigger: {
          trigger: "#card-3",
          start: "bottom 40%",
          scrub: 1,
        },
        x: 0,
      }
    );

    gsap.from(".tel-data, .ubi-data, .copyrigth", {
      scrollTrigger: { trigger: ".boton-container", start: "top 30%" },
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2,
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
    gsap.to(vm, {
      webkitClipPath: `circle(40px at ${x}% ${y}%)`,
      clipPath: `circle(40px at ${x}% ${y}%)`,
    });
  });
  document.getElementById("hero").addEventListener("touchstart", (e) => {
    const vm = document.querySelector(".img-mask");
    if (!vm) return;
    const { clientX, clientY } = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    gsap.to(vm, {
      webkitClipPath: `circle(40px at ${x}% ${y}%)`,
      clipPath: `circle(40px at ${x}% ${y}%)`,
    });
  });
});
