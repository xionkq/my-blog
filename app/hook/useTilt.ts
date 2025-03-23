// reference: https://github.com/gijsroge/tilt.js
export function setTilt(dom: HTMLElement | null) {
  console.log('dom', dom)
  if (!dom) return
  dom.addEventListener('mousemove', (e) => {
    const maxTiltRotation = 15
    const rect = dom.getBoundingClientRect()
    let x = (e.clientX - rect.left) / dom.offsetWidth
    let y = (e.clientY - rect.top) / dom.offsetHeight
    x = Math.min(Math.max(x, 0), 1)
    y = Math.min(Math.max(y, 0), 1)

    const tiltX = (maxTiltRotation - x * maxTiltRotation * 2).toFixed(2)
    const tiltY = (y * maxTiltRotation * 2 - maxTiltRotation).toFixed(2)
    const angle =
      Math.atan2(e.clientX - (rect.left + dom.offsetWidth / 2), -(e.clientY - (rect.top + dom.offsetHeight / 2))) *
      (180 / Math.PI)
    dom.style.transform = `perspective(250px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`

    glareElement.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`
    glareElement.style.opacity = `${(y * 100 * 0.5) / 100}`
  })
  dom.addEventListener('mouseenter', () => {
    dom.style.transform = 'unset'
  })
  dom.addEventListener('mouseleave', () => {
    dom.style.transform = 'unset'
  })

  // TODO: Child elements or pseudo-classes cannot be added to img elements :(
  const jsTiltGlare = document.createElement('div')
  jsTiltGlare.classList.add('js-tilt-glare')

  const jsTiltGlareInner = document.createElement('div')
  jsTiltGlareInner.classList.add('js-tilt-glare-inner')

  jsTiltGlare.appendChild(jsTiltGlareInner)
  dom.appendChild(jsTiltGlare)

  const glareElementWrapper = dom.querySelector('.js-tilt-glare')! as HTMLElement
  const glareElement = dom.querySelector('.js-tilt-glare-inner')! as HTMLElement

  Object.assign(glareElementWrapper.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '130px',
    height: '192px',
    overflow: 'hidden',
    'pointer-events': 'none',
  })

  Object.assign(glareElement.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    'pointer-events': 'none',
    'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
    transform: 'rotate(180deg) translate(-50%, -50%)',
    'transform-origin': '0% 0%',
    opacity: '0',
  })

  const glareSize = (dom.offsetWidth > dom.offsetHeight ? dom.offsetWidth : dom.offsetHeight) * 2;

  Object.assign(glareElement.style, {
    width: glareSize + 'px',
    height: glareSize + 'px',
  })

  return
}
