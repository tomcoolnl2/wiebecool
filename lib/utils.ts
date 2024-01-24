//
export function detectMobile(): boolean {
	if (typeof window === 'undefined') {
		return false;
	}
	return window.navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
}

export const tokyo = {
	imageToSvg() {
		const images = document.querySelectorAll('img.svg') as NodeListOf<HTMLElement>;
		images.forEach((el) => {
			const imgID = el.getAttribute('id');
			const imgClass = el.getAttribute('class');
			const imgURL = el.getAttribute('src');
			fetch(imgURL!)
				.then((data) => data.text())
				.then((response) => {
					const parser = new DOMParser();
					const xmlDoc = parser.parseFromString(response, 'text/html');
					let svg = xmlDoc.querySelector('svg') as SVGSVGElement;
					if (typeof imgID !== 'undefined') {
						svg.setAttribute('id', imgID!);
					}

					if (typeof imgClass !== 'undefined') {
						svg.setAttribute('class', imgClass + ' replaced-svg');
					}

					svg.removeAttribute('xmlns:a');
					if (el.parentNode) {
						el.parentNode.replaceChild(svg, el);
					}
				});
		});
	},
	customCursor() {
		var myCursor = document.querySelectorAll('.mouse-cursor'),
			hamburger = document.querySelector('.hamburger'),
			kura_tm_topbar = document.querySelector('.kura_tm_topbar '),
			pointer = document.querySelector('.cursor-pointer'),
			e = document.querySelector('.cursor-inner') as HTMLElement,
			t = document.querySelector('.cursor-outer') as HTMLElement;

		function mouseEvent(element: HTMLElement) {
			element.addEventListener('mouseenter', function () {
				e.classList.add('cursor-hover'), t.classList.add('cursor-hover');
			});
			element.addEventListener('mouseleave', function () {
				e.classList.remove('cursor-hover'), t.classList.remove('cursor-hover');
			});
		}
		if (myCursor.length) {
			if (document.body) {
				let n,
					i = 0,
					o = !1;
				(window.onmousemove = function (s) {
					// console.log(document.querySelector(this));
					o || (t.style.transform = 'translate(' + s.clientX + 'px, ' + s.clientY + 'px)'),
						(e.style.transform = 'translate(' + s.clientX + 'px, ' + s.clientY + 'px)'),
						(n = s.clientY),
						(i = s.clientX);
				}),
					document.body.addEventListener(
						'mouseenter',
						// "a,.kura_tm_topbar .trigger, .cursor-pointer",
						function () {
							let a = document.querySelectorAll('a'),
								sliders = document.querySelectorAll('.owl-carousel, .swiper-container, .cursor-link'),
								slider = document.querySelectorAll('.modal_item');
							e.classList.add('cursor-inner'), t.classList.add('cursor-outer');

							for (let i = 0; i < a.length; i++) {
								const element = a[i];
								mouseEvent(element);
							}

							for (let i = 0; i < sliders.length; i++) {
								const element = sliders[i];
								element.addEventListener('mouseenter', function () {
									e.classList.add('cursor-slider'), t.classList.add('cursor-slider');
								});
								element.addEventListener('mouseleave', function () {
									e.classList.remove('cursor-slider'), t.classList.remove('cursor-slider');
								});
							}
							for (let i = 0; i < slider.length; i++) {
								const element = slider[i] as HTMLElement;
								mouseEvent(element);
							}

							hamburger && mouseEvent(hamburger as HTMLElement);
							kura_tm_topbar && mouseEvent(kura_tm_topbar as HTMLElement);
							pointer && mouseEvent(pointer as HTMLElement);
						}
					),
					(e.style.visibility = 'visible'),
					(t.style.visibility = 'visible');
			}
		}
	},
};
