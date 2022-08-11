const container = document.querySelector('.containerr')
sections = gsap.utils.toArray('.section')
let tl = gsap.timeline({
  // scrollTrigger: {
  //   trigger: container,
  //   scrub: true,
  //   markers: true
  // }
})
gsap.registerPlugin(ScrollTrigger)

tl.to(container, {
  backgroundColor: '#20b2aa',
  duration: 2,
})
  .to(container, {
    backgroundColor: '#f4f800',
    duration: 2,
    start: sections[1],
  })
  .to(container, {
    backgroundColor: '#87cefa',
    duration: 2
  })

// sections.forEach(section =>
//   tl.to('.container', {
//     backgroundColor: '#000',
//     duration: 1,
//     // scrollTrigger: {
//     //   trigger: 'top',
//     //   markers: true,
//     //   start: () => `+=${section.offsetHeight / 4}`,
//     //   end: () => `+=${section.offsetHeight}`,
//     //   scrub: true
//     // }
//   })
// )
