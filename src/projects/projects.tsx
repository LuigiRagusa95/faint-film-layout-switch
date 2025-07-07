import Lenis from 'lenis';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ProjectsList } from './projects-list';
import { ProjectsSwitcher } from './projects-switcher';
import { ProjectsWrapper } from './projects-wrapper';

import './index.css';

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

export function Projects() {
  useGSAP(() => {
    // lenis scroll
    const wrapper = document.querySelector('.wrapper');
    const content = document.querySelector('.scroller');

    if (!content || !wrapper) return;

    const lenis = new Lenis({ wrapper, content, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // dom elements
    const projectsList = document.querySelector('.projects-list');
    const projectsListContents = document.querySelector('.projects-list__contents');
    const projectsListPreview = document.querySelector('.projects-list__preview');
    const gridButton = document.querySelector('.switcher__button--grid');
    const sliderButton = document.querySelector('.switcher__button--slider');
    const indicator = document.querySelector('.switcher__indicator');

    // timeline
    const tl = gsap.timeline();

    // grid button event
    gridButton?.addEventListener('click', () => {
      gsap.set([gridButton, sliderButton], { pointerEvents: 'none' });
      gsap.to(indicator, { x: 0, duration: 1.2, ease: 'power4.inOut' });

      gridButton?.classList.add('is-active');
      sliderButton?.classList.remove('is-active');

      lenis.scrollTo(0, {
        duration: 1,
        onComplete: () => {
          const state = Flip.getState('.project');

          projectsList?.classList.remove('is-slider');
          projectsListContents?.classList.remove('is-slider');

          Flip.from(state, {
            duration: 1.4,
            absolute: true,
            ease: 'power2.inOut',
            stagger: { from: 'start', each: 0.03 },
            onComplete: () => {
              ScrollTrigger.killAll();
              gsap.set([gridButton, sliderButton], { pointerEvents: 'auto' });
            },
          });

          tl.to(projectsListPreview, { clipPath: 'inset(0% 0% 0% 0%)', delay: 1.6, duration: 1.4, ease: 'power4.out' });
        },
      });
    });

    // slider button event
    sliderButton?.addEventListener('click', () => {
      const state = Flip.getState('.project');

      gsap.set([gridButton, sliderButton], { pointerEvents: 'none' });
      gsap.to(indicator, { x: 80, duration: 1.2, ease: 'power4.inOut' });

      lenis.scrollTo(0, { duration: 0.001 });

      sliderButton?.classList.add('is-active');
      gridButton?.classList.remove('is-active');
      projectsList?.classList.add('is-slider');
      projectsListContents?.classList.add('is-slider');

      tl.to(projectsListPreview, { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.4, ease: 'power4.out' });

      Flip.from(state, {
        delay: 0.3,
        duration: 1.4,
        absolute: true,
        ease: 'power2.inOut',
        stagger: { from: 'start', each: 0.03 },
        onComplete: () => {
          gsap.set([gridButton, sliderButton], { pointerEvents: 'auto' });

          const projectsElements = document.querySelectorAll('.project');

          const card = projectsElements[0].getBoundingClientRect();
          const totalWidth = card.width * projectsElements.length + card.width * 0.4;

          tl.to(projectsListContents, {
            x: `-${totalWidth}px`,
            scrollTrigger: { scrub: true, start: 'top top', end: '+=10000px', trigger: wrapper, scroller: wrapper },
          });
        },
      });
    });
  });

  return (
    <ProjectsWrapper>
      <ProjectsList />
      <ProjectsSwitcher />
    </ProjectsWrapper>
  );
}
